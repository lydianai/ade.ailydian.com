import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Body,
  Param,
  Query,
  Request,
  UseGuards,
  ParseIntPipe,
  DefaultValuePipe,
  UseInterceptors,
  UploadedFile,
  Res,
  StreamableFile,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiBearerAuth,
  ApiQuery,
  ApiParam,
  ApiConsumes,
  ApiBody,
} from '@nestjs/swagger';
import type { Response } from 'express';
import { DocumentsService } from './documents.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';

/**
 * Documents Controller - Doküman Yönetimi API
 * Dosya yükleme, indirme, listeleme ve yönetimi
 */
@ApiTags('Documents')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller('v1/documents')
export class DocumentsController {
  constructor(private readonly documentsService: DocumentsService) {}

  @Get()
  @ApiOperation({
    summary: 'Tüm dokümanları listele',
    description: 'Sayfalama ve filtreleme ile doküman listesini getirir',
  })
  @ApiQuery({ name: 'page', required: false, type: Number })
  @ApiQuery({ name: 'limit', required: false, type: Number })
  @ApiQuery({ name: 'category', required: false, type: String, description: 'INVOICE, CONTRACT, TAX_DOCUMENT, RECEIPT, OTHER' })
  @ApiQuery({ name: 'relatedType', required: false, type: String, description: 'invoice, customer, taxReturn' })
  @ApiQuery({ name: 'relatedId', required: false, type: String })
  @ApiQuery({ name: 'startDate', required: false, type: Date })
  @ApiQuery({ name: 'endDate', required: false, type: Date })
  @ApiResponse({ status: 200, description: 'Doküman listesi başarıyla getirildi' })
  async findAll(
    @Request() req,
    @Query('page', new DefaultValuePipe(1), ParseIntPipe) page: number,
    @Query('limit', new DefaultValuePipe(20), ParseIntPipe) limit: number,
    @Query('category') category?: string,
    @Query('relatedType') relatedType?: string,
    @Query('relatedId') relatedId?: string,
    @Query('startDate') startDate?: Date,
    @Query('endDate') endDate?: Date,
  ) {
    return this.documentsService.findAll(
      req.user.kullaniciId,
      page,
      limit,
      category,
      relatedType,
      relatedId,
      startDate,
      endDate,
    );
  }

  @Get('statistics')
  @ApiOperation({
    summary: 'Doküman istatistikleri',
    description: 'Toplam doküman sayısı, boyut ve kategori bazlı istatistikler',
  })
  @ApiResponse({ status: 200, description: 'İstatistikler başarıyla getirildi' })
  async getStatistics(@Request() req) {
    return this.documentsService.getStatistics(req.user.kullaniciId);
  }

  @Get('related/:relatedType/:relatedId')
  @ApiOperation({
    summary: 'İlişkili dokümanları getir',
    description: 'Belirli bir varlıkla ilişkili tüm dokümanları listeler',
  })
  @ApiParam({ name: 'relatedType', type: String, description: 'invoice, customer, taxReturn' })
  @ApiParam({ name: 'relatedId', type: String })
  @ApiResponse({ status: 200, description: 'İlişkili dokümanlar başarıyla getirildi' })
  async findByRelated(
    @Request() req,
    @Param('relatedType') relatedType: string,
    @Param('relatedId') relatedId: string,
  ) {
    return this.documentsService.findByRelated(
      req.user.kullaniciId,
      relatedType,
      relatedId,
    );
  }

  @Get('search/tags')
  @ApiOperation({
    summary: 'Etiketlere göre doküman ara',
    description: 'Belirtilen etiketlerden en az birine sahip dokümanları listeler',
  })
  @ApiQuery({ name: 'tags', required: true, type: String, description: 'Virgülle ayrılmış etiketler' })
  @ApiResponse({ status: 200, description: 'Dokümanlar başarıyla bulundu' })
  async searchByTags(
    @Request() req,
    @Query('tags') tagsString: string,
  ) {
    const tags = tagsString.split(',').map(t => t.trim());
    return this.documentsService.searchByTags(req.user.kullaniciId, tags);
  }

  @Get(':id')
  @ApiOperation({
    summary: 'Doküman detayı',
    description: 'ID\'ye göre doküman metadata\'sını getirir',
  })
  @ApiParam({ name: 'id', type: String })
  @ApiResponse({ status: 200, description: 'Doküman detayı başarıyla getirildi' })
  @ApiResponse({ status: 404, description: 'Doküman bulunamadı' })
  async findOne(@Request() req, @Param('id') id: string) {
    return this.documentsService.findOne(id, req.user.kullaniciId);
  }

  @Get(':id/download')
  @ApiOperation({
    summary: 'Doküman indir',
    description: 'Dosyayı indirir',
  })
  @ApiParam({ name: 'id', type: String })
  @ApiResponse({ status: 200, description: 'Dosya başarıyla indirildi' })
  @ApiResponse({ status: 404, description: 'Dosya bulunamadı' })
  async download(
    @Request() req,
    @Param('id') id: string,
    @Res({ passthrough: true }) res: Response,
  ) {
    const { buffer, fileName, mimeType } = await this.documentsService.download(
      id,
      req.user.kullaniciId,
    );

    res.set({
      'Content-Type': mimeType,
      'Content-Disposition': `attachment; filename="${fileName}"`,
    });

    return new StreamableFile(buffer);
  }

  @Post('upload')
  @ApiOperation({
    summary: 'Doküman yükle',
    description: 'Yeni dosya yükler ve metadata\'sını kaydeder',
  })
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
          enum: ['INVOICE', 'CONTRACT', 'TAX_DOCUMENT', 'RECEIPT', 'OTHER'],
        },
        relatedType: {
          type: 'string',
          example: 'invoice',
        },
        relatedId: {
          type: 'string',
          format: 'uuid',
        },
        description: {
          type: 'string',
        },
        tags: {
          type: 'string',
          description: 'Virgülle ayrılmış etiketler',
        },
      },
      required: ['file', 'category'],
    },
  })
  @ApiResponse({ status: 201, description: 'Doküman başarıyla yüklendi' })
  @ApiResponse({ status: 400, description: 'Geçersiz dosya veya metadata' })
  @UseInterceptors(FileInterceptor('file'))
  async upload(
    @Request() req,
    @UploadedFile() file: any,
    @Body('category') category: string,
    @Body('relatedType') relatedType?: string,
    @Body('relatedId') relatedId?: string,
    @Body('description') description?: string,
    @Body('tags') tagsString?: string,
  ) {
    const tags = tagsString
      ? tagsString.split(',').map(t => t.trim())
      : undefined;

    return this.documentsService.upload(req.user.kullaniciId, file, {
      category,
      relatedType,
      relatedId,
      description,
      tags,
    });
  }

  @Put(':id')
  @ApiOperation({
    summary: 'Doküman metadata güncelle',
    description: 'Doküman kategorisi, açıklama ve etiketlerini günceller',
  })
  @ApiParam({ name: 'id', type: String })
  @ApiResponse({ status: 200, description: 'Doküman başarıyla güncellendi' })
  @ApiResponse({ status: 404, description: 'Doküman bulunamadı' })
  async update(
    @Request() req,
    @Param('id') id: string,
    @Body() updateDto: {
      category?: string;
      description?: string;
      tags?: string[];
    },
  ) {
    return this.documentsService.update(id, req.user.kullaniciId, updateDto);
  }

  @Delete(':id')
  @ApiOperation({
    summary: 'Doküman sil',
    description: 'Dokümanı ve fiziksel dosyayı siler',
  })
  @ApiParam({ name: 'id', type: String })
  @ApiResponse({ status: 200, description: 'Doküman başarıyla silindi' })
  @ApiResponse({ status: 404, description: 'Doküman bulunamadı' })
  async remove(@Request() req, @Param('id') id: string) {
    return this.documentsService.remove(id, req.user.kullaniciId);
  }
}
