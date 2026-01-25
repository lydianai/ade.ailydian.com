import { IsOptional, IsString, IsEnum, IsInt, Min } from 'class-validator';
import { Type } from 'class-transformer';
import { ApiPropertyOptional } from '@nestjs/swagger';
import { CustomerType } from './create-customer.dto';

export class QueryCustomerDto {
  @ApiPropertyOptional({ description: 'Sayfa numarası', default: 1 })
  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @Min(1)
  page?: number = 1;

  @ApiPropertyOptional({ description: 'Sayfa başına kayıt sayısı', default: 10 })
  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @Min(1)
  limit?: number = 10;

  @ApiPropertyOptional({ description: 'Arama terimi (ad, soyad, şirket adı)' })
  @IsOptional()
  @IsString()
  search?: string;

  @ApiPropertyOptional({ enum: CustomerType, description: 'Müşteri tipi filtresi' })
  @IsOptional()
  @IsEnum(CustomerType)
  type?: CustomerType;

  @ApiPropertyOptional({ description: 'İl filtresi' })
  @IsOptional()
  @IsString()
  city?: string;
}
