import { Module } from '@nestjs/common';
import { RespUtilityService } from './resp-utility.service';
import { GenericApiResponseDto } from 'src/dto/generic_api_response.dto';

@Module({
  providers: [RespUtilityService, GenericApiResponseDto]
})
export class UtilityModule { }
