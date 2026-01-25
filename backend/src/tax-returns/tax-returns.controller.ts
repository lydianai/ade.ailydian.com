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
import { TaxReturnsService } from './tax-returns.service';
import { TaxCalculatorService } from './tax-calculator.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';

/**
 * Tax Returns Controller - Vergi Beyannameleri API
 * KDV, Gelir Vergisi, Stopaj, Damga Vergisi, Kurumlar beyanları
 */
@ApiTags('Tax Returns')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller('v1/tax-returns')
export class TaxReturnsController {
  constructor(
    private readonly taxReturnsService: TaxReturnsService,
    private readonly taxCalculatorService: TaxCalculatorService,
  ) {}

  @Get()
  @ApiOperation({
    summary: 'Tüm beyannameleri listele',
    description: 'Sayfalama ve filtreleme ile beyanname listesini getirir',
  })
  @ApiQuery({ name: 'page', required: false, type: Number })
  @ApiQuery({ name: 'limit', required: false, type: Number })
  @ApiQuery({ name: 'type', required: false, type: String, description: 'KDV, GELIR_VERGISI, STOPAJ, DAMGA_VERGISI, KURUMLAR' })
  @ApiQuery({ name: 'status', required: false, type: String, description: 'DRAFT, SUBMITTED, PAID, OVERDUE, REJECTED, CANCELLED' })
  @ApiQuery({ name: 'year', required: false, type: Number })
  @ApiQuery({ name: 'startDate', required: false, type: Date })
  @ApiQuery({ name: 'endDate', required: false, type: Date })
  @ApiResponse({ status: 200, description: 'Beyanname listesi başarıyla getirildi' })
  async findAll(
    @Request() req,
    @Query('page', new DefaultValuePipe(1), ParseIntPipe) page: number,
    @Query('limit', new DefaultValuePipe(20), ParseIntPipe) limit: number,
    @Query('type') type?: string,
    @Query('status') status?: string,
    @Query('year', new DefaultValuePipe(0), ParseIntPipe) year?: number,
    @Query('startDate') startDate?: Date,
    @Query('endDate') endDate?: Date,
  ) {
    return this.taxReturnsService.findAll(
      req.user.kullaniciId,
      page,
      limit,
      type,
      status,
      year === 0 ? undefined : year,
      startDate,
      endDate,
    );
  }

  @Get('statistics')
  @ApiOperation({
    summary: 'Beyanname istatistikleri',
    description: 'Toplam tutarlar ve beyanname sayıları',
  })
  @ApiQuery({ name: 'year', required: false, type: Number })
  @ApiResponse({ status: 200, description: 'İstatistikler başarıyla getirildi' })
  async getStatistics(
    @Request() req,
    @Query('year', new DefaultValuePipe(0), ParseIntPipe) year?: number,
  ) {
    return this.taxReturnsService.getStatistics(
      req.user.kullaniciId,
      year === 0 ? undefined : year,
    );
  }

  @Get('upcoming')
  @ApiOperation({
    summary: 'Yaklaşan beyanname tarihleri',
    description: 'Belirtilen gün içinde vadesi dolan beyannameler',
  })
  @ApiQuery({ name: 'days', required: false, type: Number, description: 'Kaç gün sonrasına kadar (varsayılan: 30)' })
  @ApiResponse({ status: 200, description: 'Yaklaşan beyannameler başarıyla getirildi' })
  async getUpcoming(
    @Request() req,
    @Query('days', new DefaultValuePipe(30), ParseIntPipe) days: number,
  ) {
    return this.taxReturnsService.getUpcomingReturns(req.user.kullaniciId, days);
  }

  @Get('period/:type/:year')
  @ApiOperation({
    summary: 'Dönem bazlı beyannameler',
    description: 'Belirli bir dönem için beyannameleri listeler',
  })
  @ApiParam({ name: 'type', type: String, description: 'Vergi türü' })
  @ApiParam({ name: 'year', type: Number, description: 'Yıl' })
  @ApiQuery({ name: 'month', required: false, type: Number, description: 'Ay (1-12)' })
  @ApiResponse({ status: 200, description: 'Dönem beyannameleri başarıyla getirildi' })
  async findByPeriod(
    @Request() req,
    @Param('type') type: string,
    @Param('year', ParseIntPipe) year: number,
    @Query('month', new DefaultValuePipe(0), ParseIntPipe) month?: number,
  ) {
    return this.taxReturnsService.findByPeriod(
      req.user.kullaniciId,
      type,
      year,
      month === 0 ? undefined : month,
    );
  }

  @Get(':id')
  @ApiOperation({
    summary: 'Beyanname detayı',
    description: 'ID\'ye göre beyanname detayını getirir',
  })
  @ApiParam({ name: 'id', type: String })
  @ApiResponse({ status: 200, description: 'Beyanname detayı başarıyla getirildi' })
  @ApiResponse({ status: 404, description: 'Beyanname bulunamadı' })
  async findOne(@Request() req, @Param('id') id: string) {
    return this.taxReturnsService.findOne(id, req.user.kullaniciId);
  }

  @Post()
  @ApiOperation({
    summary: 'Yeni beyanname oluştur',
    description: 'Manuel beyanname oluşturur',
  })
  @ApiResponse({ status: 201, description: 'Beyanname başarıyla oluşturuldu' })
  @ApiResponse({ status: 400, description: 'Geçersiz veri' })
  @ApiResponse({ status: 409, description: 'Bu dönem için beyanname zaten mevcut' })
  async create(@Request() req, @Body() createTaxReturnDto: any) {
    return this.taxReturnsService.create(req.user.kullaniciId, createTaxReturnDto);
  }

  @Post('generate')
  @ApiOperation({
    summary: 'Otomatik beyanname oluştur',
    description: 'Fatura verilerinden otomatik beyanname oluşturur',
  })
  @ApiResponse({ status: 201, description: 'Otomatik beyanname başarıyla oluşturuldu' })
  @ApiResponse({ status: 409, description: 'Bu dönem için beyanname zaten mevcut' })
  async generateAutomatic(@Request() req, @Body() generateDto: any) {
    return this.taxReturnsService.generateAutomatic(
      req.user.kullaniciId,
      generateDto.type,
      generateDto.period,
      generateDto.year,
      generateDto.month,
    );
  }

  @Put(':id')
  @ApiOperation({
    summary: 'Beyanname güncelle',
    description: 'Taslak beyannameleri günceller',
  })
  @ApiParam({ name: 'id', type: String })
  @ApiResponse({ status: 200, description: 'Beyanname başarıyla güncellendi' })
  @ApiResponse({ status: 400, description: 'Sadece taslak beyannameler düzenlenebilir' })
  @ApiResponse({ status: 404, description: 'Beyanname bulunamadı' })
  async update(
    @Request() req,
    @Param('id') id: string,
    @Body() updateTaxReturnDto: any,
  ) {
    return this.taxReturnsService.update(id, req.user.kullaniciId, updateTaxReturnDto);
  }

  @Patch(':id/status')
  @ApiOperation({
    summary: 'Beyanname durumu güncelle',
    description: 'Beyanname durumunu değiştirir (geçiş kontrolü yapılır)',
  })
  @ApiParam({ name: 'id', type: String })
  @ApiResponse({ status: 200, description: 'Durum başarıyla güncellendi' })
  @ApiResponse({ status: 400, description: 'Geçersiz durum geçişi' })
  @ApiResponse({ status: 404, description: 'Beyanname bulunamadı' })
  async updateStatus(
    @Request() req,
    @Param('id') id: string,
    @Body() statusDto: { status: string; gibReference?: string },
  ) {
    return this.taxReturnsService.updateStatus(
      id,
      req.user.kullaniciId,
      statusDto.status,
      statusDto.gibReference,
    );
  }

  @Delete(':id')
  @ApiOperation({
    summary: 'Beyanname sil',
    description: 'Beyanname siler (gönderilmiş veya ödenmiş beyannameler silinemez)',
  })
  @ApiParam({ name: 'id', type: String })
  @ApiResponse({ status: 200, description: 'Beyanname başarıyla silindi' })
  @ApiResponse({ status: 400, description: 'Gönderilmiş veya ödenmiş beyannameler silinemez' })
  @ApiResponse({ status: 404, description: 'Beyanname bulunamadı' })
  async remove(@Request() req, @Param('id') id: string) {
    return this.taxReturnsService.remove(id, req.user.kullaniciId);
  }

  // ========================================
  // VERGİ HESAPLAMA ENDPOINTLERİ
  // ========================================

  @Post('calculate/kdv')
  @ApiOperation({
    summary: 'KDV Hesapla',
    description: 'Belirtilen tutar ve oran için KDV hesaplar (1%, 10%, 20%)',
  })
  @ApiResponse({ status: 200, description: 'KDV başarıyla hesaplandı' })
  async calculateKDV(@Body() dto: { tutar: number; oran?: 0.01 | 0.1 | 0.2 }) {
    return {
      success: true,
      data: this.taxCalculatorService.hesaplaKDV(dto.tutar, dto.oran || 0.2),
    };
  }

  @Post('calculate/kdv-ayir')
  @ApiOperation({
    summary: 'KDV Ayır',
    description: 'Toplam tutardan KDV\'yi ayırır',
  })
  @ApiResponse({ status: 200, description: 'KDV başarıyla ayrıldı' })
  async separateKDV(@Body() dto: { toplamTutar: number; oran?: 0.01 | 0.1 | 0.2 }) {
    return {
      success: true,
      data: this.taxCalculatorService.kdvAyir(dto.toplamTutar, dto.oran || 0.2),
    };
  }

  @Post('calculate/gelir-vergisi')
  @ApiOperation({
    summary: 'Gelir Vergisi Hesapla',
    description: 'Yıllık gelir için dilimli gelir vergisi hesaplar (2024 dilimleri)',
  })
  @ApiResponse({ status: 200, description: 'Gelir vergisi başarıyla hesaplandı' })
  async calculateIncomeTax(@Body() dto: { yillikGelir: number }) {
    return {
      success: true,
      data: this.taxCalculatorService.hesaplaGelirVergisi(dto.yillikGelir),
    };
  }

  @Post('calculate/net-maas')
  @ApiOperation({
    summary: 'Net Maaş Hesapla',
    description: 'Brüt maaştan SGK + Gelir Vergisi + Damga Vergisi kesintileri ile net maaş hesaplar',
  })
  @ApiResponse({ status: 200, description: 'Net maaş başarıyla hesaplandı' })
  async calculateNetSalary(@Body() dto: { brutMaas: number }) {
    return {
      success: true,
      data: this.taxCalculatorService.hesaplaNetMaas(dto.brutMaas),
    };
  }

  @Post('calculate/sgk-isveren')
  @ApiOperation({
    summary: 'SGK İşveren Primi Hesapla',
    description: 'Brüt maaş üzerinden işveren SGK primlerini hesaplar',
  })
  @ApiResponse({ status: 200, description: 'SGK işveren primi başarıyla hesaplandı' })
  async calculateEmployerSGK(@Body() dto: { brutMaas: number }) {
    return {
      success: true,
      data: this.taxCalculatorService.hesaplaSGKIsverenPrimi(dto.brutMaas),
    };
  }

  @Post('calculate/stopaj')
  @ApiOperation({
    summary: 'Stopaj Hesapla',
    description: 'Belirtilen gelir türü için stopaj hesaplar (Maaş, Kira, Serbest Meslek, vb.)',
  })
  @ApiResponse({ status: 200, description: 'Stopaj başarıyla hesaplandı' })
  async calculateWithholding(
    @Body()
    dto: {
      tutar: number;
      tur:
        | 'MAAS'
        | 'KIRA'
        | 'SERBEST_MESLEK'
        | 'MENKUL_KIYMET'
        | 'HIZMET'
        | 'YONETIM_KURULU'
        | 'TEMETTÜ';
    },
  ) {
    const stopajOranlari = {
      MAAS: 0.15,
      KIRA: 0.2,
      SERBEST_MESLEK: 0.2,
      MENKUL_KIYMET: 0.1,
      HIZMET: 0.2,
      YONETIM_KURULU: 0.2,
      TEMETTÜ: 0.1,
    };
    return {
      success: true,
      data: this.taxCalculatorService.hesaplaStopaj(dto.tutar, stopajOranlari[dto.tur]),
    };
  }

  @Post('calculate/kurumlar-vergisi')
  @ApiOperation({
    summary: 'Kurumlar Vergisi Hesapla',
    description: 'Kurum kazancı üzerinden kurumlar vergisi hesaplar (%25 - 2024)',
  })
  @ApiResponse({ status: 200, description: 'Kurumlar vergisi başarıyla hesaplandı' })
  async calculateCorporateTax(@Body() dto: { kurumKazanci: number }) {
    return {
      success: true,
      data: this.taxCalculatorService.hesaplaKurumlarVergisi(dto.kurumKazanci),
    };
  }

  @Post('calculate/damga-vergisi')
  @ApiOperation({
    summary: 'Damga Vergisi Hesapla',
    description: 'Belge tutarı üzerinden damga vergisi hesaplar (%0.948 - 2024)',
  })
  @ApiResponse({ status: 200, description: 'Damga vergisi başarıyla hesaplandı' })
  async calculateStampDuty(@Body() dto: { belgeTutari: number }) {
    return {
      success: true,
      data: this.taxCalculatorService.hesaplaDamgaVergisi(dto.belgeTutari),
    };
  }

  @Post('calculate/mtv')
  @ApiOperation({
    summary: 'MTV Hesapla',
    description: 'Araç tipi, motor hacmi ve model yılına göre Motorlu Taşıtlar Vergisi hesaplar',
  })
  @ApiResponse({ status: 200, description: 'MTV başarıyla hesaplandı' })
  async calculateMTV(
    @Body()
    dto: {
      aracTipi: 'otomobil' | 'minibus' | 'kamyonet';
      motorHacmi: number;
      modelYili: number;
    },
  ) {
    return {
      success: true,
      data: this.taxCalculatorService.hesaplaMTV(dto.aracTipi, dto.motorHacmi, dto.modelYili),
    };
  }

  @Post('calculate/fatura-toplam')
  @ApiOperation({
    summary: 'Fatura Toplamı Hesapla',
    description: 'Ürünlerin KDV dahil fatura toplamını hesaplar',
  })
  @ApiResponse({ status: 200, description: 'Fatura toplamı başarıyla hesaplandı' })
  async calculateInvoiceTotal(
    @Body()
    dto: {
      urunler: Array<{
        aciklama: string;
        birimFiyat: number;
        miktar: number;
        kdvOrani: 0.01 | 0.1 | 0.2;
      }>;
    },
  ) {
    return {
      success: true,
      data: this.taxCalculatorService.hesaplaFaturaToplam(dto.urunler),
    };
  }

  @Post('calculate/gecikme-zammi')
  @ApiOperation({
    summary: 'Gecikme Zammı Hesapla',
    description: 'Vade geçmiş tutar için gecikme faizi hesaplar (%55 yıllık)',
  })
  @ApiResponse({ status: 200, description: 'Gecikme zammı başarıyla hesaplandı' })
  async calculateLateFee(
    @Body() dto: { anaParas: number; vadeGunSayisi: number; yillikFaizOrani?: number },
  ) {
    return {
      success: true,
      data: this.taxCalculatorService.hesaplaGecikmeZammi(
        dto.anaParas,
        dto.vadeGunSayisi,
        dto.yillikFaizOrani || 0.55,
      ),
    };
  }

  @Post('analyze/yillik-vergi-yuku')
  @ApiOperation({
    summary: 'Yıllık Vergi Yükü Analizi',
    description: 'Tüm vergi türlerini içeren kapsamlı yıllık vergi yükü analizi',
  })
  @ApiResponse({ status: 200, description: 'Analiz başarıyla tamamlandı' })
  async analyzeAnnualTaxBurden(
    @Body()
    dto: {
      yillikGelir: number;
      aylikKira?: number;
      aracSayisi?: number;
      sirketKazanci?: number;
    },
  ) {
    return {
      success: true,
      data: this.taxCalculatorService.analizYillikVergiYuku({
        yillikCiro: dto.yillikGelir || 0,
        giderler: 0,
        maaslar: 0,
        calisanSayisi: 1,
        tip: 'sahis',
      }),
    };
  }
}
