import { Module } from '@nestjs/common';
import { CarBrandController } from './car_brand.controller';
import { CarBrandService } from './car_brand.service';
import { PrismaModule } from 'src/prisma/prisma.module';
import { RespUtilityService } from 'src/utility/resp-utility.service';
import { GenericApiResponseDto } from 'src/dto/generic_api_response.dto';

@Module({
  imports: [PrismaModule],
  providers: [CarBrandService, GenericApiResponseDto, RespUtilityService],
  controllers: [CarBrandController],

})
export class CarBrandModule { }
