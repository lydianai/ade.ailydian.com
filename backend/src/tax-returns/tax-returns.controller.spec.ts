import { Test, TestingModule } from '@nestjs/testing';
import { TaxReturnsController } from './tax-returns.controller';

describe('TaxReturnsController', () => {
  let controller: TaxReturnsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TaxReturnsController],
    }).compile();

    controller = module.get<TaxReturnsController>(TaxReturnsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
