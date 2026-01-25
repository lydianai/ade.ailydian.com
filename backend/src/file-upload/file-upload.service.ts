import { Injectable, Logger, BadRequestException } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import {
  S3Client,
  PutObjectCommand,
  GetObjectCommand,
  DeleteObjectCommand,
  HeadObjectCommand,
} from '@aws-sdk/client-s3'
import { getSignedUrl } from '@aws-sdk/s3-request-presigner'
import * as crypto from 'crypto'
import * as path from 'path'

export enum FileCategory {
  INVOICE_PDF = 'invoices/pdf',
  INVOICE_XML = 'invoices/xml',
  INVOICE_SIGNED = 'invoices/signed',
  PAYMENT_RECEIPT = 'payments/receipts',
  TAX_DOCUMENT = 'tax/documents',
  CUSTOMER_DOCUMENT = 'customers/documents',
  USER_AVATAR = 'users/avatars',
  TEMPORARY = 'temp',
}

export interface UploadResult {
  success: boolean
  url?: string
  key?: string
  bucket?: string
  size?: number
  contentType?: string
  error?: string
}

/**
 * File Upload Service
 * - AWS S3 integration for production
 * - MinIO support for local development
 * - Presigned URLs for secure file access
 * - File validation (size, type)
 * - Automatic file naming with UUIDs
 * - Category-based file organization
 */
@Injectable()
export class FileUploadService {
  private readonly logger = new Logger(FileUploadService.name)
  private s3Client: S3Client
  private bucketName: string
  private useS3: boolean

  constructor(private configService: ConfigService) {
    this.bucketName = this.configService.get<string>('S3_BUCKET_NAME') || 'ade-files'
    this.useS3 = this.configService.get<string>('STORAGE_PROVIDER') === 's3'

    // Initialize S3 or MinIO client
    const endpoint = this.configService.get<string>('S3_ENDPOINT')
    const region = this.configService.get<string>('AWS_REGION') || 'eu-central-1'
    const accessKeyId = this.configService.get<string>('AWS_ACCESS_KEY_ID')
    const secretAccessKey = this.configService.get<string>('AWS_SECRET_ACCESS_KEY')

    this.s3Client = new S3Client({
      region,
      endpoint: endpoint || undefined,
      credentials: accessKeyId && secretAccessKey
        ? { accessKeyId, secretAccessKey }
        : undefined,
      forcePathStyle: !!endpoint, // Required for MinIO
    })

    this.logger.log(
      `File Upload Service initialized (${this.useS3 ? 'S3' : 'MinIO'}, bucket: ${this.bucketName})`,
    )
  }

  /**
   * Upload file to S3/MinIO
   */
  async uploadFile(
    file: Express.Multer.File,
    category: FileCategory,
    userId: string,
  ): Promise<UploadResult> {
    try {
      // Validate file
      this.validateFile(file)

      // Generate unique filename
      const fileExtension = path.extname(file.originalname)
      const fileName = `${crypto.randomUUID()}${fileExtension}`
      const key = `${category}/${userId}/${fileName}`

      this.logger.log(`Uploading file: ${key} (${file.size} bytes)`)

      // Upload to S3/MinIO
      const command = new PutObjectCommand({
        Bucket: this.bucketName,
        Key: key,
        Body: file.buffer,
        ContentType: file.mimetype,
        Metadata: {
          originalName: file.originalname,
          userId,
          uploadedAt: new Date().toISOString(),
        },
      })

      await this.s3Client.send(command)

      // Generate public URL (or presigned URL if private)
      const url = await this.getFileUrl(key)

      this.logger.log(`File uploaded successfully: ${key}`)

      return {
        success: true,
        url,
        key,
        bucket: this.bucketName,
        size: file.size,
        contentType: file.mimetype,
      }
    } catch (error) {
      this.logger.error(`Error uploading file: ${error.message}`, error.stack)
      return {
        success: false,
        error: error.message,
      }
    }
  }

  /**
   * Upload buffer to S3/MinIO
   */
  async uploadBuffer(
    buffer: Buffer,
    fileName: string,
    contentType: string,
    category: FileCategory,
    userId: string,
  ): Promise<UploadResult> {
    try {
      const key = `${category}/${userId}/${fileName}`

      this.logger.log(`Uploading buffer: ${key} (${buffer.length} bytes)`)

      const command = new PutObjectCommand({
        Bucket: this.bucketName,
        Key: key,
        Body: buffer,
        ContentType: contentType,
        Metadata: {
          userId,
          uploadedAt: new Date().toISOString(),
        },
      })

      await this.s3Client.send(command)

      const url = await this.getFileUrl(key)

      this.logger.log(`Buffer uploaded successfully: ${key}`)

      return {
        success: true,
        url,
        key,
        bucket: this.bucketName,
        size: buffer.length,
        contentType,
      }
    } catch (error) {
      this.logger.error(`Error uploading buffer: ${error.message}`, error.stack)
      return {
        success: false,
        error: error.message,
      }
    }
  }

  /**
   * Get file from S3/MinIO
   */
  async getFile(key: string): Promise<{
    success: boolean
    data?: Buffer
    contentType?: string
    error?: string
  }> {
    try {
      this.logger.log(`Retrieving file: ${key}`)

      const command = new GetObjectCommand({
        Bucket: this.bucketName,
        Key: key,
      })

      const response = await this.s3Client.send(command)
      const data = await this.streamToBuffer(response.Body as any)

      return {
        success: true,
        data,
        contentType: response.ContentType,
      }
    } catch (error) {
      this.logger.error(`Error retrieving file: ${error.message}`, error.stack)
      return {
        success: false,
        error: error.message,
      }
    }
  }

  /**
   * Delete file from S3/MinIO
   */
  async deleteFile(key: string): Promise<{ success: boolean; error?: string }> {
    try {
      this.logger.log(`Deleting file: ${key}`)

      const command = new DeleteObjectCommand({
        Bucket: this.bucketName,
        Key: key,
      })

      await this.s3Client.send(command)

      this.logger.log(`File deleted successfully: ${key}`)

      return { success: true }
    } catch (error) {
      this.logger.error(`Error deleting file: ${error.message}`, error.stack)
      return {
        success: false,
        error: error.message,
      }
    }
  }

  /**
   * Check if file exists
   */
  async fileExists(key: string): Promise<boolean> {
    try {
      const command = new HeadObjectCommand({
        Bucket: this.bucketName,
        Key: key,
      })

      await this.s3Client.send(command)
      return true
    } catch (error) {
      return false
    }
  }

  /**
   * Get presigned URL for file access
   */
  async getPresignedUrl(key: string, expiresIn: number = 3600): Promise<string> {
    try {
      const command = new GetObjectCommand({
        Bucket: this.bucketName,
        Key: key,
      })

      const url = await getSignedUrl(this.s3Client, command, { expiresIn })
      return url
    } catch (error) {
      this.logger.error(`Error generating presigned URL: ${error.message}`)
      throw error
    }
  }

  /**
   * Get presigned URL for upload
   */
  async getPresignedUploadUrl(
    fileName: string,
    contentType: string,
    category: FileCategory,
    userId: string,
    expiresIn: number = 3600,
  ): Promise<{ url: string; key: string }> {
    try {
      const key = `${category}/${userId}/${fileName}`

      const command = new PutObjectCommand({
        Bucket: this.bucketName,
        Key: key,
        ContentType: contentType,
      })

      const url = await getSignedUrl(this.s3Client, command, { expiresIn })

      return { url, key }
    } catch (error) {
      this.logger.error(`Error generating presigned upload URL: ${error.message}`)
      throw error
    }
  }

  /**
   * Get file URL (public or presigned based on configuration)
   */
  private async getFileUrl(key: string): Promise<string> {
    const endpoint = this.configService.get<string>('S3_ENDPOINT')
    const publicAccess = this.configService.get<boolean>('S3_PUBLIC_ACCESS')

    if (publicAccess && endpoint) {
      // Public URL for MinIO or public S3 buckets
      return `${endpoint}/${this.bucketName}/${key}`
    } else if (publicAccess) {
      // Public URL for S3
      const region = this.configService.get<string>('AWS_REGION') || 'eu-central-1'
      return `https://${this.bucketName}.s3.${region}.amazonaws.com/${key}`
    } else {
      // Presigned URL for private access
      return await this.getPresignedUrl(key, 86400) // 24 hours
    }
  }

  /**
   * Validate file
   */
  private validateFile(file: Express.Multer.File): void {
    // Max file size: 10MB
    const maxSize = 10 * 1024 * 1024
    if (file.size > maxSize) {
      throw new BadRequestException(
        `File size exceeds maximum allowed size (${maxSize / 1024 / 1024}MB)`,
      )
    }

    // Allowed MIME types
    const allowedTypes = [
      'application/pdf',
      'application/xml',
      'text/xml',
      'image/jpeg',
      'image/png',
      'image/gif',
      'application/vnd.ms-excel',
      'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
      'text/csv',
    ]

    if (!allowedTypes.includes(file.mimetype)) {
      throw new BadRequestException(`File type not allowed: ${file.mimetype}`)
    }
  }

  /**
   * Convert stream to buffer
   */
  private async streamToBuffer(stream: any): Promise<Buffer> {
    return new Promise((resolve, reject) => {
      const chunks: any[] = []
      stream.on('data', (chunk: any) => chunks.push(chunk))
      stream.on('error', reject)
      stream.on('end', () => resolve(Buffer.concat(chunks)))
    })
  }

  /**
   * Get storage statistics
   */
  getStorageInfo() {
    return {
      provider: this.useS3 ? 'AWS S3' : 'MinIO',
      bucket: this.bucketName,
      region: this.configService.get<string>('AWS_REGION'),
      endpoint: this.configService.get<string>('S3_ENDPOINT'),
      publicAccess: this.configService.get<boolean>('S3_PUBLIC_ACCESS'),
    }
  }
}
