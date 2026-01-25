import { ApiProperty } from '@nestjs/swagger';
import {
  IsEmail,
  IsString,
  MinLength,
  MaxLength,
  Matches,
  IsOptional,
  IsEnum,
} from 'class-validator';
import { MESAJLAR } from '../../common/constants/mesajlar';

export enum KullaniciRolu {
  ESNAF = 'ESNAF',
  KOBI = 'KOBI',
  VATANDAS = 'VATANDAS',
  KAMU = 'KAMU',
}

export class KayitOlDto {
  @ApiProperty({
    example: 'ahmet@example.com',
    description: 'Kullanıcının e-posta adresi',
  })
  @IsEmail({}, { message: MESAJLAR.AUTH.EMAIL_GECERSIZ })
  email: string;

  @ApiProperty({
    example: 'Güçlü123!',
    description: 'Kullanıcının şifresi (min 8 karakter, büyük-küçük harf ve rakam içermeli)',
  })
  @IsString({ message: MESAJLAR.AUTH.SIFRE_GEREKLI })
  @MinLength(8, { message: MESAJLAR.AUTH.SIFRE_KISA })
  @Matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).+$/, {
    message: MESAJLAR.AUTH.SIFRE_ZAYIF,
  })
  sifre: string;

  @ApiProperty({
    example: 'Ahmet',
    description: 'Kullanıcının adı',
  })
  @IsString({ message: MESAJLAR.AUTH.AD_GEREKLI })
  @MinLength(2, { message: MESAJLAR.VALIDASYON.MIN_UZUNLUK('Ad', 2) })
  @MaxLength(50, { message: MESAJLAR.VALIDASYON.MAX_UZUNLUK('Ad', 50) })
  ad: string;

  @ApiProperty({
    example: 'Yılmaz',
    description: 'Kullanıcının soyadı',
  })
  @IsString({ message: MESAJLAR.AUTH.SOYAD_GEREKLI })
  @MinLength(2, { message: MESAJLAR.VALIDASYON.MIN_UZUNLUK('Soyad', 2) })
  @MaxLength(50, { message: MESAJLAR.VALIDASYON.MAX_UZUNLUK('Soyad', 50) })
  soyad: string;

  @ApiProperty({
    example: '05551234567',
    description: 'Kullanıcının telefon numarası (opsiyonel)',
    required: false,
  })
  @IsOptional()
  @Matches(/^(05)([0-9]{9})$/, { message: MESAJLAR.AUTH.TELEFON_GECERSIZ })
  telefon?: string;

  @ApiProperty({
    example: KullaniciRolu.VATANDAS,
    enum: KullaniciRolu,
    description: 'Kullanıcı rolü',
    default: KullaniciRolu.VATANDAS,
  })
  @IsOptional()
  @IsEnum(KullaniciRolu)
  rol?: KullaniciRolu;

  @ApiProperty({
    example: 'ABC Market',
    description: 'İşletme adı (ESNAF veya KOBİ için gerekli)',
    required: false,
  })
  @IsOptional()
  @IsString()
  @MaxLength(100, { message: MESAJLAR.VALIDASYON.MAX_UZUNLUK('İşletme adı', 100) })
  isletmeAdi?: string;

  @ApiProperty({
    example: '1234567890',
    description: 'Vergi numarası (ESNAF veya KOBİ için)',
    required: false,
  })
  @IsOptional()
  @Matches(/^[0-9]{10}$/, { message: 'Vergi numarası 10 haneli olmalıdır.' })
  vergiNumarasi?: string;
}
