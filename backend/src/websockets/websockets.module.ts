import { Module } from '@nestjs/common'
import { JwtModule } from '@nestjs/jwt'
import { ConfigModule, ConfigService } from '@nestjs/config'
import { WebSocketsGateway } from './websockets.gateway'
import { WebSocketsService } from './websockets.service'

@Module({
  imports: [
    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => ({
        secret: configService.get<string>('JWT_SECRET') || 'ADE_JWT_SECRET_2026_CHANGE_IN_PRODUCTION',
        signOptions: { expiresIn: '15m' },
      }),
    }),
  ],
  providers: [WebSocketsGateway, WebSocketsService],
  exports: [WebSocketsGateway, WebSocketsService],
})
export class WebSocketsModule {}
