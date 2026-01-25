import { Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'
import { PdfGeneratorService } from './pdf-generator.service'
import { PdfGeneratorController } from './pdf-generator.controller'

/**
 * PDF Generator Module
 * - e-Fatura compliant PDF generation
 * - Payment receipt generation
 * - Professional layouts
 * - Multi-language support
 * - QR code and watermark support
 */
@Module({
  imports: [ConfigModule],
  controllers: [PdfGeneratorController],
  providers: [PdfGeneratorService],
  exports: [PdfGeneratorService],
})
export class PdfGeneratorModule {}
