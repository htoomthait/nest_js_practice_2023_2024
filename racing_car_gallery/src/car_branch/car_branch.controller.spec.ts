import { Test, TestingModule } from '@nestjs/testing';
import { CarBranchController } from './car_branch.controller';

describe('CarBranchController', () => {
  let controller: CarBranchController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CarBranchController],
    }).compile();

    controller = module.get<CarBranchController>(CarBranchController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
