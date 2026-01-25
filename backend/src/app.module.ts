import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { ThrottlerModule, ThrottlerGuard } from '@nestjs/throttler';
import { APP_GUARD } from '@nestjs/core';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { DatabaseModule } from './database/database.module';
import { CustomersModule } from './customers/customers.module';
import { DashboardModule } from './dashboard/dashboard.module';
import { InvoicesModule } from './invoices/invoices.module';
import { PaymentsModule } from './payments/payments.module';
import { TaxReturnsModule } from './tax-returns/tax-returns.module';
import { DocumentsModule } from './documents/documents.module';
import { AiModule } from './ai/ai.module';
// import { IntegrationsModule } from './integrations/integrations.module'; // Temporarily disabled
import { WebSocketsModule } from './websockets/websockets.module';
import { ESignatureModule } from './e-signature/e-signature.module';
import { FileUploadModule } from './file-upload/file-upload.module';
import { PdfGeneratorModule } from './pdf-generator/pdf-generator.module';
import { EmailModule } from './email/email.module';
import { BulkOperationsModule } from './bulk-operations/bulk-operations.module';

/**
 * Root Application Module
 * - Global configuration
 * - Rate limiting (100 requests per minute)
 * - Database connection
 * - Feature modules
 * - AI Engine (Primary LLM + Voice LLM + STT Engine)
 * - Integrations (e-Devlet, GİB, SGK)
 */
@Module({
  imports: [
    // Global configuration
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
    }),

    // Rate limiting / Throttling
    ThrottlerModule.forRoot([
      {
        name: 'short',
        ttl: 1000, // 1 second
        limit: 10, // 10 requests per second
      },
      {
        name: 'medium',
        ttl: 10000, // 10 seconds
        limit: 50, // 50 requests per 10 seconds
      },
      {
        name: 'long',
        ttl: 60000, // 1 minute
        limit: 100, // 100 requests per minute
      },
    ]),

    // Database
    DatabaseModule,

    // Feature modules
    AuthModule,
    CustomersModule,
    DashboardModule,
    InvoicesModule,
    PaymentsModule,
    TaxReturnsModule,
    DocumentsModule,
    AiModule,
    // IntegrationsModule, // Temporarily disabled
    WebSocketsModule,
    ESignatureModule,
    FileUploadModule,
    PdfGeneratorModule,
    EmailModule,
    BulkOperationsModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    // Global rate limiting guard
    {
      provide: APP_GUARD,
      useClass: ThrottlerGuard,
    },
  ],
})
export class AppModule {}
