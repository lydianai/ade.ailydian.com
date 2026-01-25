import {
  Injectable,
  NotFoundException,
  BadRequestException,
  InternalServerErrorException,
} from '@nestjs/common';
import { DatabaseService } from '../database/database.service';
import * as fs from 'fs/promises';
import * as path from 'path';
import { createHash } from 'crypto';

/**
 * Documents Service - Doküman Yönetimi
 * - Dosya yükleme ve indirme
 * - Doküman metadata yönetimi
 * - Kategori ve etiket sistemi
 * - Dosya güvenliği ve erişim kontrolü
 */
@Injectable()
export class DocumentsService {
  private readonly uploadDir = path.join(process.cwd(), 'uploads');
  private readonly allowedMimeTypes = [
    'application/pdf',
    'image/jpeg',
    'image/png',
    'image/webp',
    'application/vnd.ms-excel',
    'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
    'application/msword',
    'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
    'text/plain',
    'text/csv',
  ];
  private readonly maxFileSize = 10 * 1024 * 1024; // 10 MB

  constructor(private readonly db: DatabaseService) {
    this.ensureUploadDirExists();
  }

  /**
   * Ensure upload directory exists
   */
  private async ensureUploadDirExists() {
    try {
      await fs.access(this.uploadDir);
    } catch {
      await fs.mkdir(this.uploadDir, { recursive: true });
    }
  }

  /**
   * List all documents with filters
   */
  async findAll(
    userId: string,
    page = 1,
    limit = 20,
    category?: string,
    relatedType?: string,
    relatedId?: string,
    startDate?: Date,
    endDate?: Date,
  ) {
    const offset = (page - 1) * limit;
    let whereConditions = ['d."kullaniciId" = $1', 'd."deletedAt" IS NULL'];
    const params: any[] = [userId];
    let paramIndex = 2;

    if (category) {
      whereConditions.push(`d.category = $${paramIndex}`);
      params.push(category);
      paramIndex++;
    }

    if (relatedType) {
      whereConditions.push(`d."relatedType" = $${paramIndex}`);
      params.push(relatedType);
      paramIndex++;
    }

    if (relatedId) {
      whereConditions.push(`d."relatedId" = $${paramIndex}`);
      params.push(relatedId);
      paramIndex++;
    }

    if (startDate) {
      whereConditions.push(`d."uploadedAt" >= $${paramIndex}`);
      params.push(startDate);
      paramIndex++;
    }

    if (endDate) {
      whereConditions.push(`d."uploadedAt" <= $${paramIndex}`);
      params.push(endDate);
      paramIndex++;
    }

    const whereClause = whereConditions.join(' AND ');

    // Get total count
    const countResult = await this.db.query(
      `SELECT COUNT(*)::int as total FROM documents d WHERE ${whereClause}`,
      params,
    );
    const total = countResult.rows[0].total;

    // Get documents
    const result = await this.db.query(
      `SELECT
        d.id,
        d."kullaniciId",
        d."fileName",
        d."originalName",
        d."mimeType",
        d."fileSize",
        d.category,
        d."relatedType",
        d."relatedId",
        d.description,
        d.tags,
        d."uploadedAt",
        d."createdAt",
        d."updatedAt"
      FROM documents d
      WHERE ${whereClause}
      ORDER BY d."uploadedAt" DESC
      LIMIT $${paramIndex} OFFSET $${paramIndex + 1}`,
      [...params, limit, offset],
    );

    return {
      data: result.rows,
      pagination: {
        total,
        page,
        limit,
        totalPages: Math.ceil(total / limit),
      },
    };
  }

  /**
   * Get documents by related entity
   */
  async findByRelated(userId: string, relatedType: string, relatedId: string) {
    const result = await this.db.query(
      `SELECT
        id,
        "kullaniciId",
        "fileName",
        "originalName",
        "mimeType",
        "fileSize",
        category,
        "relatedType",
        "relatedId",
        description,
        tags,
        "uploadedAt",
        "createdAt",
        "updatedAt"
      FROM documents
      WHERE "kullaniciId" = $1
        AND "relatedType" = $2
        AND "relatedId" = $3
        AND "deletedAt" IS NULL
      ORDER BY "uploadedAt" DESC`,
      [userId, relatedType, relatedId],
    );

    return result.rows;
  }

  /**
   * Get statistics
   */
  async getStatistics(userId: string) {
    const result = await this.db.query(
      `SELECT
        COUNT(*)::int as "totalDocuments",
        COALESCE(SUM("fileSize"), 0)::bigint as "totalSize",
        COUNT(DISTINCT category)::int as "totalCategories",
        COUNT(CASE WHEN "uploadedAt" >= NOW() - INTERVAL '30 days' THEN 1 END)::int as "recentDocuments"
      FROM documents
      WHERE "kullaniciId" = $1 AND "deletedAt" IS NULL`,
      [userId],
    );

    const categoryResult = await this.db.query(
      `SELECT
        category,
        COUNT(*)::int as count,
        COALESCE(SUM("fileSize"), 0)::bigint as "totalSize"
      FROM documents
      WHERE "kullaniciId" = $1 AND "deletedAt" IS NULL
      GROUP BY category
      ORDER BY count DESC`,
      [userId],
    );

    return {
      ...result.rows[0],
      byCategory: categoryResult.rows,
    };
  }

  /**
   * Get single document
   */
  async findOne(id: string, userId: string) {
    const result = await this.db.query(
      `SELECT
        id,
        "kullaniciId",
        "fileName",
        "originalName",
        "mimeType",
        "fileSize",
        category,
        "relatedType",
        "relatedId",
        description,
        tags,
        "uploadedAt",
        "createdAt",
        "updatedAt"
      FROM documents
      WHERE id = $1 AND "kullaniciId" = $2 AND "deletedAt" IS NULL`,
      [id, userId],
    );

    if (result.rows.length === 0) {
      throw new NotFoundException('Doküman bulunamadı');
    }

    return result.rows[0];
  }

  /**
   * Upload document
   */
  async upload(
    userId: string,
    file: any,
    metadata: {
      category: string;
      relatedType?: string;
      relatedId?: string;
      description?: string;
      tags?: string[];
    },
  ) {
    // Validate file
    if (!file) {
      throw new BadRequestException('Dosya bulunamadı');
    }

    if (!this.allowedMimeTypes.includes(file.mimetype)) {
      throw new BadRequestException('Desteklenmeyen dosya formatı');
    }

    if (file.size > this.maxFileSize) {
      throw new BadRequestException(
        `Dosya boyutu ${this.maxFileSize / 1024 / 1024}MB\'dan küçük olmalıdır`,
      );
    }

    // Generate unique filename
    const fileHash = createHash('sha256')
      .update(file.buffer)
      .digest('hex')
      .substring(0, 16);
    const ext = path.extname(file.originalname);
    const fileName = `${Date.now()}-${fileHash}${ext}`;
    const filePath = path.join(this.uploadDir, fileName);

    try {
      // Save file
      await fs.writeFile(filePath, file.buffer);

      // Save metadata to database
      const result = await this.db.query(
        `INSERT INTO documents (
          "kullaniciId",
          "fileName",
          "originalName",
          "mimeType",
          "fileSize",
          category,
          "relatedType",
          "relatedId",
          description,
          tags,
          "uploadedAt"
        ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, NOW())
        RETURNING
          id,
          "kullaniciId",
          "fileName",
          "originalName",
          "mimeType",
          "fileSize",
          category,
          "relatedType",
          "relatedId",
          description,
          tags,
          "uploadedAt",
          "createdAt"`,
        [
          userId,
          fileName,
          file.originalname,
          file.mimetype,
          file.size,
          metadata.category,
          metadata.relatedType || null,
          metadata.relatedId || null,
          metadata.description || null,
          metadata.tags ? JSON.stringify(metadata.tags) : null,
        ],
      );

      return result.rows[0];
    } catch (error) {
      // Clean up file if database insert fails
      try {
        await fs.unlink(filePath);
      } catch {}
      throw new InternalServerErrorException('Dosya yüklenirken hata oluştu');
    }
  }

  /**
   * Download document
   */
  async download(id: string, userId: string) {
    const document = await this.findOne(id, userId);
    const filePath = path.join(this.uploadDir, document.fileName);

    try {
      await fs.access(filePath);
      const fileBuffer = await fs.readFile(filePath);

      return {
        buffer: fileBuffer,
        fileName: document.originalName,
        mimeType: document.mimeType,
      };
    } catch {
      throw new NotFoundException('Dosya bulunamadı');
    }
  }

  /**
   * Update document metadata
   */
  async update(
    id: string,
    userId: string,
    updateData: {
      category?: string;
      description?: string;
      tags?: string[];
    },
  ) {
    await this.findOne(id, userId);

    const setClauses: string[] = [];
    const params: any[] = [];
    let paramIndex = 1;

    if (updateData.category !== undefined) {
      setClauses.push(`category = $${paramIndex}`);
      params.push(updateData.category);
      paramIndex++;
    }

    if (updateData.description !== undefined) {
      setClauses.push(`description = $${paramIndex}`);
      params.push(updateData.description);
      paramIndex++;
    }

    if (updateData.tags !== undefined) {
      setClauses.push(`tags = $${paramIndex}`);
      params.push(JSON.stringify(updateData.tags));
      paramIndex++;
    }

    if (setClauses.length === 0) {
      throw new BadRequestException('Güncellenecek veri bulunamadı');
    }

    setClauses.push(`"updatedAt" = NOW()`);
    params.push(id, userId);

    const result = await this.db.query(
      `UPDATE documents
       SET ${setClauses.join(', ')}
       WHERE id = $${paramIndex} AND "kullaniciId" = $${paramIndex + 1} AND "deletedAt" IS NULL
       RETURNING
         id,
         "kullaniciId",
         "fileName",
         "originalName",
         "mimeType",
         "fileSize",
         category,
         "relatedType",
         "relatedId",
         description,
         tags,
         "uploadedAt",
         "updatedAt"`,
      params,
    );

    return result.rows[0];
  }

  /**
   * Delete document (soft delete + file removal)
   */
  async remove(id: string, userId: string) {
    const document = await this.findOne(id, userId);

    // Soft delete in database
    await this.db.query(
      `UPDATE documents
       SET "deletedAt" = NOW()
       WHERE id = $1 AND "kullaniciId" = $2`,
      [id, userId],
    );

    // Delete physical file
    const filePath = path.join(this.uploadDir, document.fileName);
    try {
      await fs.unlink(filePath);
    } catch (error) {
      // Log error but don't throw - metadata is already soft deleted
      console.warn(`Failed to delete file: ${filePath}`, error);
    }

    return { message: 'Doküman başarıyla silindi' };
  }

  /**
   * Search documents by tags
   */
  async searchByTags(userId: string, tags: string[]) {
    const result = await this.db.query(
      `SELECT
        id,
        "kullaniciId",
        "fileName",
        "originalName",
        "mimeType",
        "fileSize",
        category,
        "relatedType",
        "relatedId",
        description,
        tags,
        "uploadedAt",
        "createdAt",
        "updatedAt"
      FROM documents
      WHERE "kullaniciId" = $1
        AND "deletedAt" IS NULL
        AND tags::jsonb ?| $2
      ORDER BY "uploadedAt" DESC`,
      [userId, tags],
    );

    return result.rows;
  }
}
