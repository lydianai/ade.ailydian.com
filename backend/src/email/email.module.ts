import { Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'
import { EmailService } from './email.service'
import { EmailController } from './email.controller'

/**
 * Email Module
 * - SendGrid integration
 * - AWS SES support
 * - SMTP fallback
 * - HTML email templates
 * - Attachment handling
 */
@Module({
  imports: [ConfigModule],
  controllers: [EmailController],
  providers: [EmailService],
  exports: [EmailService],
})
export class EmailModule {}
