import { Module } from '@nestjs/common';
import { CarTypeService } from './car_type.service';
import { CarTypeController } from './car_type.controller';

@Module({
  providers: [CarTypeService],
  controllers: [CarTypeController]
})
export class CarTypeModule {}
