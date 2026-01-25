import { Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'
import { FileUploadService } from './file-upload.service'
import { FileUploadController } from './file-upload.controller'

/**
 * File Upload Module
 * - AWS S3 integration
 * - MinIO support for local development
 * - Presigned URLs for secure access
 * - Multi-part upload support
 * - File validation and organization
 */
@Module({
  imports: [ConfigModule],
  controllers: [FileUploadController],
  providers: [FileUploadService],
  exports: [FileUploadService],
})
export class FileUploadModule {}
