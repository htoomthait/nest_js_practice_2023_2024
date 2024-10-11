import { Module } from '@nestjs/common';
import { CarBrandController } from './car_brand.controller';
import { CarBrandService } from './car_brand.service';

@Module({
  controllers: [CarBrandController],
  providers: [CarBrandService]
})
export class CarBrandModule {}
