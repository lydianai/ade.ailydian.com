import { Injectable, Logger, BadRequestException } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import * as sgMail from '@sendgrid/mail'
import { SESClient, SendEmailCommand, SendRawEmailCommand } from '@aws-sdk/client-ses'
import * as nodemailer from 'nodemailer'

export enum EmailProvider {
  SENDGRID = 'SENDGRID',
  AWS_SES = 'AWS_SES',
  SMTP = 'SMTP',
}

export interface EmailMessage {
  from?: string
  to: string | string[]
  cc?: string | string[]
  bcc?: string | string[]
  subject: string
  text?: string
  html?: string
  attachments?: Array<{
    filename: string
    content: Buffer | string
    contentType?: string
  }>
  replyTo?: string
}

export interface EmailSendResult {
  success: boolean
  messageId?: string
  error?: string
  provider?: EmailProvider
}

/**
 * Email Service
 * - SendGrid integration for transactional emails
 * - AWS SES support for high-volume emails
 * - SMTP fallback for local development
 * - Template support
 * - Attachment handling
 * - Queue support for bulk emails
 */
@Injectable()
export class EmailService {
  private readonly logger = new Logger(EmailService.name)
  private provider: EmailProvider
  private sesClient?: SESClient
  private smtpTransporter?: nodemailer.Transporter
  private defaultFrom: string

  constructor(private configService: ConfigService) {
    // Determine email provider
    const providerConfig = this.configService.get<string>('EMAIL_PROVIDER') || 'SMTP'
    this.provider = providerConfig as EmailProvider
    this.defaultFrom =
      this.configService.get<string>('EMAIL_FROM') || 'noreply@ade.com.tr'

    // Initialize based on provider
    this.initializeProvider()
  }

  /**
   * Initialize email provider
   */
  private initializeProvider(): void {
    switch (this.provider) {
      case EmailProvider.SENDGRID:
        this.initializeSendGrid()
        break
      case EmailProvider.AWS_SES:
        this.initializeAWSSES()
        break
      case EmailProvider.SMTP:
        this.initializeSMTP()
        break
    }

    this.logger.log(`Email service initialized with provider: ${this.provider}`)
  }

  /**
   * Initialize SendGrid
   */
  private initializeSendGrid(): void {
    const apiKey = this.configService.get<string>('SENDGRID_API_KEY')
    if (apiKey) {
      sgMail.setApiKey(apiKey)
      this.logger.log('SendGrid initialized')
    } else {
      this.logger.warn('SendGrid API key not found')
    }
  }

  /**
   * Initialize AWS SES
   */
  private initializeAWSSES(): void {
    const region = this.configService.get<string>('AWS_REGION') || 'eu-central-1'
    const accessKeyId = this.configService.get<string>('AWS_ACCESS_KEY_ID')
    const secretAccessKey = this.configService.get<string>('AWS_SECRET_ACCESS_KEY')

    this.sesClient = new SESClient({
      region,
      credentials: accessKeyId && secretAccessKey ? { accessKeyId, secretAccessKey } : undefined,
    })

    this.logger.log('AWS SES initialized')
  }

  /**
   * Initialize SMTP
   */
  private initializeSMTP(): void {
    const config = {
      host: this.configService.get<string>('SMTP_HOST') || 'localhost',
      port: this.configService.get<number>('SMTP_PORT') || 1025,
      secure: this.configService.get<boolean>('SMTP_SECURE') || false,
      auth: {
        user: this.configService.get<string>('SMTP_USER'),
        pass: this.configService.get<string>('SMTP_PASS'),
      },
    }

    // Remove auth if not configured
    if (!config.auth.user) {
      (config as any).auth = undefined
    }

    this.smtpTransporter = nodemailer.createTransport(config)
    this.logger.log('SMTP transporter initialized')
  }

  /**
   * Send email
   */
  async sendEmail(message: EmailMessage): Promise<EmailSendResult> {
    try {
      this.logger.log(`Sending email to: ${message.to} via ${this.provider}`)

      // Set default from if not provided
      if (!message.from) {
        message.from = this.defaultFrom
      }

      switch (this.provider) {
        case EmailProvider.SENDGRID:
          return await this.sendViaSendGrid(message)
        case EmailProvider.AWS_SES:
          return await this.sendViaAWSSES(message)
        case EmailProvider.SMTP:
          return await this.sendViaSMTP(message)
        default:
          throw new BadRequestException(`Unsupported email provider: ${this.provider}`)
      }
    } catch (error) {
      this.logger.error(`Error sending email: ${error.message}`, error.stack)
      return {
        success: false,
        error: error.message,
        provider: this.provider,
      }
    }
  }

  /**
   * Send via SendGrid
   */
  private async sendViaSendGrid(message: EmailMessage): Promise<EmailSendResult> {
    try {
      const msg: any = {
        to: message.to,
        from: message.from!,
        subject: message.subject,
        text: message.text,
        html: message.html,
        cc: message.cc,
        bcc: message.bcc,
        replyTo: message.replyTo,
        attachments: message.attachments?.map((att) => ({
          filename: att.filename,
          content: att.content.toString('base64'),
          type: att.contentType,
          disposition: 'attachment',
        })),
      }

      const [response] = await sgMail.send(msg)

      this.logger.log(`Email sent via SendGrid: ${response.statusCode}`)

      return {
        success: true,
        messageId: response.headers['x-message-id'] as string,
        provider: EmailProvider.SENDGRID,
      }
    } catch (error) {
      this.logger.error('SendGrid error:', error.message)
      throw error
    }
  }

  /**
   * Send via AWS SES
   */
  private async sendViaAWSSES(message: EmailMessage): Promise<EmailSendResult> {
    try {
      if (!this.sesClient) {
        throw new Error('AWS SES client not initialized')
      }

      const command = new SendEmailCommand({
        Source: message.from,
        Destination: {
          ToAddresses: Array.isArray(message.to) ? message.to : [message.to],
          CcAddresses: message.cc ? (Array.isArray(message.cc) ? message.cc : [message.cc]) : undefined,
          BccAddresses: message.bcc ? (Array.isArray(message.bcc) ? message.bcc : [message.bcc]) : undefined,
        },
        Message: {
          Subject: {
            Data: message.subject,
            Charset: 'UTF-8',
          },
          Body: {
            Text: message.text
              ? {
                  Data: message.text,
                  Charset: 'UTF-8',
                }
              : undefined,
            Html: message.html
              ? {
                  Data: message.html,
                  Charset: 'UTF-8',
                }
              : undefined,
          },
        },
        ReplyToAddresses: message.replyTo ? [message.replyTo] : undefined,
      })

      const response = await this.sesClient.send(command)

      this.logger.log(`Email sent via AWS SES: ${response.MessageId}`)

      return {
        success: true,
        messageId: response.MessageId,
        provider: EmailProvider.AWS_SES,
      }
    } catch (error) {
      this.logger.error('AWS SES error:', error.message)
      throw error
    }
  }

  /**
   * Send via SMTP
   */
  private async sendViaSMTP(message: EmailMessage): Promise<EmailSendResult> {
    try {
      if (!this.smtpTransporter) {
        throw new Error('SMTP transporter not initialized')
      }

      const result = await this.smtpTransporter.sendMail({
        from: message.from,
        to: message.to,
        cc: message.cc,
        bcc: message.bcc,
        subject: message.subject,
        text: message.text,
        html: message.html,
        replyTo: message.replyTo,
        attachments: message.attachments?.map((att) => ({
          filename: att.filename,
          content: att.content,
          contentType: att.contentType,
        })),
      })

      this.logger.log(`Email sent via SMTP: ${result.messageId}`)

      return {
        success: true,
        messageId: result.messageId,
        provider: EmailProvider.SMTP,
      }
    } catch (error) {
      this.logger.error('SMTP error:', error.message)
      throw error
    }
  }

  /**
   * Send invoice email
   */
  async sendInvoiceEmail(
    to: string,
    invoiceNo: string,
    pdfAttachment: Buffer,
    options?: {
      customerName?: string
      amount?: string
      dueDate?: string
    },
  ): Promise<EmailSendResult> {
    const customerName = options?.customerName || 'Değerli Müşterimiz'
    const amount = options?.amount || ''
    const dueDate = options?.dueDate || ''

    const subject = `Fatura: ${invoiceNo}`
    const html = `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="UTF-8">
        <style>
          body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
          .container { max-width: 600px; margin: 0 auto; padding: 20px; }
          .header { background: #1a1a2e; color: #fff; padding: 20px; text-align: center; }
          .content { padding: 20px; background: #f9fafb; }
          .footer { text-align: center; padding: 20px; color: #6b7280; font-size: 12px; }
          .button { display: inline-block; padding: 12px 24px; background: #fbbf24; color: #1a1a2e; text-decoration: none; border-radius: 6px; font-weight: bold; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h1>ADE - Akıllı Devlet Ekosistemi</h1>
          </div>
          <div class="content">
            <h2>Merhaba ${customerName},</h2>
            <p>Faturanız hazırlanmıştır.</p>
            <ul>
              <li><strong>Fatura No:</strong> ${invoiceNo}</li>
              ${amount ? `<li><strong>Tutar:</strong> ${amount}</li>` : ''}
              ${dueDate ? `<li><strong>Vade Tarihi:</strong> ${dueDate}</li>` : ''}
            </ul>
            <p>Fatura PDF'i bu e-postanın ekinde bulunmaktadır.</p>
            <p>Herhangi bir sorunuz olması durumunda lütfen bizimle iletişime geçin.</p>
          </div>
          <div class="footer">
            <p>Bu e-posta ADE sistemi tarafından otomatik olarak gönderilmiştir.</p>
            <p>&copy; 2024 ADE - Akıllı Devlet Ekosistemi</p>
          </div>
        </div>
      </body>
      </html>
    `

    return this.sendEmail({
      to,
      subject,
      html,
      attachments: [
        {
          filename: `fatura-${invoiceNo}.pdf`,
          content: pdfAttachment,
          contentType: 'application/pdf',
        },
      ],
    })
  }

  /**
   * Send payment receipt email
   */
  async sendPaymentReceiptEmail(
    to: string,
    receiptNo: string,
    pdfAttachment: Buffer,
    options?: {
      customerName?: string
      amount?: string
    },
  ): Promise<EmailSendResult> {
    const customerName = options?.customerName || 'Değerli Müşterimiz'
    const amount = options?.amount || ''

    const subject = `Ödeme Makbuzu: ${receiptNo}`
    const html = `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="UTF-8">
        <style>
          body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
          .container { max-width: 600px; margin: 0 auto; padding: 20px; }
          .header { background: #1a1a2e; color: #fff; padding: 20px; text-align: center; }
          .content { padding: 20px; background: #f9fafb; }
          .footer { text-align: center; padding: 20px; color: #6b7280; font-size: 12px; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h1>ADE - Akıllı Devlet Ekosistemi</h1>
          </div>
          <div class="content">
            <h2>Merhaba ${customerName},</h2>
            <p>Ödemeniz alınmıştır. Teşekkür ederiz!</p>
            <ul>
              <li><strong>Makbuz No:</strong> ${receiptNo}</li>
              ${amount ? `<li><strong>Ödenen Tutar:</strong> ${amount}</li>` : ''}
            </ul>
            <p>Ödeme makbuzunuz bu e-postanın ekinde bulunmaktadır.</p>
          </div>
          <div class="footer">
            <p>Bu e-posta ADE sistemi tarafından otomatik olarak gönderilmiştir.</p>
            <p>&copy; 2024 ADE - Akıllı Devlet Ekosistemi</p>
          </div>
        </div>
      </body>
      </html>
    `

    return this.sendEmail({
      to,
      subject,
      html,
      attachments: [
        {
          filename: `makbuz-${receiptNo}.pdf`,
          content: pdfAttachment,
          contentType: 'application/pdf',
        },
      ],
    })
  }

  /**
   * Send welcome email
   */
  async sendWelcomeEmail(to: string, userName: string): Promise<EmailSendResult> {
    const subject = 'ADE Platformuna Hoş Geldiniz!'
    const html = `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="UTF-8">
        <style>
          body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
          .container { max-width: 600px; margin: 0 auto; padding: 20px; }
          .header { background: #1a1a2e; color: #fff; padding: 20px; text-align: center; }
          .content { padding: 20px; background: #f9fafb; }
          .footer { text-align: center; padding: 20px; color: #6b7280; font-size: 12px; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h1>ADE - Akıllı Devlet Ekosistemi</h1>
          </div>
          <div class="content">
            <h2>Merhaba ${userName},</h2>
            <p>ADE platformuna hoş geldiniz!</p>
            <p>Platformumuz sayesinde:</p>
            <ul>
              <li>e-Fatura oluşturabilir ve yönetebilirsiniz</li>
              <li>Vergi işlemlerinizi takip edebilirsiniz</li>
              <li>Devlet kurumlarıyla entegre çalışabilirsiniz</li>
              <li>Raporlarınızı analiz edebilirsiniz</li>
            </ul>
            <p>Hesabınızı aktif etmek ve platformu kullanmaya başlamak için hazırsınız!</p>
          </div>
          <div class="footer">
            <p>&copy; 2024 ADE - Akıllı Devlet Ekosistemi</p>
          </div>
        </div>
      </body>
      </html>
    `

    return this.sendEmail({
      to,
      subject,
      html,
    })
  }

  /**
   * Get service status
   */
  getServiceStatus() {
    return {
      service: 'Email Service',
      version: '1.0.0',
      active: true,
      provider: this.provider,
      defaultFrom: this.defaultFrom,
      capabilities: [
        'SendGrid Integration',
        'AWS SES Support',
        'SMTP Fallback',
        'HTML Templates',
        'Attachment Support',
        'Invoice Emails',
        'Payment Receipt Emails',
        'Welcome Emails',
      ],
    }
  }
}
