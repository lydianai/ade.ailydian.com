import { Module } from '@nestjs/common';
import { TaxReturnsController } from './tax-returns.controller';
import { TaxReturnsService } from './tax-returns.service';
import { TaxCalculatorService } from './tax-calculator.service';
import { DatabaseModule } from '../database/database.module';

@Module({
  imports: [DatabaseModule],
  controllers: [TaxReturnsController],
  providers: [TaxReturnsService, TaxCalculatorService],
  exports: [TaxReturnsService, TaxCalculatorService],
})
export class TaxReturnsModule {}
