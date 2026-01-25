import { Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'
import { BulkOperationsService } from './bulk-operations.service'
import { BulkOperationsController } from './bulk-operations.controller'

/**
 * Bulk Operations Module
 * - Bulk invoice creation
 * - Bulk payment processing
 * - CSV/Excel import/export
 * - Batch processing with error handling
 */
@Module({
  imports: [ConfigModule],
  controllers: [BulkOperationsController],
  providers: [BulkOperationsService],
  exports: [BulkOperationsService],
})
export class BulkOperationsModule {}
