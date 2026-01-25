import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { PrismaService } from '../../database/prisma.service';
import axios, { AxiosInstance } from 'axios';
import * as crypto from 'crypto';

/**
 * Integrations Service
 *
 * Handles all external integrations:
 * - E-Devlet APIs (GIB, SGK, e-Beyanname)
 * - E-Commerce Platforms (Trendyol, Hepsiburada, N11, Amazon)
 * - OAuth management
 * - Data synchronization
 *
 * @author ADE Backend Team
 * @since 2026-01-24
 */

@Injectable()
export class IntegrationsService {
  constructor(private readonly prisma: PrismaService) {}

  // MARK: - Integration Management

  /**
   * Get all integrations for a user
   */
  async getIntegrations(userId: string) {
    const integrations = await this.prisma.integration.findMany({
      where: { userId },
      orderBy: { createdAt: 'desc' },
    });

    return integrations.map((integration) => ({
      id: integration.id,
      platform: integration.platform,
      name: this.getPlatformDisplayName(integration.platform),
      category: this.getPlatformCategory(integration.platform),
      status: integration.status,
      isConnected: integration.status === 'CONNECTED',
      lastSync: integration.lastSyncAt,
      config: this.sanitizeConfig(integration.config),
      createdAt: integration.createdAt,
    }));
  }

  /**
   * Get a specific integration
   */
  async getIntegration(id: string, userId: string) {
    const integration = await this.prisma.integration.findFirst({
      where: { id, userId },
    });

    if (!integration) {
      throw new HttpException('Integration not found', HttpStatus.NOT_FOUND);
    }

    return {
      ...integration,
      config: this.sanitizeConfig(integration.config),
    };
  }

  /**
   * Connect a new integration
   */
  async connectIntegration(
    userId: string,
    platform: string,
    credentials: any,
  ) {
    // Validate credentials based on platform
    await this.validateCredentials(platform, credentials);

    // Test connection
    const isValid = await this.testConnection(platform, credentials);
    if (!isValid) {
      throw new HttpException(
        'Invalid credentials or connection failed',
        HttpStatus.BAD_REQUEST,
      );
    }

    // Encrypt sensitive data
    const encryptedConfig = this.encryptCredentials(credentials);

    // Create integration
    const integration = await this.prisma.integration.create({
      data: {
        userId,
        name: `${platform} Integration`,
        type: 'OTHER',
        platform,
        status: 'CONNECTED',
        config: encryptedConfig,
        lastSyncAt: new Date(),
      },
    });

    // Initial sync
    await this.syncIntegration(integration.id, userId);

    return {
      id: integration.id,
      platform: integration.platform,
      status: integration.status,
      message: 'Integration connected successfully',
    };
  }

  /**
   * Update integration credentials
   */
  async updateIntegration(
    id: string,
    userId: string,
    credentials: any,
  ) {
    const integration = await this.prisma.integration.findFirst({
      where: { id, userId },
    });

    if (!integration) {
      throw new HttpException('Integration not found', HttpStatus.NOT_FOUND);
    }

    // Validate new credentials
    await this.validateCredentials(integration.platform, credentials);

    // Test connection
    const isValid = await this.testConnection(integration.platform, credentials);
    if (!isValid) {
      throw new HttpException(
        'Invalid credentials or connection failed',
        HttpStatus.BAD_REQUEST,
      );
    }

    // Encrypt and update
    const encryptedConfig = this.encryptCredentials(credentials);

    const updated = await this.prisma.integration.update({
      where: { id },
      data: {
        config: encryptedConfig,
        status: 'CONNECTED',
        lastSyncAt: new Date(),
      },
    });

    return {
      id: updated.id,
      platform: updated.platform,
      status: updated.status,
      message: 'Integration updated successfully',
    };
  }

  /**
   * Disconnect an integration
   */
  async disconnectIntegration(id: string, userId: string) {
    const integration = await this.prisma.integration.findFirst({
      where: { id, userId },
    });

    if (!integration) {
      throw new HttpException('Integration not found', HttpStatus.NOT_FOUND);
    }

    await this.prisma.integration.update({
      where: { id },
      data: {
        status: 'DISCONNECTED',
        config: {}, // Clear credentials
      },
    });

    return {
      id,
      platform: integration.platform,
      status: 'DISCONNECTED',
      message: 'Integration disconnected successfully',
    };
  }

  /**
   * Sync integration data
   */
  async syncIntegration(id: string, userId: string) {
    const integration = await this.prisma.integration.findFirst({
      where: { id, userId },
    });

    if (!integration) {
      throw new HttpException('Integration not found', HttpStatus.NOT_FOUND);
    }

    if (integration.status !== 'CONNECTED') {
      throw new HttpException(
        'Integration is not connected',
        HttpStatus.BAD_REQUEST,
      );
    }

    try {
      const credentials = this.decryptCredentials(integration.config);
      let syncResult;

      // Route to appropriate sync handler
      const category = this.getPlatformCategory(integration.platform);

      if (category === 'e-government') {
        syncResult = await this.syncEGovernmentPlatform(
          integration.platform,
          credentials,
          userId,
        );
      } else if (category === 'e-commerce') {
        syncResult = await this.syncECommercePlatform(
          integration.platform,
          credentials,
          userId,
        );
      } else {
        throw new Error('Unsupported platform category');
      }

      // Update last sync time
      await this.prisma.integration.update({
        where: { id },
        data: { lastSyncAt: new Date() },
      });

      return {
        id,
        platform: integration.platform,
        syncedAt: new Date(),
        result: syncResult,
      };
    } catch (error) {
      // Mark as error
      await this.prisma.integration.update({
        where: { id },
        data: { status: 'ERROR' },
      });

      throw new HttpException(
        `Sync failed: ${error.message}`,
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  // MARK: - E-Government Integrations

  /**
   * Sync E-Government platform (GIB, SGK, e-Beyanname)
   */
  private async syncEGovernmentPlatform(
    platform: string,
    credentials: any,
    userId: string,
  ) {
    switch (platform) {
      case 'gib':
        return await this.syncGIB(credentials, userId);
      case 'sgk':
        return await this.syncSGK(credentials, userId);
      case 'e-beyanname':
        return await this.syncEBeyanname(credentials, userId);
      default:
        throw new Error('Unsupported e-government platform');
    }
  }

  /**
   * Sync GIB (Gelir İdaresi Başkanlığı) - Tax Administration
   */
  private async syncGIB(credentials: any, userId: string) {
    // GIB API integration
    // In production, this would use actual GIB web services

    const client = this.createGIBClient(credentials);

    try {
      // 1. Sync e-Invoices
      const eInvoices = await this.fetchGIBInvoices(client);
      const invoiceCount = await this.saveInvoices(eInvoices, userId);

      // 2. Sync e-Archive Invoices
      const eArchive = await this.fetchGIBArchiveInvoices(client);
      const archiveCount = await this.saveInvoices(eArchive, userId);

      // 3. Sync Tax Returns
      const taxReturns = await this.fetchGIBTaxReturns(client);
      const returnCount = await this.saveTaxReturns(taxReturns, userId);

      return {
        eInvoices: invoiceCount,
        eArchive: archiveCount,
        taxReturns: returnCount,
        totalSynced: invoiceCount + archiveCount + returnCount,
      };
    } catch (error) {
      throw new Error(`GIB sync failed: ${error.message}`);
    }
  }

  /**
   * Sync SGK (Sosyal Güvenlik Kurumu) - Social Security
   */
  private async syncSGK(credentials: any, userId: string) {
    // SGK API integration
    const client = this.createSGKClient(credentials);

    try {
      // 1. Sync employee information
      const employees = await this.fetchSGKEmployees(client);
      const employeeCount = await this.saveEmployees(employees, userId);

      // 2. Sync SGK declarations
      const declarations = await this.fetchSGKDeclarations(client);
      const declarationCount = await this.saveDeclarations(declarations, userId);

      return {
        employees: employeeCount,
        declarations: declarationCount,
        totalSynced: employeeCount + declarationCount,
      };
    } catch (error) {
      throw new Error(`SGK sync failed: ${error.message}`);
    }
  }

  /**
   * Sync e-Beyanname (Electronic Tax Returns)
   */
  private async syncEBeyanname(credentials: any, userId: string) {
    // e-Beyanname API integration
    const client = this.createEBeyannameClient(credentials);

    try {
      // Sync submitted tax returns
      const returns = await this.fetchEBeyannameReturns(client);
      const returnCount = await this.saveTaxReturns(returns, userId);

      return {
        taxReturns: returnCount,
        totalSynced: returnCount,
      };
    } catch (error) {
      throw new Error(`e-Beyanname sync failed: ${error.message}`);
    }
  }

  // MARK: - E-Commerce Platform Integrations

  /**
   * Sync E-Commerce platform
   */
  private async syncECommercePlatform(
    platform: string,
    credentials: any,
    userId: string,
  ) {
    switch (platform) {
      case 'trendyol':
        return await this.syncTrendyol(credentials, userId);
      case 'hepsiburada':
        return await this.syncHepsiburada(credentials, userId);
      case 'n11':
        return await this.syncN11(credentials, userId);
      case 'amazon':
        return await this.syncAmazon(credentials, userId);
      default:
        throw new Error('Unsupported e-commerce platform');
    }
  }

  /**
   * Sync Trendyol
   */
  private async syncTrendyol(credentials: any, userId: string) {
    const client = axios.create({
      baseURL: 'https://api.trendyol.com/sapigw',
      headers: {
        'User-Agent': credentials.supplierId,
        Authorization: `Basic ${Buffer.from(`${credentials.apiKey}:${credentials.apiSecret}`).toString('base64')}`,
      },
    });

    try {
      // 1. Sync products
      const products = await client.get('/suppliers/products');
      const productCount = await this.saveProducts(products.data.content, userId, 'trendyol');

      // 2. Sync orders
      const orders = await client.get('/suppliers/orders', {
        params: { status: 'Created,Picking,Invoiced,Shipped' },
      });
      const orderCount = await this.saveOrders(orders.data.content, userId, 'trendyol');

      return {
        products: productCount,
        orders: orderCount,
        totalSynced: productCount + orderCount,
      };
    } catch (error) {
      throw new Error(`Trendyol sync failed: ${error.message}`);
    }
  }

  /**
   * Sync Hepsiburada
   */
  private async syncHepsiburada(credentials: any, userId: string) {
    const client = axios.create({
      baseURL: 'https://mpop.hepsiburada.com/api',
      headers: {
        Authorization: `Bearer ${credentials.accessToken}`,
      },
    });

    try {
      // 1. Sync products
      const products = await client.get('/products');
      const productCount = await this.saveProducts(products.data.listings, userId, 'hepsiburada');

      // 2. Sync orders
      const orders = await client.get('/orders', {
        params: { status: 'Received,Preparing,Shipped' },
      });
      const orderCount = await this.saveOrders(orders.data.orders, userId, 'hepsiburada');

      return {
        products: productCount,
        orders: orderCount,
        totalSynced: productCount + orderCount,
      };
    } catch (error) {
      throw new Error(`Hepsiburada sync failed: ${error.message}`);
    }
  }

  /**
   * Sync N11
   */
  private async syncN11(credentials: any, userId: string) {
    const client = axios.create({
      baseURL: 'https://api.n11.com/rest/n11Api',
      headers: {
        'Content-Type': 'application/xml',
      },
    });

    try {
      // N11 uses XML-based API with SOAP-like structure
      // 1. Sync products
      const productsXml = `
        <GetProductListRequest>
          <auth>
            <appKey>${credentials.apiKey}</appKey>
            <appSecret>${credentials.apiSecret}</appSecret>
          </auth>
        </GetProductListRequest>
      `;
      const products = await client.post('/ProductService', productsXml);
      const productCount = await this.parseN11XmlAndSaveProducts(products.data, userId);

      // 2. Sync orders
      const ordersXml = `
        <OrderListRequest>
          <auth>
            <appKey>${credentials.apiKey}</appKey>
            <appSecret>${credentials.apiSecret}</appSecret>
          </auth>
        </OrderListRequest>
      `;
      const orders = await client.post('/OrderService', ordersXml);
      const orderCount = await this.parseN11XmlAndSaveOrders(orders.data, userId);

      return {
        products: productCount,
        orders: orderCount,
        totalSynced: productCount + orderCount,
      };
    } catch (error) {
      throw new Error(`N11 sync failed: ${error.message}`);
    }
  }

  /**
   * Sync Amazon
   */
  private async syncAmazon(credentials: any, userId: string) {
    // Amazon SP-API (Selling Partner API)
    const client = this.createAmazonSPAPIClient(credentials);

    try {
      // 1. Sync products
      const products = await this.fetchAmazonProducts(client);
      const productCount = await this.saveProducts(products, userId, 'amazon');

      // 2. Sync orders
      const orders = await this.fetchAmazonOrders(client);
      const orderCount = await this.saveOrders(orders, userId, 'amazon');

      return {
        products: productCount,
        orders: orderCount,
        totalSynced: productCount + orderCount,
      };
    } catch (error) {
      throw new Error(`Amazon sync failed: ${error.message}`);
    }
  }

  // MARK: - Helper Methods

  private getPlatformDisplayName(platform: string): string {
    const names: Record<string, string> = {
      gib: 'GİB (Gelir İdaresi)',
      sgk: 'SGK (Sosyal Güvenlik)',
      'e-beyanname': 'e-Beyanname',
      trendyol: 'Trendyol',
      hepsiburada: 'Hepsiburada',
      n11: 'N11',
      amazon: 'Amazon',
    };
    return names[platform] || platform;
  }

  private getPlatformCategory(platform: string): string {
    const categories: Record<string, string> = {
      gib: 'e-government',
      sgk: 'e-government',
      'e-beyanname': 'e-government',
      trendyol: 'e-commerce',
      hepsiburada: 'e-commerce',
      n11: 'e-commerce',
      amazon: 'e-commerce',
    };
    return categories[platform] || 'other';
  }

  private sanitizeConfig(config: any): any {
    // Remove sensitive fields from config
    const sanitized = { ...config };
    delete sanitized.password;
    delete sanitized.apiSecret;
    delete sanitized.accessToken;
    delete sanitized.refreshToken;
    return sanitized;
  }

  private async validateCredentials(platform: string, credentials: any) {
    // Validate required fields based on platform
    const requirements: Record<string, string[]> = {
      gib: ['taxNumber', 'password', 'taxOffice'],
      sgk: ['username', 'password', 'companyCode'],
      'e-beyanname': ['taxNumber', 'password'],
      trendyol: ['apiKey', 'apiSecret', 'supplierId'],
      hepsiburada: ['username', 'password', 'merchantId'],
      n11: ['apiKey', 'apiSecret'],
      amazon: ['sellerId', 'mwsAuthToken', 'accessKey', 'secretKey'],
    };

    const required = requirements[platform] || [];
    const missing = required.filter((field) => !credentials[field]);

    if (missing.length > 0) {
      throw new HttpException(
        `Missing required fields: ${missing.join(', ')}`,
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  private async testConnection(platform: string, credentials: any): Promise<boolean> {
    // Test connection to platform
    try {
      const category = this.getPlatformCategory(platform);

      if (category === 'e-government') {
        return await this.testEGovernmentConnection(platform, credentials);
      } else if (category === 'e-commerce') {
        return await this.testECommerceConnection(platform, credentials);
      }

      return false;
    } catch (error) {
      console.error(`Connection test failed for ${platform}:`, error);
      return false;
    }
  }

  private async testEGovernmentConnection(platform: string, credentials: any): Promise<boolean> {
    // In production, this would make actual API calls to test credentials
    // For now, simulate validation
    return true;
  }

  private async testECommerceConnection(platform: string, credentials: any): Promise<boolean> {
    // Test e-commerce platform connection
    try {
      switch (platform) {
        case 'trendyol':
          const trendyolClient = axios.create({
            baseURL: 'https://api.trendyol.com/sapigw',
            headers: {
              'User-Agent': credentials.supplierId,
              Authorization: `Basic ${Buffer.from(`${credentials.apiKey}:${credentials.apiSecret}`).toString('base64')}`,
            },
          });
          await trendyolClient.get('/suppliers/addresses');
          return true;

        case 'hepsiburada':
          const hepsibudaClient = axios.create({
            baseURL: 'https://mpop.hepsiburada.com/api',
            headers: {
              Authorization: `Bearer ${credentials.accessToken}`,
            },
          });
          await hepsibudaClient.get('/merchants/settings');
          return true;

        default:
          return true;
      }
    } catch (error) {
      return false;
    }
  }

  private encryptCredentials(credentials: any): any {
    // Encrypt sensitive credentials using AES-256
    const algorithm = 'aes-256-cbc';
    const key = Buffer.from(process.env.ENCRYPTION_KEY || 'default-key-change-in-production-32', 'utf8');
    const iv = crypto.randomBytes(16);

    const cipher = crypto.createCipheriv(algorithm, key, iv);
    const encrypted = cipher.update(JSON.stringify(credentials), 'utf8', 'hex') + cipher.final('hex');

    return {
      encrypted,
      iv: iv.toString('hex'),
    };
  }

  private decryptCredentials(config: any): any {
    // Decrypt credentials
    const algorithm = 'aes-256-cbc';
    const key = Buffer.from(process.env.ENCRYPTION_KEY || 'default-key-change-in-production-32', 'utf8');
    const iv = Buffer.from(config.iv, 'hex');

    const decipher = crypto.createDecipheriv(algorithm, key, iv);
    const decrypted = decipher.update(config.encrypted, 'hex', 'utf8') + decipher.final('utf8');

    return JSON.parse(decrypted);
  }

  // MARK: - GIB Helper Methods

  private createGIBClient(credentials: any): AxiosInstance {
    // Create GIB API client
    // In production, this would use actual GIB web service URLs and certificates
    return axios.create({
      baseURL: 'https://earsivportal.efatura.gov.tr',
      headers: {
        'Content-Type': 'application/xml',
      },
    });
  }

  private async fetchGIBInvoices(client: AxiosInstance): Promise<any[]> {
    // Fetch e-invoices from GIB
    // Mock data for now
    return [];
  }

  private async fetchGIBArchiveInvoices(client: AxiosInstance): Promise<any[]> {
    // Fetch e-archive invoices from GIB
    return [];
  }

  private async fetchGIBTaxReturns(client: AxiosInstance): Promise<any[]> {
    // Fetch tax returns from GIB
    return [];
  }

  private async saveInvoices(invoices: any[], userId: string): Promise<number> {
    // Save invoices to database
    let count = 0;
    for (const invoice of invoices) {
      await this.prisma.invoice.upsert({
        where: { invoiceNo: invoice.invoiceNo || `INV-${Date.now()}-${count}` },
        update: { ...invoice, userId },
        create: { ...invoice, userId, invoiceNo: invoice.invoiceNo || `INV-${Date.now()}-${count}` },
      });
      count++;
    }
    return count;
  }

  private async saveTaxReturns(returns: any[], userId: string): Promise<number> {
    // Save tax returns to database
    let count = 0;
    for (const taxReturn of returns) {
      const period = `${taxReturn.year}-${String(taxReturn.month || 1).padStart(2, '0')}`;
      await this.prisma.taxReturn.upsert({
        where: { userId_type_period: { userId, type: taxReturn.type, period } },
        update: { ...taxReturn, userId },
        create: { ...taxReturn, userId, period },
      });
      count++;
    }
    return count;
  }

  // MARK: - SGK Helper Methods

  private createSGKClient(credentials: any): AxiosInstance {
    return axios.create({
      baseURL: 'https://uyg.sgk.gov.tr/ISVEREN',
    });
  }

  private async fetchSGKEmployees(client: AxiosInstance): Promise<any[]> {
    return [];
  }

  private async fetchSGKDeclarations(client: AxiosInstance): Promise<any[]> {
    return [];
  }

  private async saveEmployees(employees: any[], userId: string): Promise<number> {
    let count = 0;
    for (const employee of employees) {
      // Find existing or create new
      const existing = await this.prisma.employee.findFirst({
        where: { userId, tcNo: employee.tcNo },
      });

      if (existing) {
        await this.prisma.employee.update({
          where: { id: existing.id },
          data: { ...employee, userId },
        });
      } else {
        await this.prisma.employee.create({
          data: { ...employee, userId },
        });
      }
      count++;
    }
    return count;
  }

  private async saveDeclarations(declarations: any[], userId: string): Promise<number> {
    let count = 0;
    for (const declaration of declarations) {
      await this.prisma.sgkDeclaration.create({
        data: { ...declaration, userId },
      });
      count++;
    }
    return count;
  }

  // MARK: - e-Beyanname Helper Methods

  private createEBeyannameClient(credentials: any): AxiosInstance {
    return axios.create({
      baseURL: 'https://ivd.gib.gov.tr',
    });
  }

  private async fetchEBeyannameReturns(client: AxiosInstance): Promise<any[]> {
    return [];
  }

  // MARK: - E-Commerce Helper Methods

  private async saveProducts(products: any[], userId: string, platform: string): Promise<number> {
    let count = 0;
    for (const product of products) {
      await this.prisma.product.upsert({
        where: { sku: product.sku || product.barcode },
        update: {
          platformProducts: {
            upsert: {
              where: { platformId: `${platform}-${product.id}` },
              update: { ...product, platform },
              create: { ...product, platform, platformId: `${platform}-${product.id}` },
            },
          },
        },
        create: {
          name: product.name || product.title,
          sku: product.sku || product.barcode,
          price: product.price,
          stock: product.quantity || product.stock,
          userId,
          platformProducts: {
            create: { ...product, platform, platformId: `${platform}-${product.id}` },
          },
        },
      });
      count++;
    }
    return count;
  }

  private async saveOrders(orders: any[], userId: string, platform: string): Promise<number> {
    let count = 0;
    for (const order of orders) {
      await this.prisma.order.upsert({
        where: { orderNumber: `${platform}-${order.orderNumber || order.id}` },
        update: { ...order, platform },
        create: { ...order, userId, platform, orderNumber: `${platform}-${order.orderNumber || order.id}` },
      });
      count++;
    }
    return count;
  }

  private parseN11XmlAndSaveProducts(xml: string, userId: string): Promise<number> {
    // Parse N11 XML response and save products
    // Would use xml2js or similar library
    return Promise.resolve(0);
  }

  private parseN11XmlAndSaveOrders(xml: string, userId: string): Promise<number> {
    // Parse N11 XML response and save orders
    return Promise.resolve(0);
  }

  private createAmazonSPAPIClient(credentials: any): AxiosInstance {
    // Amazon SP-API requires AWS Signature V4
    return axios.create({
      baseURL: `https://sellingpartnerapi-eu.amazon.com`,
      headers: {
        'x-amz-access-token': credentials.accessToken,
      },
    });
  }

  private async fetchAmazonProducts(client: AxiosInstance): Promise<any[]> {
    // Fetch products using Amazon SP-API Catalog Items API
    return [];
  }

  private async fetchAmazonOrders(client: AxiosInstance): Promise<any[]> {
    // Fetch orders using Amazon SP-API Orders API
    return [];
  }
}
