import { Test, TestingModule } from '@nestjs/testing';
import { TaxReturnsService } from './tax-returns.service';

describe('TaxReturnsService', () => {
  let service: TaxReturnsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [TaxReturnsService],
    }).compile();

    service = module.get<TaxReturnsService>(TaxReturnsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
