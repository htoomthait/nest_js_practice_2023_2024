import { Module } from '@nestjs/common';
import { RacingCarController } from './racing_car.controller';
import { RacingCarService } from './racing_car.service';
import { JsonDummyDataService } from './json_dummy_data.service';

@Module({
  controllers: [RacingCarController],
  providers: [RacingCarService, JsonDummyDataService]
})
export class RacingCarModule { }
