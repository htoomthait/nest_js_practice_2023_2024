import { Test, TestingModule } from '@nestjs/testing';
import { RacingCarService } from './racing_car.service';
import { PrismaService } from '../prisma/prisma.service';
import { JsonDummyDataService } from './json_dummy_data.service';

describe('RacingCarService', () => {
  let service: RacingCarService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [RacingCarService, PrismaService, JsonDummyDataService],
    }).compile();

    service = module.get<RacingCarService>(RacingCarService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
