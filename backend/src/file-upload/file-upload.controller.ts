import {
  Controller,
  Post,
  Get,
  Delete,
  UseGuards,
  Request,
  UploadedFile,
  UseInterceptors,
  Param,
  Query,
  BadRequestException,
} from '@nestjs/common'
import { FileInterceptor } from '@nestjs/platform-express'
import { ApiTags, ApiOperation, ApiBearerAuth, ApiConsumes, ApiBody } from '@nestjs/swagger'
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard'
import { FileUploadService, FileCategory } from './file-upload.service'

@ApiTags('File Upload')
@ApiBearerAuth()
@Controller('v1/files')
@UseGuards(JwtAuthGuard)
export class FileUploadController {
  constructor(private readonly fileUploadService: FileUploadService) {}

  @Post('upload')
  @ApiOperation({ summary: 'Upload file to S3/MinIO' })
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        file: {
          type: 'string',
          format: 'binary',
        },
        category: {
          type: 'string',
          enum: Object.values(FileCategory),
        },
      },
    },
  })
  @UseInterceptors(FileInterceptor('file'))
  async uploadFile(
    @Request() req,
    @UploadedFile() file: Express.Multer.File,
    @Query('category') category: FileCategory,
  ) {
    if (!file) {
      throw new BadRequestException('No file provided')
    }

    if (!category) {
      throw new BadRequestException('Category is required')
    }

    const result = await this.fileUploadService.uploadFile(file, category, req.user.sub)

    return {
      success: result.success,
      message: result.success ? 'File uploaded successfully' : 'File upload failed',
      data: result.success
        ? {
            url: result.url,
            key: result.key,
            bucket: result.bucket,
            size: result.size,
            contentType: result.contentType,
          }
        : null,
      error: result.error,
    }
  }

  @Post('upload/buffer')
  @ApiOperation({ summary: 'Upload buffer (base64) to S3/MinIO' })
  async uploadBuffer(
    @Request() req,
    @Query('category') category: FileCategory,
    @Query('fileName') fileName: string,
    @Query('contentType') contentType: string,
    @Query('data') base64Data: string,
  ) {
    if (!base64Data || !fileName || !contentType || !category) {
      throw new BadRequestException('Buffer data, fileName, contentType, and category are required')
    }

    const buffer = Buffer.from(base64Data, 'base64')
    const result = await this.fileUploadService.uploadBuffer(
      buffer,
      fileName,
      contentType,
      category,
      req.user.sub,
    )

    return {
      success: result.success,
      message: result.success ? 'Buffer uploaded successfully' : 'Buffer upload failed',
      data: result.success
        ? {
            url: result.url,
            key: result.key,
            bucket: result.bucket,
            size: result.size,
            contentType: result.contentType,
          }
        : null,
      error: result.error,
    }
  }

  @Get('download/:key')
  @ApiOperation({ summary: 'Download file from S3/MinIO' })
  async downloadFile(@Param('key') key: string) {
    const result = await this.fileUploadService.getFile(key)

    if (!result.success) {
      throw new BadRequestException(result.error || 'File not found')
    }

    return {
      success: true,
      data: result.data?.toString('base64'),
      contentType: result.contentType,
    }
  }

  @Delete('delete/:key')
  @ApiOperation({ summary: 'Delete file from S3/MinIO' })
  async deleteFile(@Param('key') key: string) {
    const result = await this.fileUploadService.deleteFile(key)

    return {
      success: result.success,
      message: result.success ? 'File deleted successfully' : 'File deletion failed',
      error: result.error,
    }
  }

  @Get('exists/:key')
  @ApiOperation({ summary: 'Check if file exists' })
  async fileExists(@Param('key') key: string) {
    const exists = await this.fileUploadService.fileExists(key)

    return {
      exists,
      key,
    }
  }

  @Get('presigned-url/:key')
  @ApiOperation({ summary: 'Get presigned URL for file access' })
  async getPresignedUrl(
    @Param('key') key: string,
    @Query('expiresIn') expiresIn?: number,
  ) {
    try {
      const url = await this.fileUploadService.getPresignedUrl(
        key,
        expiresIn ? parseInt(expiresIn.toString()) : 3600,
      )

      return {
        success: true,
        url,
        expiresIn: expiresIn || 3600,
      }
    } catch (error) {
      throw new BadRequestException(error.message)
    }
  }

  @Post('presigned-upload-url')
  @ApiOperation({ summary: 'Get presigned URL for file upload' })
  async getPresignedUploadUrl(
    @Request() req,
    @Query('fileName') fileName: string,
    @Query('contentType') contentType: string,
    @Query('category') category: FileCategory,
    @Query('expiresIn') expiresIn?: number,
  ) {
    if (!fileName || !contentType || !category) {
      throw new BadRequestException('fileName, contentType, and category are required')
    }

    try {
      const result = await this.fileUploadService.getPresignedUploadUrl(
        fileName,
        contentType,
        category,
        req.user.sub,
        expiresIn ? parseInt(expiresIn.toString()) : 3600,
      )

      return {
        success: true,
        url: result.url,
        key: result.key,
        expiresIn: expiresIn || 3600,
      }
    } catch (error) {
      throw new BadRequestException(error.message)
    }
  }

  @Get('categories')
  @ApiOperation({ summary: 'Get available file categories' })
  getCategories() {
    return {
      categories: Object.values(FileCategory),
    }
  }

  @Get('storage/info')
  @ApiOperation({ summary: 'Get storage configuration info' })
  getStorageInfo() {
    return this.fileUploadService.getStorageInfo()
  }

  @Get('status')
  @ApiOperation({ summary: 'Get file upload service status' })
  getStatus() {
    const storageInfo = this.fileUploadService.getStorageInfo()

    return {
      service: 'File Upload Service',
      version: '1.0.0',
      active: true,
      storage: storageInfo,
      capabilities: [
        'Multi-part Upload',
        'Presigned URLs',
        'Category-based Organization',
        'File Validation',
        'AWS S3 Support',
        'MinIO Support',
        'Direct Upload',
        'Buffer Upload',
      ],
    }
  }
}
