import { NestFactory } from '@nestjs/core';
import { ValidationPipe, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { AppModule } from './app.module';
import helmet from 'helmet';

/**
 * Production-Ready Bootstrap Configuration
 * - Security headers (Helmet)
 * - CORS configuration
 * - Global validation pipe
 * - Request logging
 */
async function bootstrap() {
  const logger = new Logger('Bootstrap');

  // Create NestJS application
  const app = await NestFactory.create(AppModule, {
    logger: ['error', 'warn', 'log', 'debug', 'verbose'],
  });

  const configService = app.get(ConfigService);
  const port = configService.get('PORT') || 3000;
  const nodeEnv = configService.get('NODE_ENV') || 'development';

  // ============================================
  // SECURITY CONFIGURATION
  // ============================================

  // Security headers with Helmet
  app.use(helmet({
    contentSecurityPolicy: nodeEnv === 'production' ? undefined : false,
    crossOriginEmbedderPolicy: false,
  }));

  // CORS configuration
  app.enableCors({
    origin: configService.get('CORS_ORIGIN')?.split(',') || [
      'http://localhost:5173',
      'http://localhost:3000',
      'http://localhost:3501',
    ],
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With'],
  });

  // ============================================
  // VALIDATION & TRANSFORMATION
  // ============================================

  // Global validation pipe
  app.useGlobalPipes(
    new ValidationPipe({
      // Strip properties not in DTO
      whitelist: true,

      // Throw error if non-whitelisted properties exist
      forbidNonWhitelisted: true,

      // Automatically transform payloads to DTO instances
      transform: true,

      // Transform primitive types
      transformOptions: {
        enableImplicitConversion: true,
      },

      // Show detailed error messages
      disableErrorMessages: nodeEnv === 'production',
    }),
  );

  // ============================================
  // GLOBAL PREFIX
  // ============================================

  // API prefix for all routes (e.g., /api/auth/login)
  app.setGlobalPrefix('api', {
    exclude: ['health', '/'], // Exclude health check and root
  });

  // ============================================
  // SWAGGER API DOCUMENTATION
  // ============================================

  const swaggerConfig = new DocumentBuilder()
    .setTitle('ADE Backend API')
    .setDescription(`
      Comprehensive Accounting & Tax Management System API

      **Features:**
      - 🔐 JWT Authentication & Authorization
      - 📊 Dashboard with Real-time Statistics
      - 👥 Customer Management (Corporate & Individual)
      - 🧾 Invoice Management (E-Fatura & E-Arşiv)
      - 💰 Payment Processing
      - 📋 Tax Returns (KDV, Gelir Vergisi, Stopaj, Damga, Kurumlar)

      **Security:**
      - Bearer Token Authentication required for all endpoints (except auth)
      - Rate limiting enabled
      - CORS configured for specific origins

      **Base URL:** \`${nodeEnv === 'production' ? 'https://api.yourdomain.com' : `http://localhost:${port}`}/api\`
    `)
    .setVersion('1.0.0')
    .setContact(
      'ADE Support',
      'https://github.com/yourusername/ade',
      '[email protected]'
    )
    .setLicense('MIT', 'https://opensource.org/licenses/MIT')
    .addBearerAuth(
      {
        type: 'http',
        scheme: 'bearer',
        bearerFormat: 'JWT',
        name: 'Authorization',
        description: 'Enter JWT token',
        in: 'header',
      },
      'access-token',
    )
    .addTag('Auth', 'Authentication endpoints - Register, Login, Profile')
    .addTag('Dashboard', 'Dashboard statistics and analytics')
    .addTag('Customers', 'Customer management - Corporate & Individual clients')
    .addTag('Invoices', 'Invoice management - E-Fatura & E-Arşiv')
    .addTag('Payments', 'Payment processing and tracking')
    .addTag('Tax Returns', 'Tax return management - KDV, Gelir Vergisi, Stopaj, etc.')
    .addTag('Documents', 'Document management - Upload, download, and organize files')
    .addServer(`http://localhost:${port}`, 'Local Development')
    .addServer('https://api-staging.yourdomain.com', 'Staging')
    .addServer('https://api.yourdomain.com', 'Production')
    .build();

  const document = SwaggerModule.createDocument(app, swaggerConfig);
  SwaggerModule.setup('api/docs', app, document, {
    customSiteTitle: 'ADE API Documentation',
    customfavIcon: 'https://nestjs.com/img/logo_text.svg',
    customCss: `
      .swagger-ui .topbar { display: none }
      .swagger-ui .info .title { color: #e0234e }
    `,
    swaggerOptions: {
      persistAuthorization: true,
      displayRequestDuration: true,
      filter: true,
      showExtensions: true,
      showCommonExtensions: true,
      defaultModelsExpandDepth: 3,
      defaultModelExpandDepth: 3,
      docExpansion: 'list',
      tagsSorter: 'alpha',
      operationsSorter: 'alpha',
    },
  });

  // ============================================
  // START SERVER
  // ============================================

  await app.listen(port, '0.0.0.0');

  logger.log(`🚀 ADE Backend API running on http://0.0.0.0:${port}/api`);
  logger.log(`📝 Environment: ${nodeEnv}`);
  logger.log(`🔒 Security: Helmet enabled, CORS configured`);
  logger.log(`✅ Validation: Global validation pipe active`);
  logger.log(`📚 API Docs: http://0.0.0.0:${port}/api/docs`);
}

bootstrap();
