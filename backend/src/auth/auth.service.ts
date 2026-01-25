import { Injectable, ConflictException, UnauthorizedException, Logger } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import * as bcrypt from 'bcryptjs';
import { DatabaseService } from '../database/database.service';
import { KayitOlDto, GirisYapDto } from './dto';
import { MESAJLAR } from '../common/constants/mesajlar';

@Injectable()
export class AuthService {
  private readonly logger = new Logger(AuthService.name);

  constructor(
    private db: DatabaseService,
    private jwtService: JwtService,
    private configService: ConfigService,
  ) {}

  async kayitOl(dto: KayitOlDto) {
    this.logger.log(`Kayıt: ${dto.email}`);
    
    return this.db.transaction(async (client) => {
      const existing = await client.query('SELECT id FROM users WHERE email = $1', [dto.email]);
      if (existing.rows.length > 0) throw new ConflictException(MESAJLAR.AUTH.HESAP_ZATEN_MEVCUT);

      const passwordHash = await bcrypt.hash(dto.sifre, 12);
      const result = await client.query(
        `INSERT INTO users (id, email, "passwordHash", "firstName", "lastName", phone, role, status, "kvkkConsent", "kvkkConsentDate", "createdAt", "updatedAt")
         VALUES (gen_random_uuid()::text, $1, $2, $3, $4, $5, $6, 'ACTIVE', true, NOW(), NOW(), NOW())
         RETURNING id, email, "firstName", "lastName", phone, role`,
        [dto.email, passwordHash, dto.ad, dto.soyad, dto.telefon || null, dto.rol || 'VATANDAS']
      );

      const user = result.rows[0];
      const tokens = await this.tokenOlustur(user.id, user.email);

      await client.query(
        `INSERT INTO sessions (id, "userId", "accessToken", "refreshToken", "ipAddress", "userAgent", "expiresAt", "createdAt")
         VALUES (gen_random_uuid()::text, $1, $2, $3, 'system', 'system', $4, NOW())`,
        [user.id, tokens.accessToken, tokens.refreshToken, new Date(Date.now() + 7 * 24 * 60 * 60 * 1000)]
      );

      return {
        mesaj: MESAJLAR.AUTH.KAYIT_BASARILI,
        kullanici: { id: user.id, email: user.email, ad: user.firstName, soyad: user.lastName, telefon: user.phone, rol: user.role },
        ...tokens
      };
    });
  }

  async girisYap(dto: GirisYapDto) {
    this.logger.log(`Giriş: ${dto.email}`);
    
    const result = await this.db.query(
      `SELECT id, email, "passwordHash", "firstName", "lastName", phone, role, status FROM users WHERE email = $1`,
      [dto.email]
    );

    if (result.rows.length === 0) throw new UnauthorizedException(MESAJLAR.AUTH.KULLANICI_BULUNAMADI);
    
    const user = result.rows[0];
    if (user.status !== 'ACTIVE') throw new UnauthorizedException(MESAJLAR.AUTH.HESAP_ASKIYA_ALINMIS);
    
    const valid = await bcrypt.compare(dto.sifre, user.passwordHash);
    if (!valid) throw new UnauthorizedException(MESAJLAR.AUTH.YANLIS_SIFRE);

    const tokens = await this.tokenOlustur(user.id, user.email);

    await this.db.transaction(async (client) => {
      await client.query(
        `INSERT INTO sessions (id, "userId", "accessToken", "refreshToken", "ipAddress", "userAgent", "expiresAt", "createdAt")
         VALUES (gen_random_uuid()::text, $1, $2, $3, 'system', 'system', $4, NOW())`,
        [user.id, tokens.accessToken, tokens.refreshToken, new Date(Date.now() + 7 * 24 * 60 * 60 * 1000)]
      );
      await client.query('UPDATE users SET "lastLoginAt" = NOW() WHERE id = $1', [user.id]);
    });

    return {
      mesaj: MESAJLAR.AUTH.GIRIS_BASARILI,
      kullanici: { id: user.id, email: user.email, ad: user.firstName, soyad: user.lastName, telefon: user.phone, rol: user.role },
      ...tokens
    };
  }

  async tokenYenile(refreshToken: string) {
    try {
      const payload = this.jwtService.verify(refreshToken, { secret: this.configService.get('JWT_REFRESH_SECRET') });
      const result = await this.db.query(
        `SELECT s."userId", u.email, u.status FROM sessions s INNER JOIN users u ON s."userId" = u.id WHERE s."refreshToken" = $1`,
        [refreshToken]
      );

      if (result.rows.length === 0) throw new UnauthorizedException(MESAJLAR.AUTH.TOKEN_GECERSIZ);
      
      const session = result.rows[0];
      if (session.status !== 'ACTIVE') throw new UnauthorizedException(MESAJLAR.AUTH.HESAP_ASKIYA_ALINMIS);

      const tokens = await this.tokenOlustur(session.userId, session.email);
      await this.db.query(
        'UPDATE sessions SET "accessToken" = $1, "refreshToken" = $2 WHERE "userId" = $3 AND "refreshToken" = $4',
        [tokens.accessToken, tokens.refreshToken, session.userId, refreshToken]
      );

      return { mesaj: MESAJLAR.AUTH.TOKEN_YENILENDI, ...tokens };
    } catch (error) {
      throw new UnauthorizedException(MESAJLAR.AUTH.TOKEN_GECERSIZ);
    }
  }

  async cikisYap(kullaniciId: string) {
    await this.db.query('DELETE FROM sessions WHERE "userId" = $1', [kullaniciId]);
    return { mesaj: MESAJLAR.AUTH.CIKIS_BASARILI };
  }

  async kullaniciBilgisiAl(kullaniciId: string) {
    const result = await this.db.query(
      `SELECT id, email, "firstName", "lastName", phone, role, "createdAt" FROM users WHERE id = $1`,
      [kullaniciId]
    );

    if (result.rows.length === 0) throw new UnauthorizedException(MESAJLAR.AUTH.KULLANICI_BULUNAMADI);
    
    const user = result.rows[0];
    return {
      kullanici: {
        id: user.id,
        email: user.email,
        ad: user.firstName,
        soyad: user.lastName,
        telefon: user.phone,
        rol: user.role,
        kayitTarihi: user.createdAt
      }
    };
  }

  private async tokenOlustur(kullaniciId: string, email: string) {
    const payload = { sub: kullaniciId, email };
    const [accessToken, refreshToken] = await Promise.all([
      this.jwtService.signAsync(payload, {
        secret: this.configService.get('JWT_ACCESS_SECRET'),
        expiresIn: this.configService.get('JWT_ACCESS_EXPIRATION')
      }),
      this.jwtService.signAsync(payload, {
        secret: this.configService.get('JWT_REFRESH_SECRET'),
        expiresIn: this.configService.get('JWT_REFRESH_EXPIRATION')
      })
    ]);
    return { accessToken, refreshToken };
  }
}
