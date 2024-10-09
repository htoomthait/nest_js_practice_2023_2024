import { Module } from '@nestjs/common';
import { RacingCarController } from './racing_car.controller';
import { RacingCarService } from './racing_car.service';
import { JsonDummyDataService } from './json_dummy_data.service';
import { GenericApiResponseDto } from 'src/dto/generic_api_response.dto';

@Module({
  controllers: [RacingCarController],
  providers: [RacingCarService, JsonDummyDataService, GenericApiResponseDto]
})
export class RacingCarModule { }
