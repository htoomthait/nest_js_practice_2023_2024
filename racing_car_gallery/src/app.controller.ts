import { Controller, Get, Logger } from '@nestjs/common';
import { AppService } from './app.service';
import ShortUniqueId from 'short-unique-id';
import { GenericApiResponseDto } from './dto/generic_api_response.dto';
import * as moment from 'moment-timezone';

@Controller()
export class AppController {

  private readonly logger: Logger = new Logger(AppController.name);
  constructor(private readonly appService: AppService, private fmtResp: GenericApiResponseDto) { }

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }


  @Get('get-short-uuid')
  getShortUuid() {
    const uid = new ShortUniqueId({ length: 10 });
    const shortUuid: string = uid.rnd();
    const created_at = moment().tz("Asia/Yangon").format();

    this.fmtResp.status = "success";
    this.fmtResp.message = "successfully generated";
    this.fmtResp.data = { shortUuid: shortUuid, generated_at: created_at };
    this.logger.verbose(this.fmtResp.data);


    return this.fmtResp;


  }




}
