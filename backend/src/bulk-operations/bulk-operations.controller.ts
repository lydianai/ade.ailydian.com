import {
  Controller,
  Post,
  Get,
  Body,
  UseGuards,
  Request,
  BadRequestException,
  Header,
} from '@nestjs/common'
import { ApiTags, ApiOperation, ApiBearerAuth } from '@nestjs/swagger'
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard'
import { BulkOperationsService } from './bulk-operations.service'
import type { BulkInvoiceData, BulkPaymentData } from './bulk-operations.service'

@ApiTags('Bulk Operations')
@ApiBearerAuth()
@Controller('v1/bulk')
@UseGuards(JwtAuthGuard)
export class BulkOperationsController {
  constructor(private readonly bulkOperationsService: BulkOperationsService) {}

  @Post('invoices/create')
  @ApiOperation({ summary: 'Create multiple invoices in bulk' })
  async createBulkInvoices(
    @Request() req,
    @Body() body: { invoices: BulkInvoiceData[] },
  ) {
    if (!body.invoices || body.invoices.length === 0) {
      throw new BadRequestException('Invoices array is required and cannot be empty')
    }

    const result = await this.bulkOperationsService.createBulkInvoices(
      body.invoices,
      req.user.sub,
    )

    return {
      ...result,
      message: `Bulk invoice creation completed: ${result.successful} successful, ${result.failed} failed`,
    }
  }

  @Post('payments/process')
  @ApiOperation({ summary: 'Process multiple payments in bulk' })
  async processBulkPayments(
    @Request() req,
    @Body() body: { payments: BulkPaymentData[] },
  ) {
    if (!body.payments || body.payments.length === 0) {
      throw new BadRequestException('Payments array is required and cannot be empty')
    }

    const result = await this.bulkOperationsService.processBulkPayments(
      body.payments,
      req.user.sub,
    )

    return {
      ...result,
      message: `Bulk payment processing completed: ${result.successful} successful, ${result.failed} failed`,
    }
  }

  @Post('invoices/import')
  @ApiOperation({ summary: 'Import invoices from CSV/Excel data' })
  async importInvoices(
    @Request() req,
    @Body() body: { data: Array<Record<string, any>> },
  ) {
    if (!body.data || body.data.length === 0) {
      throw new BadRequestException('Data array is required and cannot be empty')
    }

    const result = await this.bulkOperationsService.importInvoices(body.data, req.user.sub)

    return {
      ...result,
      message: `Invoice import completed: ${result.successful} successful, ${result.failed} failed`,
    }
  }

  @Post('invoices/export')
  @ApiOperation({ summary: 'Export invoices to CSV' })
  @Header('Content-Type', 'text/csv')
  @Header('Content-Disposition', 'attachment; filename="invoices.csv"')
  async exportInvoices(
    @Request() req,
    @Body() body: { invoiceIds: string[] },
  ) {
    if (!body.invoiceIds || body.invoiceIds.length === 0) {
      throw new BadRequestException('Invoice IDs array is required and cannot be empty')
    }

    const result = await this.bulkOperationsService.exportInvoices(
      body.invoiceIds,
      req.user.sub,
    )

    if (!result.success) {
      throw new BadRequestException(result.error || 'Export failed')
    }

    return result.csvData
  }

  @Post('invoices/export-json')
  @ApiOperation({ summary: 'Export invoices to JSON' })
  async exportInvoicesJSON(
    @Request() req,
    @Body() body: { invoiceIds: string[] },
  ) {
    if (!body.invoiceIds || body.invoiceIds.length === 0) {
      throw new BadRequestException('Invoice IDs array is required and cannot be empty')
    }

    const result = await this.bulkOperationsService.exportInvoices(
      body.invoiceIds,
      req.user.sub,
    )

    return {
      success: result.success,
      message: result.success ? 'Invoices exported successfully' : 'Export failed',
      data: result.data,
      error: result.error,
    }
  }

  @Post('payments/export')
  @ApiOperation({ summary: 'Export payments to CSV' })
  @Header('Content-Type', 'text/csv')
  @Header('Content-Disposition', 'attachment; filename="payments.csv"')
  async exportPayments(
    @Request() req,
    @Body() body: { paymentIds: string[] },
  ) {
    if (!body.paymentIds || body.paymentIds.length === 0) {
      throw new BadRequestException('Payment IDs array is required and cannot be empty')
    }

    const result = await this.bulkOperationsService.exportPayments(
      body.paymentIds,
      req.user.sub,
    )

    if (!result.success) {
      throw new BadRequestException(result.error || 'Export failed')
    }

    return result.csvData
  }

  @Post('payments/export-json')
  @ApiOperation({ summary: 'Export payments to JSON' })
  async exportPaymentsJSON(
    @Request() req,
    @Body() body: { paymentIds: string[] },
  ) {
    if (!body.paymentIds || body.paymentIds.length === 0) {
      throw new BadRequestException('Payment IDs array is required and cannot be empty')
    }

    const result = await this.bulkOperationsService.exportPayments(
      body.paymentIds,
      req.user.sub,
    )

    return {
      success: result.success,
      message: result.success ? 'Payments exported successfully' : 'Export failed',
      data: result.data,
      error: result.error,
    }
  }

  @Get('status')
  @ApiOperation({ summary: 'Get bulk operations service status' })
  getStatus() {
    return this.bulkOperationsService.getServiceStatus()
  }
}
