import { Injectable, Logger, NotFoundException, BadRequestException, ConflictException } from '@nestjs/common';
import { DatabaseService } from '../database/database.service';

/**
 * Tax Returns Service - Vergi Beyannameleri Yönetimi
 * KDV, Gelir Vergisi, Stopaj, Damga Vergisi, Kurumlar beyanları
 */
@Injectable()
export class TaxReturnsService {
  private readonly logger = new Logger(TaxReturnsService.name);

  constructor(private db: DatabaseService) {}

  /**
   * Tüm beyannameleri listele (sayfalama ve filtreleme)
   */
  async findAll(
    userId: string,
    page: number = 1,
    limit: number = 20,
    type?: string,
    status?: string,
    year?: number,
    startDate?: Date,
    endDate?: Date,
  ) {
    const offset = (page - 1) * limit;

    let whereConditions = [`"userId" = $1`];
    const params: any[] = [userId];
    let paramIndex = 2;

    if (type) {
      whereConditions.push(`type = $${paramIndex}`);
      params.push(type);
      paramIndex++;
    }

    if (status) {
      whereConditions.push(`status = $${paramIndex}`);
      params.push(status);
      paramIndex++;
    }

    if (year) {
      whereConditions.push(`year = $${paramIndex}`);
      params.push(year);
      paramIndex++;
    }

    if (startDate) {
      whereConditions.push(`"dueDate" >= $${paramIndex}`);
      params.push(startDate);
      paramIndex++;
    }

    if (endDate) {
      whereConditions.push(`"dueDate" <= $${paramIndex}`);
      params.push(endDate);
      paramIndex++;
    }

    const whereClause = whereConditions.join(' AND ');

    // Toplam kayıt sayısı
    const countResult = await this.db.query(
      `SELECT COUNT(*)::int as count FROM tax_returns WHERE ${whereClause}`,
      params
    );

    const total = countResult.rows[0]?.count || 0;

    // Beyanname listesi
    const result = await this.db.query(
      `SELECT * FROM tax_returns
       WHERE ${whereClause}
       ORDER BY "dueDate" DESC, year DESC, month DESC, "createdAt" DESC
       LIMIT $${paramIndex} OFFSET $${paramIndex + 1}`,
      [...params, limit, offset]
    );

    const taxReturns = result.rows.map(row => ({
      ...row,
      taxableAmount: parseFloat(row.taxableAmount),
      taxAmount: parseFloat(row.taxAmount),
    }));

    return {
      data: taxReturns,
      meta: {
        total,
        page,
        limit,
        totalPages: Math.ceil(total / limit),
      },
    };
  }

  /**
   * ID'ye göre beyanname detayı getir
   */
  async findOne(id: string, userId: string) {
    const result = await this.db.query(
      `SELECT * FROM tax_returns
       WHERE id = $1 AND "userId" = $2`,
      [id, userId]
    );

    if (result.rows.length === 0) {
      throw new NotFoundException('Beyanname bulunamadı');
    }

    const taxReturn = result.rows[0];

    return {
      ...taxReturn,
      taxableAmount: parseFloat(taxReturn.taxableAmount),
      taxAmount: parseFloat(taxReturn.taxAmount),
    };
  }

  /**
   * Yeni beyanname oluştur
   */
  async create(userId: string, taxReturnData: any) {
    this.logger.log(`Yeni beyanname oluşturuluyor: ${userId} - ${taxReturnData.type} - ${taxReturnData.period}`);

    // Aynı dönem için beyanname kontrolü
    const existing = await this.db.query(
      `SELECT id FROM tax_returns
       WHERE "userId" = $1 AND type = $2 AND period = $3`,
      [userId, taxReturnData.type, taxReturnData.period]
    );

    if (existing.rows.length > 0) {
      throw new ConflictException(
        `Bu dönem için ${taxReturnData.type} beyannamesi zaten mevcut`
      );
    }

    // Vergi miktarını hesapla
    const taxAmount = this.calculateTaxAmount(
      taxReturnData.type,
      parseFloat(taxReturnData.taxableAmount)
    );

    const result = await this.db.query(
      `INSERT INTO tax_returns (
        id, "userId", type, period, year, month,
        "taxableAmount", "taxAmount", status, "dueDate",
        "declarationFile", "createdAt", "updatedAt"
      ) VALUES (
        gen_random_uuid(), $1, $2, $3, $4, $5, $6, $7, $8, $9, $10,
        CURRENT_TIMESTAMP, CURRENT_TIMESTAMP
      ) RETURNING *`,
      [
        userId,
        taxReturnData.type,
        taxReturnData.period,
        taxReturnData.year,
        taxReturnData.month || null,
        taxReturnData.taxableAmount,
        taxAmount,
        'DRAFT',
        taxReturnData.dueDate,
        taxReturnData.declarationFile || null,
      ]
    );

    const taxReturn = result.rows[0];
    this.logger.log(`Beyanname oluşturuldu: ${taxReturn.id}`);

    return this.findOne(taxReturn.id, userId);
  }

  /**
   * Beyanname güncelle
   */
  async update(id: string, userId: string, updateData: any) {
    const taxReturn = await this.findOne(id, userId);

    if (taxReturn.status !== 'DRAFT') {
      throw new BadRequestException('Sadece taslak beyannameler düzenlenebilir');
    }

    const updateFields: string[] = [];
    const updateValues: any[] = [];
    let paramIndex = 1;

    if (updateData.taxableAmount !== undefined) {
      updateFields.push(`"taxableAmount" = $${paramIndex++}`);
      updateValues.push(updateData.taxableAmount);

      // Vergi miktarını yeniden hesapla
      const newTaxAmount = this.calculateTaxAmount(
        taxReturn.type,
        parseFloat(updateData.taxableAmount)
      );
      updateFields.push(`"taxAmount" = $${paramIndex++}`);
      updateValues.push(newTaxAmount);
    }

    if (updateData.dueDate !== undefined) {
      updateFields.push(`"dueDate" = $${paramIndex++}`);
      updateValues.push(updateData.dueDate);
    }

    if (updateData.declarationFile !== undefined) {
      updateFields.push(`"declarationFile" = $${paramIndex++}`);
      updateValues.push(updateData.declarationFile);
    }

    if (updateFields.length > 0) {
      updateFields.push(`"updatedAt" = CURRENT_TIMESTAMP`);
      updateValues.push(id, userId);

      await this.db.query(
        `UPDATE tax_returns SET ${updateFields.join(', ')}
         WHERE id = $${paramIndex} AND "userId" = $${paramIndex + 1}`,
        updateValues
      );
    }

    return this.findOne(id, userId);
  }

  /**
   * Beyanname durumunu güncelle
   */
  async updateStatus(id: string, userId: string, newStatus: string, gibReference?: string) {
    const taxReturn = await this.findOne(id, userId);

    // Durum geçiş kontrolü
    this.validateStatusTransition(taxReturn.status, newStatus);

    const updateFields = [`status = $1`, `"updatedAt" = CURRENT_TIMESTAMP`];
    const updateValues: any[] = [newStatus];
    let paramIndex = 2;

    // GİB referans numarası ekle (beyanname gönderildiğinde)
    if (newStatus === 'SUBMITTED' && gibReference) {
      updateFields.push(`"gibReference" = $${paramIndex++}`);
      updateFields.push(`"submittedAt" = CURRENT_TIMESTAMP`);
      updateValues.push(gibReference);
    }

    // Ödeme tarihi kaydet
    if (newStatus === 'PAID') {
      updateFields.push(`"paidAt" = CURRENT_TIMESTAMP`);
    }

    updateValues.push(id, userId);

    await this.db.query(
      `UPDATE tax_returns SET ${updateFields.join(', ')}
       WHERE id = $${paramIndex} AND "userId" = $${paramIndex + 1}`,
      updateValues
    );

    this.logger.log(`Beyanname durumu güncellendi: ${id} -> ${newStatus}`);
    return this.findOne(id, userId);
  }

  /**
   * Beyanname sil
   */
  async remove(id: string, userId: string) {
    const taxReturn = await this.findOne(id, userId);

    if (taxReturn.status === 'SUBMITTED' || taxReturn.status === 'PAID') {
      throw new BadRequestException('Gönderilmiş veya ödenmiş beyannameler silinemez');
    }

    await this.db.query(
      `DELETE FROM tax_returns WHERE id = $1 AND "userId" = $2`,
      [id, userId]
    );

    this.logger.log(`Beyanname silindi: ${id}`);
    return { message: 'Beyanname başarıyla silindi' };
  }

  /**
   * Dönem bazlı beyanname listesi
   */
  async findByPeriod(userId: string, type: string, year: number, month?: number) {
    let query = `
      SELECT * FROM tax_returns
      WHERE "userId" = $1 AND type = $2 AND year = $3
    `;
    const params: any[] = [userId, type, year];

    if (month !== undefined) {
      query += ` AND month = $4`;
      params.push(month);
    }

    query += ` ORDER BY month DESC, "createdAt" DESC`;

    const result = await this.db.query(query, params);

    return result.rows.map(row => ({
      ...row,
      taxableAmount: parseFloat(row.taxableAmount),
      taxAmount: parseFloat(row.taxAmount),
    }));
  }

  /**
   * Beyanname istatistikleri
   */
  async getStatistics(userId: string, year?: number) {
    let dateFilter = '';
    const params: any[] = [userId];

    if (year) {
      dateFilter = `AND year = $2`;
      params.push(year);
    }

    const result = await this.db.query(
      `SELECT
        COUNT(*)::int as "totalCount",
        COUNT(CASE WHEN status = 'DRAFT' THEN 1 END)::int as "draftCount",
        COUNT(CASE WHEN status = 'SUBMITTED' THEN 1 END)::int as "submittedCount",
        COUNT(CASE WHEN status = 'PAID' THEN 1 END)::int as "paidCount",
        COUNT(CASE WHEN status = 'OVERDUE' THEN 1 END)::int as "overdueCount",
        COALESCE(SUM("taxAmount"), 0)::numeric as "totalTaxAmount",
        COALESCE(SUM(CASE WHEN status = 'PAID' THEN "taxAmount" ELSE 0 END), 0)::numeric as "paidTaxAmount",
        COALESCE(SUM(CASE WHEN status != 'PAID' THEN "taxAmount" ELSE 0 END), 0)::numeric as "unpaidTaxAmount",
        COUNT(CASE WHEN type = 'KDV' THEN 1 END)::int as "kdvCount",
        COUNT(CASE WHEN type = 'GELIR_VERGISI' THEN 1 END)::int as "gelirVergisiCount",
        COUNT(CASE WHEN type = 'STOPAJ' THEN 1 END)::int as "stopajCount"
      FROM tax_returns
      WHERE "userId" = $1 ${dateFilter}`,
      params
    );

    const stats = result.rows[0];

    return {
      totalCount: stats.totalCount,
      draftCount: stats.draftCount,
      submittedCount: stats.submittedCount,
      paidCount: stats.paidCount,
      overdueCount: stats.overdueCount,
      totalTaxAmount: parseFloat(stats.totalTaxAmount),
      paidTaxAmount: parseFloat(stats.paidTaxAmount),
      unpaidTaxAmount: parseFloat(stats.unpaidTaxAmount),
      kdvCount: stats.kdvCount,
      gelirVergisiCount: stats.gelirVergisiCount,
      stopajCount: stats.stopajCount,
    };
  }

  /**
   * Yaklaşan beyanname tarihleri
   */
  async getUpcomingReturns(userId: string, daysAhead: number = 30) {
    const result = await this.db.query(
      `SELECT * FROM tax_returns
       WHERE "userId" = $1
       AND status IN ('DRAFT', 'SUBMITTED')
       AND "dueDate" BETWEEN CURRENT_DATE AND CURRENT_DATE + INTERVAL '${daysAhead} days'
       ORDER BY "dueDate" ASC`,
      [userId]
    );

    return result.rows.map(row => ({
      ...row,
      taxableAmount: parseFloat(row.taxableAmount),
      taxAmount: parseFloat(row.taxAmount),
      daysUntilDue: Math.ceil(
        (new Date(row.dueDate).getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24)
      ),
    }));
  }

  /**
   * Vergi miktarını hesapla (basit hesaplama - gerçek uygulamada daha karmaşık olacak)
   */
  private calculateTaxAmount(taxType: string, taxableAmount: number): number {
    const rates: Record<string, number> = {
      'KDV': 0.18, // %18 KDV
      'GELIR_VERGISI': 0.20, // %20 Gelir Vergisi (basitleştirilmiş)
      'STOPAJ': 0.15, // %15 Stopaj
      'DAMGA_VERGISI': 0.00759, // %0.759 Damga Vergisi
      'KURUMLAR': 0.23, // %23 Kurumlar Vergisi
    };

    const rate = rates[taxType] || 0.18;
    return parseFloat((taxableAmount * rate).toFixed(2));
  }

  /**
   * Durum geçiş kontrolü
   */
  private validateStatusTransition(currentStatus: string, newStatus: string) {
    const validTransitions: Record<string, string[]> = {
      'DRAFT': ['SUBMITTED', 'CANCELLED'],
      'SUBMITTED': ['PAID', 'OVERDUE', 'REJECTED'],
      'PAID': [],
      'OVERDUE': ['PAID', 'CANCELLED'],
      'REJECTED': ['DRAFT', 'CANCELLED'],
      'CANCELLED': [],
    };

    if (!validTransitions[currentStatus]?.includes(newStatus)) {
      throw new BadRequestException(
        `Geçersiz durum geçişi: ${currentStatus} -> ${newStatus}`
      );
    }
  }

  /**
   * Otomatik beyanname oluştur (dönemsel)
   */
  async generateAutomatic(userId: string, type: string, period: string, year: number, month?: number) {
    this.logger.log(`Otomatik beyanname oluşturuluyor: ${type} - ${period}`);

    // Mevcut beyanname kontrolü
    const existing = await this.db.query(
      `SELECT id FROM tax_returns WHERE "userId" = $1 AND type = $2 AND period = $3`,
      [userId, type, period]
    );

    if (existing.rows.length > 0) {
      throw new ConflictException('Bu dönem için beyanname zaten mevcut');
    }

    // Dönem için fatura ve ödeme verilerini topla
    const taxableAmount = await this.calculateTaxableAmount(userId, type, year, month);

    // Vade tarihini hesapla
    const dueDate = this.calculateDueDate(type, year, month);

    return this.create(userId, {
      type,
      period,
      year,
      month,
      taxableAmount,
      dueDate,
    });
  }

  /**
   * Vergilendirilebilir matrah hesapla
   */
  private async calculateTaxableAmount(userId: string, type: string, year: number, month?: number): Promise<number> {
    // Dönem için fatura toplamı
    let query = `
      SELECT COALESCE(SUM(total), 0)::numeric as total
      FROM invoices
      WHERE "userId" = $1
      AND EXTRACT(YEAR FROM "invoiceDate") = $2
      AND status != 'CANCELLED'
    `;
    const params: any[] = [userId, year];

    if (month !== undefined) {
      query += ` AND EXTRACT(MONTH FROM "invoiceDate") = $3`;
      params.push(month);
    }

    const result = await this.db.query(query, params);
    return parseFloat(result.rows[0].total);
  }

  /**
   * Vade tarihi hesapla
   */
  private calculateDueDate(type: string, year: number, month?: number): Date {
    // Basitleştirilmiş vade hesaplama
    // Gerçek uygulamada vergi türüne göre daha karmaşık kurallar olacak

    const dueDates: Record<string, number> = {
      'KDV': 26, // Ayın 26'sı (takip eden ay)
      'GELIR_VERGISI': 25, // Mart 25
      'STOPAJ': 23, // Ayın 23'ü (takip eden ay)
      'DAMGA_VERGISI': 15, // Ayın 15'i (takip eden ay)
      'KURUMLAR': 30, // Nisan 30
    };

    const dueDay = dueDates[type] || 26;

    if (month !== undefined) {
      // Aylık beyannameler - takip eden ayın belirtilen günü
      const nextMonth = month === 12 ? 1 : month + 1;
      const dueYear = month === 12 ? year + 1 : year;
      return new Date(dueYear, nextMonth - 1, dueDay);
    } else {
      // Yıllık beyannameler
      if (type === 'GELIR_VERGISI') {
        return new Date(year + 1, 2, 25); // Mart 25
      } else if (type === 'KURUMLAR') {
        return new Date(year + 1, 3, 30); // Nisan 30
      }
      return new Date(year, 11, 31); // Varsayılan
    }
  }
}
