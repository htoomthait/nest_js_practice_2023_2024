import { Test, TestingModule } from '@nestjs/testing';
import { PrismaService } from '../prisma/prisma.service';
import { RespUtilityService } from '../utility/resp-utility.service';
import { CarBranchService } from './car_branch.service';

describe('CarBranchService', () => {
  let service: CarBranchService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CarBranchService,
        PrismaService,
        {
          provide: RespUtilityService,
          useValue: {
            handleResponse: jest.fn(), // Mock method for RespUtilityService
          },
        },
      ],
    }).compile();

    service = module.get<CarBranchService>(CarBranchService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});

