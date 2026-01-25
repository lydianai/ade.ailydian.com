import {
  Controller,
  Get,
  Post,
  Put,
  Patch,
  Delete,
  Body,
  Param,
  Query,
  Request,
  UseGuards,
  ParseIntPipe,
  DefaultValuePipe,
} from '@nestjs/common';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiBearerAuth,
  ApiQuery,
  ApiParam,
} from '@nestjs/swagger';
import { InvoicesService } from './invoices.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';

/**
 * Invoice Controller - E-Fatura & E-Arşiv API
 * Fatura yönetimi için RESTful endpoint'ler
 */
@ApiTags('Invoices')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller('v1/invoices')
export class InvoicesController {
  constructor(private readonly invoicesService: InvoicesService) {}

  @Get()
  @ApiOperation({
    summary: 'Tüm faturaları listele',
    description: 'Sayfalama ve filtreleme ile fatura listesini getirir',
  })
  @ApiQuery({ name: 'page', required: false, type: Number, description: 'Sayfa numarası (varsayılan: 1)' })
  @ApiQuery({ name: 'limit', required: false, type: Number, description: 'Sayfa başına kayıt (varsayılan: 20)' })
  @ApiQuery({ name: 'status', required: false, type: String, description: 'Durum filtresi' })
  @ApiQuery({ name: 'customerId', required: false, type: String, description: 'Müşteri ID filtresi' })
  @ApiQuery({ name: 'startDate', required: false, type: Date, description: 'Başlangıç tarihi' })
  @ApiQuery({ name: 'endDate', required: false, type: Date, description: 'Bitiş tarihi' })
  @ApiResponse({ status: 200, description: 'Fatura listesi başarıyla getirildi' })
  @ApiResponse({ status: 401, description: 'Yetkisiz erişim' })
  async findAll(
    @Request() req,
    @Query('page', new DefaultValuePipe(1), ParseIntPipe) page: number,
    @Query('limit', new DefaultValuePipe(20), ParseIntPipe) limit: number,
    @Query('status') status?: string,
    @Query('customerId') customerId?: string,
    @Query('startDate') startDate?: Date,
    @Query('endDate') endDate?: Date,
  ) {
    return this.invoicesService.findAll(
      req.user.kullaniciId,
      page,
      limit,
      status,
      customerId,
      startDate,
      endDate,
    );
  }

  @Get(':id')
  @ApiOperation({
    summary: 'Fatura detayını getir',
    description: 'ID\'ye göre fatura detayını ve kalemlerini getirir',
  })
  @ApiParam({ name: 'id', type: String, description: 'Fatura ID' })
  @ApiResponse({ status: 200, description: 'Fatura detayı başarıyla getirildi' })
  @ApiResponse({ status: 404, description: 'Fatura bulunamadı' })
  @ApiResponse({ status: 401, description: 'Yetkisiz erişim' })
  async findOne(@Request() req, @Param('id') id: string) {
    return this.invoicesService.findOne(id, req.user.kullaniciId);
  }

  @Post()
  @ApiOperation({
    summary: 'Yeni fatura oluştur',
    description: 'Kalemler ile birlikte yeni fatura oluşturur',
  })
  @ApiResponse({ status: 201, description: 'Fatura başarıyla oluşturuldu' })
  @ApiResponse({ status: 400, description: 'Geçersiz veri' })
  @ApiResponse({ status: 401, description: 'Yetkisiz erişim' })
  async create(@Request() req, @Body() createInvoiceDto: any) {
    return this.invoicesService.create(req.user.kullaniciId, createInvoiceDto);
  }

  @Put(':id')
  @ApiOperation({
    summary: 'Faturayı güncelle',
    description: 'Taslak faturayı günceller (sadece DRAFT durumundaki faturalar)',
  })
  @ApiParam({ name: 'id', type: String, description: 'Fatura ID' })
  @ApiResponse({ status: 200, description: 'Fatura başarıyla güncellendi' })
  @ApiResponse({ status: 400, description: 'Sadece taslak faturalar güncellenebilir' })
  @ApiResponse({ status: 404, description: 'Fatura bulunamadı' })
  @ApiResponse({ status: 401, description: 'Yetkisiz erişim' })
  async update(
    @Request() req,
    @Param('id') id: string,
    @Body() updateInvoiceDto: any,
  ) {
    return this.invoicesService.update(id, req.user.kullaniciId, updateInvoiceDto);
  }

  @Patch(':id/status')
  @ApiOperation({
    summary: 'Fatura durumunu güncelle',
    description: 'Fatura durumunu günceller (geçiş kontrolü yapılır)',
  })
  @ApiParam({ name: 'id', type: String, description: 'Fatura ID' })
  @ApiResponse({ status: 200, description: 'Durum başarıyla güncellendi' })
  @ApiResponse({ status: 400, description: 'Geçersiz durum geçişi' })
  @ApiResponse({ status: 404, description: 'Fatura bulunamadı' })
  @ApiResponse({ status: 401, description: 'Yetkisiz erişim' })
  async updateStatus(
    @Request() req,
    @Param('id') id: string,
    @Body('status') status: string,
  ) {
    return this.invoicesService.updateStatus(id, req.user.kullaniciId, status);
  }

  @Delete(':id')
  @ApiOperation({
    summary: 'Faturayı sil',
    description: 'Faturayı soft delete yapar (ödenmiş faturalar silinemez)',
  })
  @ApiParam({ name: 'id', type: String, description: 'Fatura ID' })
  @ApiResponse({ status: 200, description: 'Fatura başarıyla silindi' })
  @ApiResponse({ status: 400, description: 'Ödenmiş faturalar silinemez' })
  @ApiResponse({ status: 404, description: 'Fatura bulunamadı' })
  @ApiResponse({ status: 401, description: 'Yetkisiz erişim' })
  async remove(@Request() req, @Param('id') id: string) {
    return this.invoicesService.remove(id, req.user.kullaniciId);
  }
}
