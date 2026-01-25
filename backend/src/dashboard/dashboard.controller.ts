import { Controller, Get, UseGuards, Request, Query, ParseIntPipe } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth, ApiQuery } from '@nestjs/swagger';
import { DashboardService } from './dashboard.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';

/**
 * Dashboard Controller - Business Intelligence & Analytics
 * Provides real-time statistics and insights for authenticated users
 */
@ApiTags('Dashboard')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller('v1/dashboard')
export class DashboardController {
  constructor(private readonly dashboardService: DashboardService) {}

  @Get('stats')
  @ApiOperation({
    summary: 'Kapsamlı dashboard istatistikleri',
    description: 'Müşteriler, faturalar, ödemeler ve son aktiviteler dahil tüm istatistikleri getirir',
  })
  @ApiResponse({ status: 200, description: 'İstatistikler başarıyla getirildi' })
  @ApiResponse({ status: 401, description: 'Yetkisiz erişim' })
  async getStats(@Request() req) {
    return this.dashboardService.getStats(req.user.kullaniciId);
  }

  @Get('revenue-chart')
  @ApiOperation({
    summary: 'Aylık gelir grafiği verileri',
    description: 'Son 12 aylık gelir ve ödeme sayısı verilerini getirir',
  })
  @ApiResponse({ status: 200, description: 'Grafik verileri başarıyla getirildi' })
  async getRevenueChart(@Request() req) {
    return this.dashboardService.getRevenueChart(req.user.kullaniciId);
  }

  @Get('top-customers')
  @ApiOperation({
    summary: 'En çok gelir getiren müşteriler',
    description: 'Toplam gelire göre sıralanmış en iyi müşterileri getirir',
  })
  @ApiQuery({ name: 'limit', required: false, type: Number, description: 'Döndürülecek müşteri sayısı (varsayılan: 5)' })
  @ApiResponse({ status: 200, description: 'En iyi müşteriler başarıyla getirildi' })
  async getTopCustomers(
    @Request() req,
    @Query('limit', new ParseIntPipe({ optional: true })) limit?: number,
  ) {
    return this.dashboardService.getTopCustomers(req.user.kullaniciId, limit || 5);
  }
}
