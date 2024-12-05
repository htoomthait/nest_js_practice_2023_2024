import { Test, TestingModule } from '@nestjs/testing';
import { RacingCarController } from './racing_car.controller';
import { RacingCarService } from './racing_car.service';
import { GenericApiResponseDto } from '../dto/generic_api_response.dto';
import { RespUtilityService } from '../utility/resp-utility.service';
import { PrismaService } from '../prisma/prisma.service';
import { JsonDummyDataService } from './json_dummy_data.service';

describe('RacingCarController', () => {
  let controller: RacingCarController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [RacingCarController],
      providers: [RacingCarService, GenericApiResponseDto, RespUtilityService, PrismaService, JsonDummyDataService]
    }).compile();

    controller = module.get<RacingCarController>(RacingCarController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
