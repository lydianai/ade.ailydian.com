import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
  UseGuards,
  Request,
} from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth } from '@nestjs/swagger';
import { CustomersService } from './customers.service';
import { CreateCustomerDto } from './dto/create-customer.dto';
import { UpdateCustomerDto } from './dto/update-customer.dto';
import { QueryCustomerDto } from './dto/query-customer.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';

@ApiTags('customers')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller('v1/customers')
export class CustomersController {
  constructor(private readonly customersService: CustomersService) {}

  @Post()
  @ApiOperation({ summary: 'Yeni müşteri oluştur' })
  @ApiResponse({ status: 201, description: 'Müşteri başarıyla oluşturuldu' })
  @ApiResponse({ status: 400, description: 'Geçersiz veri' })
  create(@Request() req, @Body() createCustomerDto: CreateCustomerDto) {
    return this.customersService.create(req.user.id, createCustomerDto);
  }

  @Get()
  @ApiOperation({ summary: 'Tüm müşterileri listele' })
  @ApiResponse({ status: 200, description: 'Müşteri listesi' })
  findAll(@Request() req, @Query() queryDto: QueryCustomerDto) {
    return this.customersService.findAll(req.user.id, queryDto);
  }

  @Get('stats')
  @ApiOperation({ summary: 'Müşteri istatistikleri' })
  @ApiResponse({ status: 200, description: 'İstatistikler' })
  getStats(@Request() req) {
    return this.customersService.getStats(req.user.id);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Müşteri detayı getir' })
  @ApiResponse({ status: 200, description: 'Müşteri detayı' })
  @ApiResponse({ status: 404, description: 'Müşteri bulunamadı' })
  findOne(@Request() req, @Param('id') id: string) {
    return this.customersService.findOne(req.user.id, id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Müşteri bilgilerini güncelle' })
  @ApiResponse({ status: 200, description: 'Müşteri başarıyla güncellendi' })
  @ApiResponse({ status: 404, description: 'Müşteri bulunamadı' })
  update(
    @Request() req,
    @Param('id') id: string,
    @Body() updateCustomerDto: UpdateCustomerDto,
  ) {
    return this.customersService.update(req.user.id, id, updateCustomerDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Müşteri sil (soft delete)' })
  @ApiResponse({ status: 200, description: 'Müşteri başarıyla silindi' })
  @ApiResponse({ status: 404, description: 'Müşteri bulunamadı' })
  remove(@Request() req, @Param('id') id: string) {
    return this.customersService.remove(req.user.id, id);
  }
}
