import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsString, MinLength } from 'class-validator';
import { MESAJLAR } from '../../common/constants/mesajlar';

export class GirisYapDto {
  @ApiProperty({
    example: 'ahmet@example.com',
    description: 'Kullanıcının e-posta adresi',
  })
  @IsEmail({}, { message: MESAJLAR.AUTH.EMAIL_GECERSIZ })
  email: string;

  @ApiProperty({
    example: 'Güçlü123!',
    description: 'Kullanıcının şifresi',
  })
  @IsString({ message: MESAJLAR.AUTH.SIFRE_GEREKLI })
  @MinLength(1, { message: MESAJLAR.AUTH.SIFRE_GEREKLI })
  sifre: string;
}
