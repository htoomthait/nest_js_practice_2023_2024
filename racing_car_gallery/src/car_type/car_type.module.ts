import { Module } from '@nestjs/common';
import { CarTypeService } from './car_type.service';
import { CarTypeController } from './car_type.controller';
import { PrismaModule } from 'src/prisma/prisma.module';
import { GenericApiResponseDto } from 'src/dto/generic_api_response.dto';
import { RespUtilityService } from 'src/utility/resp-utility.service';

@Module({
  imports: [PrismaModule],
  providers: [CarTypeService, GenericApiResponseDto, RespUtilityService],
  controllers: [CarTypeController],

})
export class CarTypeModule { }
