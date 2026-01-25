import { Injectable, Logger, NotFoundException, BadRequestException } from '@nestjs/common';
import { DatabaseService } from '../database/database.service';

/**
 * Payments Service - Ödeme Yönetimi
 * Ödeme kayıtları, tahsilat/ödeme işlemleri, fatura ödemesi
 */
@Injectable()
export class PaymentsService {
  private readonly logger = new Logger(PaymentsService.name);

  constructor(private db: DatabaseService) {}

  /**
   * Tüm ödemeleri listele (sayfalama ve filtreleme)
   */
  async findAll(
    userId: string,
    page: number = 1,
    limit: number = 20,
    status?: string,
    method?: string,
    invoiceId?: string,
    customerId?: string,
    startDate?: Date,
    endDate?: Date,
  ) {
    const offset = (page - 1) * limit;

    let whereConditions = [`p."userId" = $1`];
    const params: any[] = [userId];
    let paramIndex = 2;

    if (status) {
      whereConditions.push(`p.status = $${paramIndex}`);
      params.push(status);
      paramIndex++;
    }

    if (method) {
      whereConditions.push(`p.method = $${paramIndex}`);
      params.push(method);
      paramIndex++;
    }

    if (invoiceId) {
      whereConditions.push(`p."invoiceId" = $${paramIndex}`);
      params.push(invoiceId);
      paramIndex++;
    }

    if (customerId) {
      whereConditions.push(`p."customerId" = $${paramIndex}`);
      params.push(customerId);
      paramIndex++;
    }

    if (startDate) {
      whereConditions.push(`p."paymentDate" >= $${paramIndex}`);
      params.push(startDate);
      paramIndex++;
    }

    if (endDate) {
      whereConditions.push(`p."paymentDate" <= $${paramIndex}`);
      params.push(endDate);
      paramIndex++;
    }

    const whereClause = whereConditions.join(' AND ');

    // Toplam kayıt sayısı
    const countResult = await this.db.query(
      `SELECT COUNT(*)::int as count FROM payments p WHERE ${whereClause}`,
      params
    );

    const total = countResult.rows[0]?.count || 0;

    // Ödeme listesi
    const result = await this.db.query(
      `SELECT
        p.*,
        i."invoiceNo" as "invoiceNo",
        i.total as "invoiceTotal",
        c."firstName" as "customerFirstName",
        c."lastName" as "customerLastName",
        c."companyName" as "customerCompanyName",
        c.type as "customerType"
      FROM payments p
      LEFT JOIN invoices i ON i.id = p."invoiceId"
      LEFT JOIN customers c ON c.id = p."customerId"
      WHERE ${whereClause}
      ORDER BY p."paymentDate" DESC, p."createdAt" DESC
      LIMIT $${paramIndex} OFFSET $${paramIndex + 1}`,
      [...params, limit, offset]
    );

    const payments = result.rows.map(row => ({
      ...row,
      amount: parseFloat(row.amount),
      invoiceTotal: row.invoiceTotal ? parseFloat(row.invoiceTotal) : null,
      customerName: row.customerType === 'CORPORATE'
        ? row.customerCompanyName
        : `${row.customerFirstName || ''} ${row.customerLastName || ''}`.trim(),
    }));

    return {
      data: payments,
      meta: {
        total,
        page,
        limit,
        totalPages: Math.ceil(total / limit),
      },
    };
  }

  /**
   * ID'ye göre ödeme detayı getir
   */
  async findOne(id: string, userId: string) {
    const result = await this.db.query(
      `SELECT
        p.*,
        i."invoiceNo" as "invoiceNo",
        i.type as "invoiceType",
        i.total as "invoiceTotal",
        i.status as "invoiceStatus",
        c."firstName" as "customerFirstName",
        c."lastName" as "customerLastName",
        c."companyName" as "customerCompanyName",
        c.type as "customerType",
        c.email as "customerEmail",
        c.phone as "customerPhone",
        c.address as "customerAddress"
      FROM payments p
      LEFT JOIN invoices i ON i.id = p."invoiceId"
      LEFT JOIN customers c ON c.id = p."customerId"
      WHERE p.id = $1 AND p."userId" = $2`,
      [id, userId]
    );

    if (result.rows.length === 0) {
      throw new NotFoundException('Ödeme kaydı bulunamadı');
    }

    const payment = result.rows[0];

    return {
      ...payment,
      amount: parseFloat(payment.amount),
      invoiceTotal: payment.invoiceTotal ? parseFloat(payment.invoiceTotal) : null,
      customerName: payment.customerType === 'CORPORATE'
        ? payment.customerCompanyName
        : `${payment.customerFirstName || ''} ${payment.customerLastName || ''}`.trim(),
    };
  }

  /**
   * Yeni ödeme kaydı oluştur
   */
  async create(userId: string, paymentData: any) {
    this.logger.log(`Yeni ödeme kaydı oluşturuluyor: ${userId}`);

    // Fatura varsa ve tamamen ödenecekse, fatura durumunu kontrol et
    if (paymentData.invoiceId) {
      const invoice = await this.db.query(
        `SELECT id, total, status FROM invoices WHERE id = $1 AND "userId" = $2`,
        [paymentData.invoiceId, userId]
      );

      if (invoice.rows.length === 0) {
        throw new NotFoundException('Fatura bulunamadı');
      }

      const invoiceTotal = parseFloat(invoice.rows[0].total);
      const paymentAmount = parseFloat(paymentData.amount);

      // Faturanın daha önce ödenmiş tutarını hesapla
      const paidResult = await this.db.query(
        `SELECT COALESCE(SUM(amount), 0)::numeric as paid
         FROM payments
         WHERE "invoiceId" = $1 AND status = 'COMPLETED'`,
        [paymentData.invoiceId]
      );

      const alreadyPaid = parseFloat(paidResult.rows[0].paid);
      const remaining = invoiceTotal - alreadyPaid;

      if (paymentAmount > remaining) {
        throw new BadRequestException(
          `Ödeme tutarı kalan tutardan fazla olamaz. Kalan: ${remaining.toFixed(2)} ${paymentData.currency || 'TRY'}`
        );
      }
    }

    const client = await this.db.getPool().connect();
    try {
      await client.query('BEGIN');

      // Ödeme kaydı oluştur
      const paymentResult = await client.query(
        `INSERT INTO payments (
          id, "userId", "invoiceId", "customerId", amount, currency, method,
          status, "bankName", "accountNo", "transactionId", "paymentDate",
          "valueDate", notes, "createdAt", "updatedAt"
        ) VALUES (
          gen_random_uuid(), $1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13,
          CURRENT_TIMESTAMP, CURRENT_TIMESTAMP
        ) RETURNING *`,
        [
          userId,
          paymentData.invoiceId || null,
          paymentData.customerId || null,
          paymentData.amount,
          paymentData.currency || 'TRY',
          paymentData.method,
          paymentData.status || 'PENDING',
          paymentData.bankName || null,
          paymentData.accountNo || null,
          paymentData.transactionId || null,
          paymentData.paymentDate || new Date(),
          paymentData.valueDate || null,
          paymentData.notes || null,
        ]
      );

      const payment = paymentResult.rows[0];

      // Eğer ödeme COMPLETED ve fatura varsa, fatura durumunu güncelle
      if (paymentData.status === 'COMPLETED' && paymentData.invoiceId) {
        await this.updateInvoicePaymentStatus(client, paymentData.invoiceId);
      }

      await client.query('COMMIT');

      this.logger.log(`Ödeme kaydı oluşturuldu: ${payment.id}`);
      return this.findOne(payment.id, userId);

    } catch (error) {
      await client.query('ROLLBACK');
      this.logger.error(`Ödeme oluşturma hatası: ${error.message}`);
      throw error;
    } finally {
      client.release();
    }
  }

  /**
   * Ödeme kaydını güncelle
   */
  async update(id: string, userId: string, updateData: any) {
    const payment = await this.findOne(id, userId);

    if (payment.status === 'COMPLETED') {
      throw new BadRequestException('Tamamlanmış ödemeler düzenlenemez');
    }

    const client = await this.db.getPool().connect();
    try {
      await client.query('BEGIN');

      const updateFields: string[] = [];
      const updateValues: any[] = [];
      let paramIndex = 1;

      if (updateData.amount !== undefined) {
        updateFields.push(`amount = $${paramIndex++}`);
        updateValues.push(updateData.amount);
      }
      if (updateData.method !== undefined) {
        updateFields.push(`method = $${paramIndex++}`);
        updateValues.push(updateData.method);
      }
      if (updateData.bankName !== undefined) {
        updateFields.push(`"bankName" = $${paramIndex++}`);
        updateValues.push(updateData.bankName);
      }
      if (updateData.accountNo !== undefined) {
        updateFields.push(`"accountNo" = $${paramIndex++}`);
        updateValues.push(updateData.accountNo);
      }
      if (updateData.transactionId !== undefined) {
        updateFields.push(`"transactionId" = $${paramIndex++}`);
        updateValues.push(updateData.transactionId);
      }
      if (updateData.paymentDate !== undefined) {
        updateFields.push(`"paymentDate" = $${paramIndex++}`);
        updateValues.push(updateData.paymentDate);
      }
      if (updateData.valueDate !== undefined) {
        updateFields.push(`"valueDate" = $${paramIndex++}`);
        updateValues.push(updateData.valueDate);
      }
      if (updateData.notes !== undefined) {
        updateFields.push(`notes = $${paramIndex++}`);
        updateValues.push(updateData.notes);
      }

      if (updateFields.length > 0) {
        updateFields.push(`"updatedAt" = CURRENT_TIMESTAMP`);
        updateValues.push(id, userId);

        await client.query(
          `UPDATE payments SET ${updateFields.join(', ')}
           WHERE id = $${paramIndex} AND "userId" = $${paramIndex + 1}`,
          updateValues
        );
      }

      await client.query('COMMIT');
      return this.findOne(id, userId);

    } catch (error) {
      await client.query('ROLLBACK');
      this.logger.error(`Ödeme güncelleme hatası: ${error.message}`);
      throw error;
    } finally {
      client.release();
    }
  }

  /**
   * Ödeme durumunu güncelle
   */
  async updateStatus(id: string, userId: string, newStatus: string) {
    const payment = await this.findOne(id, userId);

    // Durum geçiş kontrolü
    this.validateStatusTransition(payment.status, newStatus);

    const client = await this.db.getPool().connect();
    try {
      await client.query('BEGIN');

      await client.query(
        `UPDATE payments SET
          status = $1,
          "updatedAt" = CURRENT_TIMESTAMP
        WHERE id = $2 AND "userId" = $3`,
        [newStatus, id, userId]
      );

      // Eğer COMPLETED oldu ve fatura varsa, fatura durumunu güncelle
      if (newStatus === 'COMPLETED' && payment.invoiceId) {
        await this.updateInvoicePaymentStatus(client, payment.invoiceId);
      }

      // Eğer REFUNDED veya FAILED oldu ve fatura varsa, fatura durumunu tekrar kontrol et
      if ((newStatus === 'REFUNDED' || newStatus === 'FAILED') && payment.invoiceId) {
        await this.updateInvoicePaymentStatus(client, payment.invoiceId);
      }

      await client.query('COMMIT');

      this.logger.log(`Ödeme durumu güncellendi: ${id} -> ${newStatus}`);
      return this.findOne(id, userId);

    } catch (error) {
      await client.query('ROLLBACK');
      this.logger.error(`Ödeme durumu güncelleme hatası: ${error.message}`);
      throw error;
    } finally {
      client.release();
    }
  }

  /**
   * Ödeme kaydını sil
   */
  async remove(id: string, userId: string) {
    const payment = await this.findOne(id, userId);

    if (payment.status === 'COMPLETED') {
      throw new BadRequestException('Tamamlanmış ödemeler silinemez');
    }

    await this.db.query(
      `DELETE FROM payments WHERE id = $1 AND "userId" = $2`,
      [id, userId]
    );

    this.logger.log(`Ödeme kaydı silindi: ${id}`);
    return { message: 'Ödeme kaydı başarıyla silindi' };
  }

  /**
   * Faturaya ait ödemeleri listele
   */
  async findByInvoice(invoiceId: string, userId: string) {
    const result = await this.db.query(
      `SELECT p.*
       FROM payments p
       WHERE p."invoiceId" = $1 AND p."userId" = $2
       ORDER BY p."paymentDate" DESC`,
      [invoiceId, userId]
    );

    return result.rows.map(row => ({
      ...row,
      amount: parseFloat(row.amount),
    }));
  }

  /**
   * Ödeme istatistikleri
   */
  async getStatistics(userId: string, startDate?: Date, endDate?: Date) {
    let dateFilter = '';
    const params: any[] = [userId];

    if (startDate && endDate) {
      dateFilter = `AND "paymentDate" BETWEEN $2 AND $3`;
      params.push(startDate, endDate);
    }

    const result = await this.db.query(
      `SELECT
        COUNT(*)::int as "totalCount",
        COALESCE(SUM(CASE WHEN status = 'COMPLETED' THEN amount ELSE 0 END), 0)::numeric as "completedAmount",
        COALESCE(SUM(CASE WHEN status = 'PENDING' THEN amount ELSE 0 END), 0)::numeric as "pendingAmount",
        COALESCE(SUM(CASE WHEN status = 'FAILED' THEN amount ELSE 0 END), 0)::numeric as "failedAmount",
        COUNT(CASE WHEN status = 'COMPLETED' THEN 1 END)::int as "completedCount",
        COUNT(CASE WHEN status = 'PENDING' THEN 1 END)::int as "pendingCount",
        COUNT(CASE WHEN status = 'FAILED' THEN 1 END)::int as "failedCount"
      FROM payments
      WHERE "userId" = $1 ${dateFilter}`,
      params
    );

    const stats = result.rows[0];

    return {
      totalCount: stats.totalCount,
      completedAmount: parseFloat(stats.completedAmount),
      pendingAmount: parseFloat(stats.pendingAmount),
      failedAmount: parseFloat(stats.failedAmount),
      completedCount: stats.completedCount,
      pendingCount: stats.pendingCount,
      failedCount: stats.failedCount,
    };
  }

  /**
   * Fatura ödeme durumunu güncelle (private helper)
   */
  private async updateInvoicePaymentStatus(client: any, invoiceId: string) {
    // Fatura toplam tutarı
    const invoiceResult = await client.query(
      `SELECT total FROM invoices WHERE id = $1`,
      [invoiceId]
    );

    if (invoiceResult.rows.length === 0) return;

    const invoiceTotal = parseFloat(invoiceResult.rows[0].total);

    // Tamamlanmış ödemelerin toplamı
    const paidResult = await client.query(
      `SELECT COALESCE(SUM(amount), 0)::numeric as paid
       FROM payments
       WHERE "invoiceId" = $1 AND status = 'COMPLETED'`,
      [invoiceId]
    );

    const totalPaid = parseFloat(paidResult.rows[0].paid);

    // Fatura durumunu güncelle
    let newInvoiceStatus = 'SENT';
    if (totalPaid >= invoiceTotal) {
      newInvoiceStatus = 'PAID';
    } else if (totalPaid > 0) {
      newInvoiceStatus = 'ACCEPTED'; // Kısmi ödeme
    }

    await client.query(
      `UPDATE invoices SET
        status = $1,
        "updatedAt" = CURRENT_TIMESTAMP
       WHERE id = $2`,
      [newInvoiceStatus, invoiceId]
    );

    this.logger.log(`Fatura durumu güncellendi: ${invoiceId} -> ${newInvoiceStatus}`);
  }

  /**
   * Durum geçiş kontrolü
   */
  private validateStatusTransition(currentStatus: string, newStatus: string) {
    const validTransitions: Record<string, string[]> = {
      'PENDING': ['COMPLETED', 'FAILED', 'CANCELLED'],
      'COMPLETED': ['REFUNDED'],
      'FAILED': ['PENDING', 'CANCELLED'],
      'CANCELLED': [],
      'REFUNDED': [],
    };

    if (!validTransitions[currentStatus]?.includes(newStatus)) {
      throw new BadRequestException(
        `Geçersiz durum geçişi: ${currentStatus} -> ${newStatus}`
      );
    }
  }
}
