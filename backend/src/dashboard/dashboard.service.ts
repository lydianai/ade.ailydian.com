import { Injectable, Logger } from '@nestjs/common';
import { DatabaseService } from '../database/database.service';

/**
 * Dashboard Service - Real-time Statistics & Analytics
 * Provides comprehensive business intelligence for all user roles
 */
@Injectable()
export class DashboardService {
  private readonly logger = new Logger(DashboardService.name);

  constructor(private db: DatabaseService) {}

  /**
   * Get comprehensive dashboard statistics for the authenticated user
   */
  async getStats(userId: string) {
    this.logger.log(`Dashboard istatistikleri: ${userId}`);

    const [
      userInfo,
      customerStats,
      invoiceStats,
      paymentStats,
      recentActivity,
    ] = await Promise.all([
      this.getUserInfo(userId),
      this.getCustomerStats(userId),
      this.getInvoiceStats(userId),
      this.getPaymentStats(userId),
      this.getRecentActivity(userId),
    ]);

    return {
      user: userInfo,
      customers: customerStats,
      invoices: invoiceStats,
      payments: paymentStats,
      recentActivity,
      generatedAt: new Date().toISOString(),
    };
  }

  /**
   * Get user information with business details
   */
  private async getUserInfo(userId: string) {
    const result = await this.db.query(
      `SELECT
        id,
        email,
        "firstName",
        "lastName",
        role,
        "businessName",
        "taxNumber",
        "createdAt"
      FROM users
      WHERE id = $1`,
      [userId]
    );

    return result.rows[0] || null;
  }

  /**
   * Get customer statistics
   */
  private async getCustomerStats(userId: string) {
    const result = await this.db.query(
      `SELECT
        COUNT(*)::int as total,
        COUNT(CASE WHEN "deletedAt" IS NULL THEN 1 END)::int as active,
        COUNT(CASE WHEN "deletedAt" IS NOT NULL THEN 1 END)::int as inactive,
        COUNT(CASE WHEN "createdAt" >= NOW() - INTERVAL '30 days' AND "deletedAt" IS NULL THEN 1 END)::int as "newThisMonth"
      FROM customers
      WHERE "userId" = $1`,
      [userId]
    );

    return result.rows[0] || { total: 0, active: 0, inactive: 0, newThisMonth: 0 };
  }

  /**
   * Get invoice statistics with financial summary
   */
  private async getInvoiceStats(userId: string) {
    const result = await this.db.query(
      `SELECT
        COUNT(*)::int as total,
        COUNT(CASE WHEN status = 'DRAFT' THEN 1 END)::int as draft,
        COUNT(CASE WHEN status = 'SENT' THEN 1 END)::int as sent,
        COUNT(CASE WHEN status = 'ACCEPTED' THEN 1 END)::int as accepted,
        COUNT(CASE WHEN status = 'REJECTED' THEN 1 END)::int as rejected,
        COUNT(CASE WHEN status = 'PAID' THEN 1 END)::int as paid,
        COUNT(CASE WHEN status = 'CANCELLED' THEN 1 END)::int as cancelled,
        COALESCE(SUM(CASE WHEN status = 'PAID' THEN total ELSE 0 END), 0)::numeric as "totalPaid",
        COALESCE(SUM(CASE WHEN status IN ('SENT', 'ACCEPTED') THEN total ELSE 0 END), 0)::numeric as "totalPending",
        COUNT(CASE WHEN "createdAt" >= NOW() - INTERVAL '30 days' THEN 1 END)::int as "thisMonth"
      FROM invoices
      WHERE "userId" = $1`,
      [userId]
    );

    const stats = result.rows[0] || {
      total: 0,
      draft: 0,
      sent: 0,
      accepted: 0,
      rejected: 0,
      paid: 0,
      cancelled: 0,
      totalPaid: '0',
      totalPending: '0',
      thisMonth: 0,
    };

    return {
      ...stats,
      totalPaid: parseFloat(stats.totalPaid),
      totalPending: parseFloat(stats.totalPending),
    };
  }

  /**
   * Get payment statistics
   */
  private async getPaymentStats(userId: string) {
    const result = await this.db.query(
      `SELECT
        COUNT(*)::int as total,
        COALESCE(SUM(amount), 0)::numeric as "totalAmount",
        COUNT(CASE WHEN status = 'COMPLETED' THEN 1 END)::int as completed,
        COUNT(CASE WHEN status = 'PENDING' THEN 1 END)::int as pending,
        COUNT(CASE WHEN status = 'FAILED' THEN 1 END)::int as failed,
        COUNT(CASE WHEN "paymentDate" >= NOW() - INTERVAL '30 days' THEN 1 END)::int as "thisMonth"
      FROM payments
      WHERE "userId" = $1`,
      [userId]
    );

    const stats = result.rows[0] || {
      total: 0,
      totalAmount: '0',
      completed: 0,
      pending: 0,
      failed: 0,
      thisMonth: 0,
    };

    return {
      ...stats,
      totalAmount: parseFloat(stats.totalAmount),
    };
  }

  /**
   * Get recent activity (last 10 actions)
   */
  private async getRecentActivity(userId: string) {
    const result = await this.db.query(
      `SELECT
        action,
        resource,
        "resourceId",
        changes,
        "createdAt"
      FROM audit_logs
      WHERE "userId" = $1
      ORDER BY "createdAt" DESC
      LIMIT 10`,
      [userId]
    );

    return result.rows;
  }

  /**
   * Get monthly revenue chart data (last 12 months)
   */
  async getRevenueChart(userId: string) {
    const result = await this.db.query(
      `SELECT
        TO_CHAR(DATE_TRUNC('month', "paymentDate"), 'YYYY-MM') as month,
        COALESCE(SUM(amount), 0)::numeric as revenue,
        COUNT(*)::int as "paymentCount"
      FROM payments
      WHERE "userId" = $1
        AND status = 'COMPLETED'
        AND "paymentDate" >= NOW() - INTERVAL '12 months'
      GROUP BY DATE_TRUNC('month', "paymentDate")
      ORDER BY month ASC`,
      [userId]
    );

    return result.rows.map(row => ({
      month: row.month,
      revenue: parseFloat(row.revenue),
      paymentCount: row.paymentCount,
    }));
  }

  /**
   * Get top customers by revenue
   */
  async getTopCustomers(userId: string, limit: number = 5) {
    const result = await this.db.query(
      `SELECT
        c.id,
        c.type,
        c."firstName",
        c."lastName",
        c."companyName",
        c.email,
        COALESCE(SUM(p.amount), 0)::numeric as "totalRevenue",
        COUNT(p.id)::int as "paymentCount"
      FROM customers c
      LEFT JOIN invoices i ON i."customerId" = c.id
      LEFT JOIN payments p ON p."invoiceId" = i.id AND p.status = 'COMPLETED'
      WHERE c."userId" = $1 AND c."deletedAt" IS NULL
      GROUP BY c.id, c.type, c."firstName", c."lastName", c."companyName", c.email
      ORDER BY "totalRevenue" DESC
      LIMIT $2`,
      [userId, limit]
    );

    return result.rows.map(row => ({
      ...row,
      totalRevenue: parseFloat(row.totalRevenue),
      name: row.type === 'CORPORATE' ? row.companyName : `${row.firstName || ''} ${row.lastName || ''}`.trim(),
    }));
  }
}
