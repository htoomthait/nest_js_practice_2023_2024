import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { RacingCarModule } from './racing_car/racing_car.module';
import { CarTypeModule } from './car_type/car_type.module';
import { CarBrandModule } from './car_brand/car_brand.module';
import { CarBranchService } from './car_branch/car_branch.service';
import { CarBranchController } from './car_branch/car_branch.controller';

@Module({
  imports: [RacingCarModule, CarTypeModule, CarBrandModule],
  controllers: [AppController, CarBranchController],
  providers: [AppService, CarBranchService],
})
export class AppModule {}
