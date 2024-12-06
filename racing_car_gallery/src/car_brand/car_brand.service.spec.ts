import { Test, TestingModule } from '@nestjs/testing';
import { CarBrandService } from './car_brand.service';
import { PrismaService } from '../prisma/prisma.service';
import { RespUtilityService } from '../utility/resp-utility.service';

describe('CarBrandService', () => {
  let service: CarBrandService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CarBrandService, PrismaService, {
        provide: RespUtilityService,
        useValue: {
          handleResponse: jest.fn(), // Mock method for RespUtilityService
        },
      }],
    }).compile();

    service = module.get<CarBrandService>(CarBrandService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
