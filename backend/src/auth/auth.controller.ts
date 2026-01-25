import {
  Controller,
  Post,
  Body,
  Get,
  UseGuards,
  Req,
  HttpCode,
  HttpStatus,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { KayitOlDto, GirisYapDto } from './dto';
import { JwtAuthGuard } from './guards/jwt-auth.guard';
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth } from '@nestjs/swagger';

@ApiTags('Kimlik Doğrulama')
@Controller('v1/auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('kayit-ol')
  @ApiOperation({
    summary: 'Yeni kullanıcı kaydı',
    description: 'Sisteme yeni kullanıcı kaydı oluşturur',
  })
  async kayitOl(@Body() dto: KayitOlDto) {
    return this.authService.kayitOl(dto);
  }

  @Post('giris-yap')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({
    summary: 'Kullanıcı girişi',
    description: 'E-posta ve şifre ile sisteme giriş yapar',
  })
  async girisYap(@Body() dto: GirisYapDto) {
    return this.authService.girisYap(dto);
  }

  @Post('cikis-yap')
  @HttpCode(HttpStatus.OK)
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Kullanıcı çıkışı' })
  async cikisYap(@Req() req: any) {
    return this.authService.cikisYap(req.user.kullaniciId);
  }

  @Post('token-yenile')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Access token yenileme' })
  async tokenYenile(@Body('refreshToken') refreshToken: string) {
    return this.authService.tokenYenile(refreshToken);
  }

  @Get('profil')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Kullanıcı profili' })
  async profil(@Req() req: any) {
    return this.authService.kullaniciBilgisiAl(req.user.kullaniciId);
  }
}
