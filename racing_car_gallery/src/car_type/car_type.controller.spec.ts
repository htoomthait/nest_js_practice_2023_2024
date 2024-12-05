import { Test, TestingModule } from '@nestjs/testing';
import { CarTypeController } from './car_type.controller';
import { CarTypeService } from './car_type.service';
import { GenericApiResponseDto } from '../dto/generic_api_response.dto';
import { RespUtilityService } from '../utility/resp-utility.service';

import { PrismaService } from '../prisma/prisma.service';

describe('CarTypeController', () => {
  let controller: CarTypeController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [],
      providers: [CarTypeService, GenericApiResponseDto, RespUtilityService, PrismaService],
      controllers: [CarTypeController]
    }).compile();

    controller = module.get<CarTypeController>(CarTypeController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
