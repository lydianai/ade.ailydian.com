import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { DatabaseService } from '../../database/database.service';
import { MESAJLAR } from '../../common/constants/mesajlar';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy, 'jwt') {
  constructor(private prisma: DatabaseService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: process.env.JWT_ACCESS_SECRET,
    });
  }

  async validate(payload: { sub: string; email: string }) {
    const result = await this.prisma.query(
      `SELECT id, email, role, status FROM users WHERE id = $1`,
      [payload.sub]
    );

    if (result.rows.length === 0) {
      throw new UnauthorizedException(MESAJLAR.AUTH.KULLANICI_BULUNAMADI);
    }

    const kullanici = result.rows[0];

    if (kullanici.status === 'SUSPENDED') {
      throw new UnauthorizedException(MESAJLAR.AUTH.HESAP_ASKIYA_ALINMIS);
    }

    // Request nesnesine kullanıcı bilgisini ekle
    return {
      kullaniciId: kullanici.id,
      email: kullanici.email,
      rol: kullanici.role,
    };
  }
}
