import { Injectable, OnModuleInit, OnModuleDestroy, Logger } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { ConfigService } from '@nestjs/config';

/**
 * Production-Grade Prisma Service
 *
 * Features:
 * - Connection pooling (optimized for millions of requests)
 * - Automatic connection management
 * - Query logging in development
 * - Error handling
 * - Graceful shutdown
 * - Health checks
 */
@Injectable()
export class PrismaService extends PrismaClient implements OnModuleInit, OnModuleDestroy {
  private readonly logger = new Logger(PrismaService.name);

  constructor(private configService: ConfigService) {
    const isDevelopment = configService.get('NODE_ENV') !== 'production';

    super({
      datasources: {
        db: {
          url: configService.get('DATABASE_URL'),
        },
      },
      log: isDevelopment
        ? [
            { emit: 'event', level: 'query' },
            { emit: 'event', level: 'error' },
            { emit: 'event', level: 'warn' },
          ]
        : [{ emit: 'event', level: 'error' }],
    });

    // Log queries in development
    if (isDevelopment) {
      this.$on('query' as never, (e: any) => {
        if (e.duration > 1000) {
          this.logger.warn(`Slow query detected (${e.duration}ms): ${e.query}`);
        } else {
          this.logger.debug(`Query: ${e.query} (${e.duration}ms)`);
        }
      });
    }

    // Log errors
    this.$on('error' as never, (e: any) => {
      this.logger.error('Prisma error:', e);
    });

    // Log warnings
    this.$on('warn' as never, (e: any) => {
      this.logger.warn('Prisma warning:', e);
    });
  }

  async onModuleInit() {
    try {
      await this.$connect();
      this.logger.log('✅ Prisma connected to PostgreSQL');

      // Test connection
      const result = await this.$queryRaw`SELECT current_database(), current_user, version()`;
      if (Array.isArray(result) && result.length > 0) {
        const info = result[0] as any;
        this.logger.log(`📊 Database: ${info.current_database}`);
        this.logger.log(`👤 User: ${info.current_user}`);
      }
    } catch (error) {
      this.logger.error('❌ Failed to connect to PostgreSQL via Prisma', error);
      throw error;
    }
  }

  async onModuleDestroy() {
    try {
      await this.$disconnect();
      this.logger.log('Prisma disconnected from PostgreSQL');
    } catch (error) {
      this.logger.error('Error disconnecting Prisma', error);
    }
  }

  /**
   * Health check for monitoring
   */
  async healthCheck(): Promise<boolean> {
    try {
      await this.$queryRaw`SELECT 1`;
      return true;
    } catch {
      return false;
    }
  }

  /**
   * Clean up old sessions (runs periodically)
   */
  async cleanupExpiredSessions(): Promise<number> {
    try {
      const result = await this.session.deleteMany({
        where: {
          expiresAt: {
            lt: new Date(),
          },
        },
      });

      if (result.count > 0) {
        this.logger.log(`Cleaned up ${result.count} expired sessions`);
      }

      return result.count;
    } catch (error) {
      this.logger.error('Failed to cleanup expired sessions', error);
      return 0;
    }
  }

  /**
   * Get database statistics
   */
  async getStats() {
    try {
      const [userCount, sessionCount, customerCount] = await Promise.all([
        this.user.count(),
        this.session.count(),
        this.customer.count(),
      ]);

      return {
        users: userCount,
        sessions: sessionCount,
        customers: customerCount,
        timestamp: new Date(),
      };
    } catch (error) {
      this.logger.error('Failed to get database stats', error);
      return null;
    }
  }
}
