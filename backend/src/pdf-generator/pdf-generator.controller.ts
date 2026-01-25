import {
  Controller,
  Post,
  Get,
  Body,
  UseGuards,
  BadRequestException,
  Header,
  StreamableFile,
} from '@nestjs/common'
import { ApiTags, ApiOperation, ApiBearerAuth } from '@nestjs/swagger'
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard'
import { PdfGeneratorService, InvoiceData } from './pdf-generator.service'
import { Readable } from 'stream'

@ApiTags('PDF Generator')
@ApiBearerAuth()
@Controller('v1/pdf')
@UseGuards(JwtAuthGuard)
export class PdfGeneratorController {
  constructor(private readonly pdfGeneratorService: PdfGeneratorService) {}

  @Post('invoice')
  @ApiOperation({ summary: 'Generate invoice PDF' })
  async generateInvoice(
    @Body()
    body: {
      invoiceData: InvoiceData
      options?: {
        language?: 'tr' | 'en'
        logoPath?: string
        watermark?: string
        qrCode?: string
      }
      returnType?: 'base64' | 'buffer'
    },
  ) {
    if (!body.invoiceData) {
      throw new BadRequestException('Invoice data is required')
    }

    const result = await this.pdfGeneratorService.generateInvoicePDF(
      body.invoiceData,
      body.options,
    )

    if (!result.success) {
      throw new BadRequestException(result.error || 'PDF generation failed')
    }

    const returnType = body.returnType || 'base64'

    return {
      success: true,
      message: 'Invoice PDF generated successfully',
      data: {
        pdf: returnType === 'base64' ? result.buffer?.toString('base64') : result.buffer,
        size: result.size,
        fileName: `invoice-${body.invoiceData.invoiceNo}.pdf`,
      },
    }
  }

  @Post('invoice/download')
  @ApiOperation({ summary: 'Generate and download invoice PDF' })
  @Header('Content-Type', 'application/pdf')
  async downloadInvoice(
    @Body()
    body: {
      invoiceData: InvoiceData
      options?: {
        language?: 'tr' | 'en'
        logoPath?: string
        watermark?: string
        qrCode?: string
      }
    },
  ): Promise<StreamableFile> {
    if (!body.invoiceData) {
      throw new BadRequestException('Invoice data is required')
    }

    const result = await this.pdfGeneratorService.generateInvoicePDF(
      body.invoiceData,
      body.options,
    )

    if (!result.success || !result.buffer) {
      throw new BadRequestException(result.error || 'PDF generation failed')
    }

    const stream = Readable.from(result.buffer)
    return new StreamableFile(stream, {
      type: 'application/pdf',
      disposition: `attachment; filename="invoice-${body.invoiceData.invoiceNo}.pdf"`,
    })
  }

  @Post('payment-receipt')
  @ApiOperation({ summary: 'Generate payment receipt PDF' })
  async generatePaymentReceipt(
    @Body()
    body: {
      receiptNo: string
      paymentDate: string
      payer: string
      amount: number
      currency: string
      paymentMethod: string
      reference?: string
      notes?: string
      returnType?: 'base64' | 'buffer'
    },
  ) {
    const { returnType, ...paymentData } = body

    if (!paymentData.receiptNo || !paymentData.payer) {
      throw new BadRequestException('Receipt number and payer are required')
    }

    const result = await this.pdfGeneratorService.generatePaymentReceiptPDF(paymentData)

    if (!result.success) {
      throw new BadRequestException(result.error || 'PDF generation failed')
    }

    const returnFormat = returnType || 'base64'

    return {
      success: true,
      message: 'Payment receipt PDF generated successfully',
      data: {
        pdf: returnFormat === 'base64' ? result.buffer?.toString('base64') : result.buffer,
        size: result.size,
        fileName: `receipt-${paymentData.receiptNo}.pdf`,
      },
    }
  }

  @Post('payment-receipt/download')
  @ApiOperation({ summary: 'Generate and download payment receipt PDF' })
  @Header('Content-Type', 'application/pdf')
  async downloadPaymentReceipt(
    @Body()
    body: {
      receiptNo: string
      paymentDate: string
      payer: string
      amount: number
      currency: string
      paymentMethod: string
      reference?: string
      notes?: string
    },
  ): Promise<StreamableFile> {
    if (!body.receiptNo || !body.payer) {
      throw new BadRequestException('Receipt number and payer are required')
    }

    const result = await this.pdfGeneratorService.generatePaymentReceiptPDF(body)

    if (!result.success || !result.buffer) {
      throw new BadRequestException(result.error || 'PDF generation failed')
    }

    const stream = Readable.from(result.buffer)
    return new StreamableFile(stream, {
      type: 'application/pdf',
      disposition: `attachment; filename="receipt-${body.receiptNo}.pdf"`,
    })
  }

  @Get('status')
  @ApiOperation({ summary: 'Get PDF generator service status' })
  getStatus() {
    return this.pdfGeneratorService.getServiceStatus()
  }

  @Post('test/sample-invoice')
  @ApiOperation({ summary: 'Generate a sample invoice for testing' })
  async generateSampleInvoice() {
    const sampleData: InvoiceData = {
      invoiceNo: 'ADE2024000001',
      invoiceDate: new Date().toLocaleDateString('tr-TR'),
      dueDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toLocaleDateString('tr-TR'),
      issuer: {
        name: 'ADE Teknoloji A.Ş.',
        taxId: '1234567890',
        taxOffice: 'Kadıköy',
        address: 'Atatürk Cad. No:123 Kadıköy/İstanbul',
        phone: '+90 216 123 45 67',
        email: 'info@ade.com.tr',
      },
      customer: {
        name: 'Örnek Müşteri Ltd. Şti.',
        taxId: '9876543210',
        taxOffice: 'Beşiktaş',
        address: 'İstiklal Cad. No:456 Beşiktaş/İstanbul',
        phone: '+90 212 987 65 43',
        email: 'musteri@ornek.com',
      },
      items: [
        {
          description: 'e-Devlet Entegrasyon Hizmeti - Aylık Abonelik',
          quantity: 1,
          unitPrice: 5000,
          vatRate: 20,
          vatAmount: 1000,
          totalAmount: 6000,
        },
        {
          description: 'e-İmza Paketi - 100 İmza',
          quantity: 1,
          unitPrice: 2000,
          vatRate: 20,
          vatAmount: 400,
          totalAmount: 2400,
        },
        {
          description: 'Teknik Destek Hizmeti',
          quantity: 10,
          unitPrice: 300,
          vatRate: 20,
          vatAmount: 600,
          totalAmount: 3600,
        },
      ],
      subtotal: 10000,
      totalVat: 2000,
      totalAmount: 12000,
      currency: 'TRY',
      notes: 'Ödeme vadesi 30 gündür. Vadesi geçen ödemeler için gecikme faizi uygulanacaktır.',
      paymentTerms: '30 gün vadeli',
      bankInfo: {
        bankName: 'Türkiye İş Bankası',
        iban: 'TR33 0006 4000 0011 2345 6789 01',
        accountNo: '1234567',
      },
    }

    const result = await this.pdfGeneratorService.generateInvoicePDF(sampleData, {
      language: 'tr',
      watermark: 'ÖRNEK FATURA',
    })

    if (!result.success) {
      throw new BadRequestException(result.error || 'PDF generation failed')
    }

    return {
      success: true,
      message: 'Sample invoice generated successfully',
      data: {
        pdf: result.buffer?.toString('base64'),
        size: result.size,
        fileName: 'sample-invoice.pdf',
      },
    }
  }
}
