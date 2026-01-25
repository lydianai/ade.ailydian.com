import { Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'
import { ESignatureService } from './e-signature.service'
import { ESignatureController } from './e-signature.controller'

@Module({
  imports: [ConfigModule],
  controllers: [ESignatureController],
  providers: [ESignatureService],
  exports: [ESignatureService],
})
export class ESignatureModule {}
