import { Test, TestingModule } from '@nestjs/testing';
import { CarBrandController } from './car_brand.controller';
import { CarBrandService } from './car_brand.service';
import { GenericApiResponseDto } from '../dto/generic_api_response.dto';
import { RespUtilityService } from '../utility/resp-utility.service';
import { PrismaService } from '../prisma/prisma.service';


describe('CarBrandController', () => {
  let controller: CarBrandController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CarBrandController],
      providers: [CarBrandService, GenericApiResponseDto, RespUtilityService, PrismaService]
    }).compile();

    controller = module.get<CarBrandController>(CarBrandController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
