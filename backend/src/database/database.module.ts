import { Module, Global } from '@nestjs/common';
import { DatabaseService } from './database.service';
import { PrismaService } from './prisma.service';

/**
 * Global Database Module
 * Provides both raw SQL (DatabaseService) and Prisma ORM (PrismaService)
 */
@Global()
@Module({
  providers: [DatabaseService, PrismaService],
  exports: [DatabaseService, PrismaService],
})
export class DatabaseModule {}
