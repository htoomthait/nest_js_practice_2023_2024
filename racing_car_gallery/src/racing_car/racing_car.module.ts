import { Module } from '@nestjs/common';
import { RacingCarController } from './racing_car.controller';
import { RacingCarService } from './racing_car.service';

@Module({
  controllers: [RacingCarController],
  providers: [RacingCarService]
})
export class RacingCarModule {}
