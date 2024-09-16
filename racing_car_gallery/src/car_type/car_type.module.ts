import { Module } from '@nestjs/common';
import { CarTypeService } from './car_type.service';
import { CarTypeController } from './car_type.controller';
import { PrismaModule } from 'src/prisma/prisma.module';
import { GenericApiResponseDto } from 'src/dto/generic_api_response.dto';

@Module({
  imports: [PrismaModule],
  providers: [CarTypeService, GenericApiResponseDto],
  controllers: [CarTypeController],

})
export class CarTypeModule { }
