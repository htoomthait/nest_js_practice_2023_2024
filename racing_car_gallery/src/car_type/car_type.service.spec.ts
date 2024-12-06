import { Test, TestingModule } from '@nestjs/testing';
import { CarTypeService } from './car_type.service';
import { PrismaService } from '../prisma/prisma.service';
import { JsonDummyDataService } from '../racing_car/json_dummy_data.service';
import { RespUtilityService } from '../utility/resp-utility.service';

describe('CarTypeService', () => {
  let service: CarTypeService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CarTypeService, PrismaService, JsonDummyDataService,
        {
          provide: RespUtilityService,
          useValue: {
            handleResponse: jest.fn(), // Mock method for RespUtilityService
          },
        }
      ],
    }).compile();

    service = module.get<CarTypeService>(CarTypeService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
