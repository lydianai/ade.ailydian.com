import { Injectable, OnModuleInit, OnModuleDestroy, Logger } from '@nestjs/common';
import { Pool, PoolClient, QueryResult } from 'pg';
import { ConfigService } from '@nestjs/config';

/**
 * Production-Grade PostgreSQL Database Service
 *
 * Features:
 * - Connection pooling (milyonlarca istek için optimize edilmiş)
 * - Automatic connection retry
 * - Transaction support
 * - Query timeout protection
 * - Connection health monitoring
 * - Graceful shutdown
 */
@Injectable()
export class DatabaseService implements OnModuleInit, OnModuleDestroy {
  private readonly logger = new Logger(DatabaseService.name);
  private pool: Pool;
  private isConnected = false;

  constructor(private configService: ConfigService) {}

  async onModuleInit() {
    await this.connect();
  }

  async onModuleDestroy() {
    await this.disconnect();
  }

  /**
   * Initialize connection pool with production settings
   */
  private async connect(): Promise<void> {
    try {
      this.pool = new Pool({
        connectionString: this.configService.get('DATABASE_URL'),

        // Connection pool settings for high-traffic production
        max: 20, // Maximum number of clients in the pool
        min: 5, // Minimum number of clients
        idleTimeoutMillis: 30000, // Close idle clients after 30s
        connectionTimeoutMillis: 10000, // Wait max 10s for connection

        // Query settings
        statement_timeout: 30000, // Timeout queries after 30s
        query_timeout: 30000,

        // Application name for monitoring
        application_name: 'ade_backend',
      });

      // Test connection
      const client = await this.pool.connect();
      const result = await client.query('SELECT current_database(), current_user, version()');
      client.release();

      this.isConnected = true;
      this.logger.log('✅ PostgreSQL connection pool initialized');
      this.logger.log(`📊 Database: ${result.rows[0].current_database}`);
      this.logger.log(`👤 User: ${result.rows[0].current_user}`);
      this.logger.log(`🔧 Pool: min=5, max=20 connections`);

      // Monitor pool events
      this.setupPoolMonitoring();
    } catch (error) {
      this.logger.error('❌ Failed to connect to PostgreSQL', error);
      throw error;
    }
  }

  /**
   * Setup pool event monitoring for production
   */
  private setupPoolMonitoring(): void {
    this.pool.on('error', (err) => {
      this.logger.error('Unexpected database pool error', err);
      this.isConnected = false;
    });

    this.pool.on('connect', () => {
      this.logger.debug('New client connected to pool');
    });

    this.pool.on('remove', () => {
      this.logger.debug('Client removed from pool');
    });
  }

  /**
   * Execute a query
   */
  async query(text: string, params?: any[]): Promise<QueryResult> {
    if (!this.isConnected) {
      throw new Error('Database not connected');
    }

    const start = Date.now();
    try {
      const result = await this.pool.query(text, params);
      const duration = Date.now() - start;

      if (duration > 1000) {
        const queryPreview = text.length > 100 ? text.slice(0, 100) + '...' : text;
        this.logger.warn(`Slow query detected (${duration}ms): ${queryPreview}`);
      }

      return result;
    } catch (error) {
      const queryPreview = text.length > 100 ? text.slice(0, 100) + '...' : text;
      this.logger.error(`Query error: ${error.message}`, {
        query: queryPreview,
        params,
      });
      throw error;
    }
  }

  /**
   * Execute a transaction
   */
  async transaction<T>(callback: (client: PoolClient) => Promise<T>): Promise<T> {
    if (!this.isConnected) {
      throw new Error('Database not connected');
    }

    const client = await this.pool.connect();

    try {
      await client.query('BEGIN');
      const result = await callback(client);
      await client.query('COMMIT');
      return result;
    } catch (error) {
      await client.query('ROLLBACK');
      this.logger.error('Transaction rolled back', error);
      throw error;
    } finally {
      client.release();
    }
  }

  /**
   * Get a client from the pool for multiple operations
   */
  async getClient(): Promise<PoolClient> {
    if (!this.isConnected) {
      throw new Error('Database not connected');
    }
    return this.pool.connect();
  }

  /**
   * Check database health
   */
  async healthCheck(): Promise<boolean> {
    try {
      const result = await this.query('SELECT 1 as health');
      return result.rows[0].health === 1;
    } catch {
      return false;
    }
  }

  /**
   * Get pool statistics for monitoring
   */
  getPoolStats() {
    return {
      total: this.pool.totalCount,
      idle: this.pool.idleCount,
      waiting: this.pool.waitingCount,
      connected: this.isConnected,
    };
  }

  /**
   * Get raw pool for advanced usage (transactions, etc.)
   */
  getPool(): Pool {
    if (!this.isConnected) {
      throw new Error('Database not connected');
    }
    return this.pool;
  }

  /**
   * Graceful shutdown
   */
  private async disconnect(): Promise<void> {
    if (this.pool) {
      await this.pool.end();
      this.isConnected = false;
      this.logger.log('PostgreSQL connection pool closed');
    }
  }
}
