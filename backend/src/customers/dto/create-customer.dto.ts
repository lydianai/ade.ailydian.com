import { IsString, IsOptional, IsEmail, IsEnum, IsDecimal, MaxLength } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export enum CustomerType {
  INDIVIDUAL = 'INDIVIDUAL',
  CORPORATE = 'CORPORATE',
}

export class CreateCustomerDto {
  @ApiProperty({ enum: CustomerType, description: 'Müşteri tipi (Bireysel/Kurumsal)' })
  @IsEnum(CustomerType)
  type: CustomerType;

  @ApiPropertyOptional({ description: 'Ad (Bireysel müşteriler için)' })
  @IsOptional()
  @IsString()
  @MaxLength(100)
  firstName?: string;

  @ApiPropertyOptional({ description: 'Soyad (Bireysel müşteriler için)' })
  @IsOptional()
  @IsString()
  @MaxLength(100)
  lastName?: string;

  @ApiPropertyOptional({ description: 'TC Kimlik No (Bireysel müşteriler için)' })
  @IsOptional()
  @IsString()
  @MaxLength(11)
  tcNo?: string;

  @ApiPropertyOptional({ description: 'Şirket adı (Kurumsal müşteriler için)' })
  @IsOptional()
  @IsString()
  @MaxLength(200)
  companyName?: string;

  @ApiPropertyOptional({ description: 'Vergi dairesi' })
  @IsOptional()
  @IsString()
  @MaxLength(100)
  taxOffice?: string;

  @ApiPropertyOptional({ description: 'Vergi numarası' })
  @IsOptional()
  @IsString()
  @MaxLength(20)
  taxNumber?: string;

  @ApiPropertyOptional({ description: 'MERSİS numarası' })
  @IsOptional()
  @IsString()
  @MaxLength(16)
  mersisNo?: string;

  @ApiPropertyOptional({ description: 'E-posta adresi' })
  @IsOptional()
  @IsEmail()
  @MaxLength(100)
  email?: string;

  @ApiPropertyOptional({ description: 'Telefon numarası' })
  @IsOptional()
  @IsString()
  @MaxLength(20)
  phone?: string;

  @ApiPropertyOptional({ description: 'Adres' })
  @IsOptional()
  @IsString()
  @MaxLength(500)
  address?: string;

  @ApiPropertyOptional({ description: 'İl' })
  @IsOptional()
  @IsString()
  @MaxLength(50)
  city?: string;

  @ApiPropertyOptional({ description: 'İlçe' })
  @IsOptional()
  @IsString()
  @MaxLength(50)
  district?: string;

  @ApiPropertyOptional({ description: 'Posta kodu' })
  @IsOptional()
  @IsString()
  @MaxLength(10)
  postalCode?: string;

  @ApiPropertyOptional({ description: 'Kredi limiti' })
  @IsOptional()
  @IsDecimal()
  creditLimit?: number;

  @ApiPropertyOptional({ description: 'Notlar' })
  @IsOptional()
  @IsString()
  @MaxLength(1000)
  notes?: string;
}
