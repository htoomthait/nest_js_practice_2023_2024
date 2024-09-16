import { Module } from '@nestjs/common';
import { UtilityService } from './utility.service';
import { GenericApiResponseDto } from 'src/dto/generic_api_response.dto';

@Module({
  providers: [UtilityService, GenericApiResponseDto]
})
export class UtilityModule { }
