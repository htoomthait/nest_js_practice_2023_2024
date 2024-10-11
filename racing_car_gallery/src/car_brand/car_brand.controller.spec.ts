import { Test, TestingModule } from '@nestjs/testing';
import { CarBrandController } from './car_brand.controller';

describe('CarBrandController', () => {
  let controller: CarBrandController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CarBrandController],
    }).compile();

    controller = module.get<CarBrandController>(CarBrandController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
