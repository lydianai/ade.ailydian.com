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
import { PaymentsService } from './payments.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';

/**
 * Payments Controller - Ödeme Yönetimi API
 * Ödeme kayıtları, tahsilat/ödeme işlemleri
 */
@ApiTags('Payments')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller('v1/payments')
export class PaymentsController {
  constructor(private readonly paymentsService: PaymentsService) {}

  @Get()
  @ApiOperation({
    summary: 'Tüm ödemeleri listele',
    description: 'Sayfalama ve filtreleme ile ödeme listesini getirir',
  })
  @ApiQuery({ name: 'page', required: false, type: Number, description: 'Sayfa numarası (varsayılan: 1)' })
  @ApiQuery({ name: 'limit', required: false, type: Number, description: 'Sayfa başına kayıt (varsayılan: 20)' })
  @ApiQuery({ name: 'status', required: false, type: String, description: 'Durum filtresi (PENDING, COMPLETED, FAILED, CANCELLED, REFUNDED)' })
  @ApiQuery({ name: 'method', required: false, type: String, description: 'Ödeme yöntemi filtresi' })
  @ApiQuery({ name: 'invoiceId', required: false, type: String, description: 'Fatura ID filtresi' })
  @ApiQuery({ name: 'customerId', required: false, type: String, description: 'Müşteri ID filtresi' })
  @ApiQuery({ name: 'startDate', required: false, type: Date, description: 'Başlangıç tarihi' })
  @ApiQuery({ name: 'endDate', required: false, type: Date, description: 'Bitiş tarihi' })
  @ApiResponse({ status: 200, description: 'Ödeme listesi başarıyla getirildi' })
  @ApiResponse({ status: 401, description: 'Yetkisiz erişim' })
  async findAll(
    @Request() req,
    @Query('page', new DefaultValuePipe(1), ParseIntPipe) page: number,
    @Query('limit', new DefaultValuePipe(20), ParseIntPipe) limit: number,
    @Query('status') status?: string,
    @Query('method') method?: string,
    @Query('invoiceId') invoiceId?: string,
    @Query('customerId') customerId?: string,
    @Query('startDate') startDate?: Date,
    @Query('endDate') endDate?: Date,
  ) {
    return this.paymentsService.findAll(
      req.user.kullaniciId,
      page,
      limit,
      status,
      method,
      invoiceId,
      customerId,
      startDate,
      endDate,
    );
  }

  @Get('statistics')
  @ApiOperation({
    summary: 'Ödeme istatistikleri',
    description: 'Ödeme tutarları ve sayıları hakkında özet bilgiler',
  })
  @ApiQuery({ name: 'startDate', required: false, type: Date, description: 'Başlangıç tarihi' })
  @ApiQuery({ name: 'endDate', required: false, type: Date, description: 'Bitiş tarihi' })
  @ApiResponse({ status: 200, description: 'İstatistikler başarıyla getirildi' })
  @ApiResponse({ status: 401, description: 'Yetkisiz erişim' })
  async getStatistics(
    @Request() req,
    @Query('startDate') startDate?: Date,
    @Query('endDate') endDate?: Date,
  ) {
    return this.paymentsService.getStatistics(req.user.kullaniciId, startDate, endDate);
  }

  @Get('invoice/:invoiceId')
  @ApiOperation({
    summary: 'Faturaya ait ödemeleri listele',
    description: 'Belirli bir faturanın tüm ödeme kayıtlarını getirir',
  })
  @ApiParam({ name: 'invoiceId', type: String, description: 'Fatura ID' })
  @ApiResponse({ status: 200, description: 'Fatura ödemeleri başarıyla getirildi' })
  @ApiResponse({ status: 401, description: 'Yetkisiz erişim' })
  async findByInvoice(@Request() req, @Param('invoiceId') invoiceId: string) {
    return this.paymentsService.findByInvoice(invoiceId, req.user.kullaniciId);
  }

  @Get(':id')
  @ApiOperation({
    summary: 'Ödeme detayını getir',
    description: 'ID\'ye göre ödeme detayını getirir',
  })
  @ApiParam({ name: 'id', type: String, description: 'Ödeme ID' })
  @ApiResponse({ status: 200, description: 'Ödeme detayı başarıyla getirildi' })
  @ApiResponse({ status: 404, description: 'Ödeme kaydı bulunamadı' })
  @ApiResponse({ status: 401, description: 'Yetkisiz erişim' })
  async findOne(@Request() req, @Param('id') id: string) {
    return this.paymentsService.findOne(id, req.user.kullaniciId);
  }

  @Post()
  @ApiOperation({
    summary: 'Yeni ödeme kaydı oluştur',
    description: 'Yeni ödeme kaydı oluşturur. Fatura bağlantısı opsiyoneldir.',
  })
  @ApiResponse({ status: 201, description: 'Ödeme kaydı başarıyla oluşturuldu' })
  @ApiResponse({ status: 400, description: 'Geçersiz veri' })
  @ApiResponse({ status: 404, description: 'Fatura bulunamadı' })
  @ApiResponse({ status: 401, description: 'Yetkisiz erişim' })
  async create(@Request() req, @Body() createPaymentDto: any) {
    return this.paymentsService.create(req.user.kullaniciId, createPaymentDto);
  }

  @Put(':id')
  @ApiOperation({
    summary: 'Ödeme kaydını güncelle',
    description: 'Ödeme kaydını günceller (sadece PENDING durumundaki ödemeler)',
  })
  @ApiParam({ name: 'id', type: String, description: 'Ödeme ID' })
  @ApiResponse({ status: 200, description: 'Ödeme kaydı başarıyla güncellendi' })
  @ApiResponse({ status: 400, description: 'Tamamlanmış ödemeler düzenlenemez' })
  @ApiResponse({ status: 404, description: 'Ödeme kaydı bulunamadı' })
  @ApiResponse({ status: 401, description: 'Yetkisiz erişim' })
  async update(
    @Request() req,
    @Param('id') id: string,
    @Body() updatePaymentDto: any,
  ) {
    return this.paymentsService.update(id, req.user.kullaniciId, updatePaymentDto);
  }

  @Patch(':id/status')
  @ApiOperation({
    summary: 'Ödeme durumunu güncelle',
    description: 'Ödeme durumunu günceller (geçiş kontrolü yapılır). Fatura durumu otomatik güncellenir.',
  })
  @ApiParam({ name: 'id', type: String, description: 'Ödeme ID' })
  @ApiResponse({ status: 200, description: 'Durum başarıyla güncellendi' })
  @ApiResponse({ status: 400, description: 'Geçersiz durum geçişi' })
  @ApiResponse({ status: 404, description: 'Ödeme kaydı bulunamadı' })
  @ApiResponse({ status: 401, description: 'Yetkisiz erişim' })
  async updateStatus(
    @Request() req,
    @Param('id') id: string,
    @Body('status') status: string,
  ) {
    return this.paymentsService.updateStatus(id, req.user.kullaniciId, status);
  }

  @Delete(':id')
  @ApiOperation({
    summary: 'Ödeme kaydını sil',
    description: 'Ödeme kaydını siler (tamamlanmış ödemeler silinemez)',
  })
  @ApiParam({ name: 'id', type: String, description: 'Ödeme ID' })
  @ApiResponse({ status: 200, description: 'Ödeme kaydı başarıyla silindi' })
  @ApiResponse({ status: 400, description: 'Tamamlanmış ödemeler silinemez' })
  @ApiResponse({ status: 404, description: 'Ödeme kaydı bulunamadı' })
  @ApiResponse({ status: 401, description: 'Yetkisiz erişim' })
  async remove(@Request() req, @Param('id') id: string) {
    return this.paymentsService.remove(id, req.user.kullaniciId);
  }
}
