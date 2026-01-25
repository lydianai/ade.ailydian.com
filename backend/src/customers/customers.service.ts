import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { DatabaseService } from '../database/database.service';
import { CreateCustomerDto } from './dto/create-customer.dto';
import { UpdateCustomerDto } from './dto/update-customer.dto';
import { QueryCustomerDto } from './dto/query-customer.dto';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class CustomersService {
  constructor(private readonly db: DatabaseService) {}

  async create(userId: string, createCustomerDto: CreateCustomerDto) {
    const id = uuidv4();
    const now = new Date();

    const query = `
      INSERT INTO customers (
        id, "userId", type, "firstName", "lastName", "tcNo",
        "companyName", "taxOffice", "taxNumber", "mersisNo",
        email, phone, address, city, district, "postalCode",
        "creditLimit", balance, notes, "createdAt", "updatedAt"
      ) VALUES (
        $1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16, $17, $18, $19, $20, $21
      )
      RETURNING *
    `;

    const values = [
      id,
      userId,
      createCustomerDto.type,
      createCustomerDto.firstName || null,
      createCustomerDto.lastName || null,
      createCustomerDto.tcNo || null,
      createCustomerDto.companyName || null,
      createCustomerDto.taxOffice || null,
      createCustomerDto.taxNumber || null,
      createCustomerDto.mersisNo || null,
      createCustomerDto.email || null,
      createCustomerDto.phone || null,
      createCustomerDto.address || null,
      createCustomerDto.city || null,
      createCustomerDto.district || null,
      createCustomerDto.postalCode || null,
      createCustomerDto.creditLimit || null,
      0, // balance starts at 0
      createCustomerDto.notes || null,
      now,
      now,
    ];

    const result = await this.db.query(query, values);
    return result.rows[0];
  }

  async findAll(userId: string, queryDto: QueryCustomerDto) {
    const { page = 1, limit = 10, search, type, city } = queryDto;
    const offset = (page - 1) * limit;

    let whereConditions = ['"userId" = $1', '"deletedAt" IS NULL'];
    const params: any[] = [userId];
    let paramIndex = 2;

    if (search) {
      whereConditions.push(`(
        "firstName" ILIKE $${paramIndex} OR
        "lastName" ILIKE $${paramIndex} OR
        "companyName" ILIKE $${paramIndex} OR
        email ILIKE $${paramIndex}
      )`);
      params.push(`%${search}%`);
      paramIndex++;
    }

    if (type) {
      whereConditions.push(`type = $${paramIndex}`);
      params.push(type);
      paramIndex++;
    }

    if (city) {
      whereConditions.push(`city = $${paramIndex}`);
      params.push(city);
      paramIndex++;
    }

    const whereClause = whereConditions.join(' AND ');

    // Get total count
    const countQuery = `SELECT COUNT(*) as total FROM customers WHERE ${whereClause}`;
    const countResult = await this.db.query(countQuery, params);
    const total = parseInt(countResult.rows[0].total);

    // Get paginated data
    const dataQuery = `
      SELECT * FROM customers
      WHERE ${whereClause}
      ORDER BY "createdAt" DESC
      LIMIT $${paramIndex} OFFSET $${paramIndex + 1}
    `;
    params.push(limit, offset);
    const dataResult = await this.db.query(dataQuery, params);

    return {
      data: dataResult.rows,
      pagination: {
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit),
      },
    };
  }

  async findOne(userId: string, id: string) {
    const query = `
      SELECT * FROM customers
      WHERE id = $1 AND "userId" = $2 AND "deletedAt" IS NULL
    `;
    const result = await this.db.query(query, [id, userId]);

    if (result.rows.length === 0) {
      throw new NotFoundException(`Müşteri bulunamadı (ID: ${id})`);
    }

    return result.rows[0];
  }

  async update(userId: string, id: string, updateCustomerDto: UpdateCustomerDto) {
    // First check if customer exists
    await this.findOne(userId, id);

    const updates: string[] = [];
    const values: any[] = [];
    let paramIndex = 1;

    // Build dynamic UPDATE query based on provided fields
    Object.entries(updateCustomerDto).forEach(([key, value]) => {
      if (value !== undefined) {
        updates.push(`"${key}" = $${paramIndex}`);
        values.push(value);
        paramIndex++;
      }
    });

    if (updates.length === 0) {
      throw new BadRequestException('Güncellenecek alan bulunamadı');
    }

    updates.push(`"updatedAt" = $${paramIndex}`);
    values.push(new Date());
    paramIndex++;

    values.push(id, userId);

    const query = `
      UPDATE customers
      SET ${updates.join(', ')}
      WHERE id = $${paramIndex} AND "userId" = $${paramIndex + 1}
      RETURNING *
    `;

    const result = await this.db.query(query, values);
    return result.rows[0];
  }

  async remove(userId: string, id: string) {
    // Soft delete
    const query = `
      UPDATE customers
      SET "deletedAt" = $1, "updatedAt" = $1
      WHERE id = $2 AND "userId" = $3 AND "deletedAt" IS NULL
      RETURNING id
    `;
    const result = await this.db.query(query, [new Date(), id, userId]);

    if (result.rows.length === 0) {
      throw new NotFoundException(`Müşteri bulunamadı (ID: ${id})`);
    }

    return { message: 'Müşteri başarıyla silindi', id };
  }

  async getStats(userId: string) {
    const query = `
      SELECT
        COUNT(*)::int as total,
        COUNT(CASE WHEN type = 'INDIVIDUAL' THEN 1 END)::int as individual,
        COUNT(CASE WHEN type = 'CORPORATE' THEN 1 END)::int as corporate,
        SUM(balance)::decimal as total_balance
      FROM customers
      WHERE "userId" = $1 AND "deletedAt" IS NULL
    `;
    const result = await this.db.query(query, [userId]);
    return result.rows[0];
  }
}
