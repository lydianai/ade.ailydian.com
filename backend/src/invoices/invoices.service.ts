import { Injectable, Logger, NotFoundException, BadRequestException } from '@nestjs/common';
import { DatabaseService } from '../database/database.service';

/**
 * Invoice Service - E-Fatura & E-Arşiv Yönetimi
 * Fatura oluşturma, düzenleme, listeleme ve GİB entegrasyonu
 */
@Injectable()
export class InvoicesService {
  private readonly logger = new Logger(InvoicesService.name);

  constructor(private db: DatabaseService) {}

  /**
   * Tüm faturaları listele (sayfalama ve filtreleme)
   */
  async findAll(
    userId: string,
    page: number = 1,
    limit: number = 20,
    status?: string,
    customerId?: string,
    startDate?: Date,
    endDate?: Date,
  ) {
    const offset = (page - 1) * limit;

    let whereConditions = [`"userId" = $1`, `"deletedAt" IS NULL`];
    const params: any[] = [userId];
    let paramIndex = 2;

    if (status) {
      whereConditions.push(`status = $${paramIndex}`);
      params.push(status);
      paramIndex++;
    }

    if (customerId) {
      whereConditions.push(`"customerId" = $${paramIndex}`);
      params.push(customerId);
      paramIndex++;
    }

    if (startDate) {
      whereConditions.push(`"invoiceDate" >= $${paramIndex}`);
      params.push(startDate);
      paramIndex++;
    }

    if (endDate) {
      whereConditions.push(`"invoiceDate" <= $${paramIndex}`);
      params.push(endDate);
      paramIndex++;
    }

    const whereClause = whereConditions.join(' AND ');

    // Toplam kayıt sayısı
    const countResult = await this.db.query(
      `SELECT COUNT(*)::int as count FROM invoices WHERE ${whereClause}`,
      params
    );

    const total = countResult.rows[0]?.count || 0;

    // Fatura listesi
    const result = await this.db.query(
      `SELECT
        i.*,
        c."firstName" as "customerFirstName",
        c."lastName" as "customerLastName",
        c."companyName" as "customerCompanyName",
        c.type as "customerType"
      FROM invoices i
      LEFT JOIN customers c ON c.id = i."customerId"
      WHERE ${whereClause}
      ORDER BY i."invoiceDate" DESC, i."createdAt" DESC
      LIMIT $${paramIndex} OFFSET $${paramIndex + 1}`,
      [...params, limit, offset]
    );

    const invoices = result.rows.map(row => ({
      ...row,
      customerName: row.customerType === 'CORPORATE'
        ? row.customerCompanyName
        : `${row.customerFirstName || ''} ${row.customerLastName || ''}`.trim(),
    }));

    return {
      data: invoices,
      meta: {
        total,
        page,
        limit,
        totalPages: Math.ceil(total / limit),
      },
    };
  }

  /**
   * ID'ye göre fatura detayı getir
   */
  async findOne(id: string, userId: string) {
    const result = await this.db.query(
      `SELECT
        i.*,
        c."firstName" as "customerFirstName",
        c."lastName" as "customerLastName",
        c."companyName" as "customerCompanyName",
        c.type as "customerType",
        c.email as "customerEmail",
        c.phone as "customerPhone",
        c.address as "customerAddress",
        c.city as "customerCity",
        c.district as "customerDistrict",
        c."taxOffice" as "customerTaxOffice",
        c."taxNumber" as "customerTaxNumber"
      FROM invoices i
      LEFT JOIN customers c ON c.id = i."customerId"
      WHERE i.id = $1 AND i."userId" = $2 AND i."deletedAt" IS NULL`,
      [id, userId]
    );

    if (result.rows.length === 0) {
      throw new NotFoundException('Fatura bulunamadı');
    }

    const invoice = result.rows[0];

    // Fatura kalemlerini getir
    const itemsResult = await this.db.query(
      `SELECT * FROM invoice_items WHERE "invoiceId" = $1 ORDER BY "createdAt" ASC`,
      [id]
    );

    return {
      ...invoice,
      items: itemsResult.rows.map(item => ({
        ...item,
        quantity: parseFloat(item.quantity),
        unitPrice: parseFloat(item.unitPrice),
        vatRate: parseFloat(item.vatRate),
        discountRate: parseFloat(item.discountRate),
        subtotal: parseFloat(item.subtotal),
        vatAmount: parseFloat(item.vatAmount),
        discountAmount: parseFloat(item.discountAmount),
        total: parseFloat(item.total),
      })),
      customerName: invoice.customerType === 'CORPORATE'
        ? invoice.customerCompanyName
        : `${invoice.customerFirstName || ''} ${invoice.customerLastName || ''}`.trim(),
      subtotal: parseFloat(invoice.subtotal),
      vatTotal: parseFloat(invoice.vatTotal),
      discountTotal: parseFloat(invoice.discountTotal),
      total: parseFloat(invoice.total),
    };
  }

  /**
   * Yeni fatura oluştur
   */
  async create(userId: string, invoiceData: any) {
    this.logger.log(`Yeni fatura oluşturuluyor: ${userId}`);

    // Otomatik fatura numarası oluştur
    const invoiceNo = await this.generateInvoiceNumber(userId);

    // Fatura tutarlarını hesapla
    const { subtotal, vatTotal, discountTotal, total } = this.calculateInvoiceTotals(invoiceData.items);

    // Transaction başlat
    const client = await this.db.getPool().connect();
    try {
      await client.query('BEGIN');

      // Fatura oluştur
      const invoiceResult = await client.query(
        `INSERT INTO invoices (
          id, "userId", "customerId", "invoiceNo", type, status,
          "invoiceDate", "dueDate", subtotal, "vatTotal", "discountTotal", total,
          currency, "exchangeRate", "paymentMethod", "paymentAccount", notes,
          "createdAt", "updatedAt"
        ) VALUES (
          gen_random_uuid(), $1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16,
          CURRENT_TIMESTAMP, CURRENT_TIMESTAMP
        ) RETURNING *`,
        [
          userId,
          invoiceData.customerId,
          invoiceNo,
          invoiceData.type || 'E_FATURA',
          'DRAFT',
          invoiceData.invoiceDate || new Date(),
          invoiceData.dueDate,
          subtotal,
          vatTotal,
          discountTotal,
          total,
          invoiceData.currency || 'TRY',
          invoiceData.exchangeRate || 1,
          invoiceData.paymentMethod,
          invoiceData.paymentAccount,
          invoiceData.notes,
        ]
      );

      const invoice = invoiceResult.rows[0];

      // Fatura kalemlerini ekle
      for (const item of invoiceData.items) {
        const itemTotals = this.calculateItemTotals(item);

        await client.query(
          `INSERT INTO invoice_items (
            id, "invoiceId", name, description, quantity, unit, "unitPrice",
            "vatRate", "discountRate", subtotal, "vatAmount", "discountAmount", total,
            "createdAt"
          ) VALUES (
            gen_random_uuid(), $1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, CURRENT_TIMESTAMP
          )`,
          [
            invoice.id,
            item.name,
            item.description,
            item.quantity,
            item.unit || 'Adet',
            item.unitPrice,
            item.vatRate || 18,
            item.discountRate || 0,
            itemTotals.subtotal,
            itemTotals.vatAmount,
            itemTotals.discountAmount,
            itemTotals.total,
          ]
        );
      }

      await client.query('COMMIT');

      this.logger.log(`Fatura oluşturuldu: ${invoice.id}`);
      return this.findOne(invoice.id, userId);

    } catch (error) {
      await client.query('ROLLBACK');
      this.logger.error(`Fatura oluşturma hatası: ${error.message}`);
      throw error;
    } finally {
      client.release();
    }
  }

  /**
   * Fatura güncelle
   */
  async update(id: string, userId: string, updateData: any) {
    // Önce faturayı kontrol et
    const invoice = await this.findOne(id, userId);

    if (invoice.status !== 'DRAFT') {
      throw new BadRequestException('Sadece taslak faturalar düzenlenebilir');
    }

    const client = await this.db.getPool().connect();
    try {
      await client.query('BEGIN');

      // Eğer items varsa, önce mevcut kalemleri sil
      if (updateData.items) {
        await client.query(`DELETE FROM invoice_items WHERE "invoiceId" = $1`, [id]);

        // Yeni kalemleri ekle ve tutarları hesapla
        const { subtotal, vatTotal, discountTotal, total } = this.calculateInvoiceTotals(updateData.items);

        for (const item of updateData.items) {
          const itemTotals = this.calculateItemTotals(item);

          await client.query(
            `INSERT INTO invoice_items (
              id, "invoiceId", name, description, quantity, unit, "unitPrice",
              "vatRate", "discountRate", subtotal, "vatAmount", "discountAmount", total,
              "createdAt"
            ) VALUES (
              gen_random_uuid(), $1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, CURRENT_TIMESTAMP
            )`,
            [
              id,
              item.name,
              item.description,
              item.quantity,
              item.unit || 'Adet',
              item.unitPrice,
              item.vatRate || 18,
              item.discountRate || 0,
              itemTotals.subtotal,
              itemTotals.vatAmount,
              itemTotals.discountAmount,
              itemTotals.total,
            ]
          );
        }

        // Fatura tutarlarını güncelle
        await client.query(
          `UPDATE invoices SET
            subtotal = $1,
            "vatTotal" = $2,
            "discountTotal" = $3,
            total = $4,
            "updatedAt" = CURRENT_TIMESTAMP
          WHERE id = $5`,
          [subtotal, vatTotal, discountTotal, total, id]
        );
      }

      // Diğer alanları güncelle
      const updateFields: string[] = [];
      const updateValues: any[] = [];
      let paramIndex = 1;

      if (updateData.customerId !== undefined) {
        updateFields.push(`"customerId" = $${paramIndex++}`);
        updateValues.push(updateData.customerId);
      }
      if (updateData.invoiceDate !== undefined) {
        updateFields.push(`"invoiceDate" = $${paramIndex++}`);
        updateValues.push(updateData.invoiceDate);
      }
      if (updateData.dueDate !== undefined) {
        updateFields.push(`"dueDate" = $${paramIndex++}`);
        updateValues.push(updateData.dueDate);
      }
      if (updateData.paymentMethod !== undefined) {
        updateFields.push(`"paymentMethod" = $${paramIndex++}`);
        updateValues.push(updateData.paymentMethod);
      }
      if (updateData.notes !== undefined) {
        updateFields.push(`notes = $${paramIndex++}`);
        updateValues.push(updateData.notes);
      }

      if (updateFields.length > 0) {
        updateFields.push(`"updatedAt" = CURRENT_TIMESTAMP`);
        updateValues.push(id);

        await client.query(
          `UPDATE invoices SET ${updateFields.join(', ')} WHERE id = $${paramIndex}`,
          updateValues
        );
      }

      await client.query('COMMIT');
      return this.findOne(id, userId);

    } catch (error) {
      await client.query('ROLLBACK');
      this.logger.error(`Fatura güncelleme hatası: ${error.message}`);
      throw error;
    } finally {
      client.release();
    }
  }

  /**
   * Fatura durumunu güncelle
   */
  async updateStatus(id: string, userId: string, newStatus: string) {
    const invoice = await this.findOne(id, userId);

    // Durum geçiş kontrolü
    this.validateStatusTransition(invoice.status, newStatus);

    await this.db.query(
      `UPDATE invoices SET
        status = $1,
        "updatedAt" = CURRENT_TIMESTAMP
      WHERE id = $2 AND "userId" = $3`,
      [newStatus, id, userId]
    );

    this.logger.log(`Fatura durumu güncellendi: ${id} -> ${newStatus}`);
    return this.findOne(id, userId);
  }

  /**
   * Faturayı sil (soft delete)
   */
  async remove(id: string, userId: string) {
    const invoice = await this.findOne(id, userId);

    if (invoice.status === 'PAID') {
      throw new BadRequestException('Ödenmiş faturalar silinemez');
    }

    await this.db.query(
      `UPDATE invoices SET
        "deletedAt" = CURRENT_TIMESTAMP,
        "updatedAt" = CURRENT_TIMESTAMP
      WHERE id = $1 AND "userId" = $2`,
      [id, userId]
    );

    this.logger.log(`Fatura silindi: ${id}`);
    return { message: 'Fatura başarıyla silindi' };
  }

  /**
   * Otomatik fatura numarası oluştur
   */
  private async generateInvoiceNumber(userId: string): Promise<string> {
    const year = new Date().getFullYear();
    const prefix = `INV-${year}`;

    const result = await this.db.query(
      `SELECT "invoiceNo" FROM invoices
       WHERE "userId" = $1 AND "invoiceNo" LIKE $2
       ORDER BY "createdAt" DESC LIMIT 1`,
      [userId, `${prefix}-%`]
    );

    let nextNumber = 1;
    if (result.rows.length > 0) {
      const lastNumber = parseInt(result.rows[0].invoiceNo.split('-')[2]) || 0;
      nextNumber = lastNumber + 1;
    }

    return `${prefix}-${nextNumber.toString().padStart(5, '0')}`;
  }

  /**
   * Kalem tutarlarını hesapla
   */
  private calculateItemTotals(item: any) {
    const quantity = parseFloat(item.quantity);
    const unitPrice = parseFloat(item.unitPrice);
    const vatRate = parseFloat(item.vatRate || 18);
    const discountRate = parseFloat(item.discountRate || 0);

    const subtotal = quantity * unitPrice;
    const discountAmount = (subtotal * discountRate) / 100;
    const afterDiscount = subtotal - discountAmount;
    const vatAmount = (afterDiscount * vatRate) / 100;
    const total = afterDiscount + vatAmount;

    return {
      subtotal: subtotal.toFixed(2),
      discountAmount: discountAmount.toFixed(2),
      vatAmount: vatAmount.toFixed(2),
      total: total.toFixed(2),
    };
  }

  /**
   * Fatura toplam tutarlarını hesapla
   */
  private calculateInvoiceTotals(items: any[]) {
    let subtotal = 0;
    let vatTotal = 0;
    let discountTotal = 0;
    let total = 0;

    for (const item of items) {
      const itemTotals = this.calculateItemTotals(item);
      subtotal += parseFloat(itemTotals.subtotal);
      vatTotal += parseFloat(itemTotals.vatAmount);
      discountTotal += parseFloat(itemTotals.discountAmount);
      total += parseFloat(itemTotals.total);
    }

    return {
      subtotal: subtotal.toFixed(2),
      vatTotal: vatTotal.toFixed(2),
      discountTotal: discountTotal.toFixed(2),
      total: total.toFixed(2),
    };
  }

  /**
   * Durum geçiş kontrolü
   */
  private validateStatusTransition(currentStatus: string, newStatus: string) {
    const validTransitions: Record<string, string[]> = {
      'DRAFT': ['SENT', 'CANCELLED'],
      'SENT': ['ACCEPTED', 'REJECTED', 'PAID', 'CANCELLED'],
      'ACCEPTED': ['PAID', 'CANCELLED'],
      'REJECTED': ['DRAFT', 'CANCELLED'],
      'PAID': [],
      'CANCELLED': [],
    };

    if (!validTransitions[currentStatus]?.includes(newStatus)) {
      throw new BadRequestException(
        `Geçersiz durum geçişi: ${currentStatus} -> ${newStatus}`
      );
    }
  }
}
