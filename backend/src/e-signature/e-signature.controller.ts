import {
  Controller,
  Post,
  Get,
  Body,
  Query,
  UseGuards,
  Request,
  BadRequestException,
} from '@nestjs/common'
import { ApiTags, ApiOperation, ApiBearerAuth } from '@nestjs/swagger'
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard'
import { ESignatureService, ESignatureProvider } from './e-signature.service'

@ApiTags('E-Signature')
@ApiBearerAuth()
@Controller('v1/e-signature')
@UseGuards(JwtAuthGuard)
export class ESignatureController {
  constructor(private readonly eSignatureService: ESignatureService) {}

  @Post('sign/pdf')
  @ApiOperation({ summary: 'Sign PDF document with e-Signature' })
  async signPDF(
    @Request() req,
    @Body()
    body: {
      pdfData: string // base64 encoded
      provider?: ESignatureProvider
    },
  ) {
    try {
      const pdfBuffer = Buffer.from(body.pdfData, 'base64')
      const provider = body.provider || ESignatureProvider.TURKTRUST

      const result = await this.eSignatureService.signPDF(
        pdfBuffer,
        req.user.sub,
        `${req.user.firstName} ${req.user.lastName}`,
        provider,
      )

      return {
        success: result.success,
        signatureId: result.signatureId,
        timestamp: result.timestamp,
        signedData: result.signedData?.toString('base64'),
        certificateInfo: result.certificateInfo,
        error: result.error,
      }
    } catch (error) {
      throw new BadRequestException(error.message)
    }
  }

  @Post('sign/xml')
  @ApiOperation({ summary: 'Sign XML document (e-Fatura) with e-Signature' })
  async signXML(
    @Request() req,
    @Body()
    body: {
      xmlData: string
      provider?: ESignatureProvider
    },
  ) {
    try {
      const provider = body.provider || ESignatureProvider.TURKTRUST

      const result = await this.eSignatureService.signXML(
        body.xmlData,
        req.user.sub,
        `${req.user.firstName} ${req.user.lastName}`,
        provider,
      )

      return {
        success: result.success,
        signatureId: result.signatureId,
        timestamp: result.timestamp,
        signedData: result.signedData?.toString('utf-8'),
        certificateInfo: result.certificateInfo,
        error: result.error,
      }
    } catch (error) {
      throw new BadRequestException(error.message)
    }
  }

  @Post('verify')
  @ApiOperation({ summary: 'Verify e-Signature' })
  async verifySignature(
    @Body()
    body: {
      signedData: string // base64 encoded
      provider?: ESignatureProvider
    },
  ) {
    try {
      const signedBuffer = Buffer.from(body.signedData, 'base64')
      const provider = body.provider || ESignatureProvider.TURKTRUST

      const result = await this.eSignatureService.verifySignature(signedBuffer, provider)

      return result
    } catch (error) {
      throw new BadRequestException(error.message)
    }
  }

  @Get('certificate')
  @ApiOperation({ summary: 'Get certificate information for user' })
  async getCertificate(@Request() req, @Query('provider') provider?: string) {
    try {
      const eProvider = (provider as ESignatureProvider) || ESignatureProvider.TURKTRUST

      const result = await this.eSignatureService.getCertificateInfo(req.user.sub, eProvider)

      return result
    } catch (error) {
      throw new BadRequestException(error.message)
    }
  }

  @Get('certificate/validate')
  @ApiOperation({ summary: 'Validate certificate for user' })
  async validateCertificate(@Request() req, @Query('provider') provider?: string) {
    try {
      const eProvider = (provider as ESignatureProvider) || ESignatureProvider.TURKTRUST

      const isValid = await this.eSignatureService.isCertificateValid(req.user.sub, eProvider)

      return {
        valid: isValid,
        provider: eProvider,
        userId: req.user.sub,
      }
    } catch (error) {
      throw new BadRequestException(error.message)
    }
  }

  @Get('providers')
  @ApiOperation({ summary: 'Get supported e-Signature providers' })
  getSupportedProviders() {
    return {
      providers: this.eSignatureService.getSupportedProviders(),
      status: this.eSignatureService.getProviderStatus(),
    }
  }

  @Get('status')
  @ApiOperation({ summary: 'Get e-Signature service status' })
  getStatus() {
    const providerStatus = this.eSignatureService.getProviderStatus()

    return {
      service: 'E-Signature Service',
      version: '1.0.0',
      active: true,
      providers: providerStatus,
      capabilities: [
        'PDF Signing',
        'XML Signing (e-Fatura)',
        'Signature Verification',
        'Certificate Validation',
        'Multi-Provider Support',
      ],
    }
  }
}
