import {
  Controller,
  Post,
  Get,
  Body,
  UseGuards,
  BadRequestException,
} from '@nestjs/common'
import { ApiTags, ApiOperation, ApiBearerAuth } from '@nestjs/swagger'
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard'
import { EmailService } from './email.service'
import type { EmailMessage } from './email.service'

@ApiTags('Email')
@ApiBearerAuth()
@Controller('v1/email')
@UseGuards(JwtAuthGuard)
export class EmailController {
  constructor(private readonly emailService: EmailService) {}

  @Post('send')
  @ApiOperation({ summary: 'Send email' })
  async sendEmail(@Body() body: EmailMessage) {
    if (!body.to || !body.subject) {
      throw new BadRequestException('Recipient and subject are required')
    }

    const result = await this.emailService.sendEmail(body)

    return {
      success: result.success,
      message: result.success ? 'Email sent successfully' : 'Email sending failed',
      messageId: result.messageId,
      provider: result.provider,
      error: result.error,
    }
  }

  @Post('send-invoice')
  @ApiOperation({ summary: 'Send invoice email with PDF attachment' })
  async sendInvoiceEmail(
    @Body()
    body: {
      to: string
      invoiceNo: string
      pdfBase64: string
      customerName?: string
      amount?: string
      dueDate?: string
    },
  ) {
    if (!body.to || !body.invoiceNo || !body.pdfBase64) {
      throw new BadRequestException('Recipient, invoice number, and PDF are required')
    }

    const pdfBuffer = Buffer.from(body.pdfBase64, 'base64')
    const result = await this.emailService.sendInvoiceEmail(
      body.to,
      body.invoiceNo,
      pdfBuffer,
      {
        customerName: body.customerName,
        amount: body.amount,
        dueDate: body.dueDate,
      },
    )

    return {
      success: result.success,
      message: result.success ? 'Invoice email sent successfully' : 'Email sending failed',
      messageId: result.messageId,
      error: result.error,
    }
  }

  @Post('send-payment-receipt')
  @ApiOperation({ summary: 'Send payment receipt email with PDF attachment' })
  async sendPaymentReceiptEmail(
    @Body()
    body: {
      to: string
      receiptNo: string
      pdfBase64: string
      customerName?: string
      amount?: string
    },
  ) {
    if (!body.to || !body.receiptNo || !body.pdfBase64) {
      throw new BadRequestException('Recipient, receipt number, and PDF are required')
    }

    const pdfBuffer = Buffer.from(body.pdfBase64, 'base64')
    const result = await this.emailService.sendPaymentReceiptEmail(
      body.to,
      body.receiptNo,
      pdfBuffer,
      {
        customerName: body.customerName,
        amount: body.amount,
      },
    )

    return {
      success: result.success,
      message: result.success ? 'Payment receipt email sent successfully' : 'Email sending failed',
      messageId: result.messageId,
      error: result.error,
    }
  }

  @Post('send-welcome')
  @ApiOperation({ summary: 'Send welcome email to new user' })
  async sendWelcomeEmail(
    @Body()
    body: {
      to: string
      userName: string
    },
  ) {
    if (!body.to || !body.userName) {
      throw new BadRequestException('Recipient and user name are required')
    }

    const result = await this.emailService.sendWelcomeEmail(body.to, body.userName)

    return {
      success: result.success,
      message: result.success ? 'Welcome email sent successfully' : 'Email sending failed',
      messageId: result.messageId,
      error: result.error,
    }
  }

  @Get('status')
  @ApiOperation({ summary: 'Get email service status' })
  getStatus() {
    return this.emailService.getServiceStatus()
  }
}
