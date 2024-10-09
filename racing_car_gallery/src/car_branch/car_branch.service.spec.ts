import { Test, TestingModule } from '@nestjs/testing';
import { CarBranchService } from './car_branch.service';

describe('CarBranchService', () => {
  let service: CarBranchService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CarBranchService],
    }).compile();

    service = module.get<CarBranchService>(CarBranchService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
