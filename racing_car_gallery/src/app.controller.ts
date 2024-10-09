import { Controller, Get, Logger } from '@nestjs/common';
import { AppService } from './app.service';
import ShortUniqueId from 'short-unique-id';
import { GenericApiResponseDto } from './dto/generic_api_response.dto';
import * as moment from 'moment-timezone';
import { QueueService } from './queue/queue.service';

@Controller()
export class AppController {

  private readonly logger: Logger = new Logger(AppController.name);
  constructor(
    private readonly appService: AppService,
    private fmtResp: GenericApiResponseDto,
    private readonly queueService: QueueService) { }

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

  @Get('add-job')
  async addJob() {
    const data = { message: 'Hello, NestJS Queue!' };
    await this.queueService.addJob(data);
    return 'Job added!';
  }

  @Get('add-job-2')
  async addJob2() {
    const max = 10;
    const min = 1;
    const randNan = Math.floor(Math.random() * (max - min + 1)) + min;


    // console.log(data.data);




    await this.queueService.addJob2(randNan);
    return { status: 'OK', message: 'Job 2 added with 2 second delay' };
  }


  @Get('add-multiple-jobs')
  async addMultipleJobs() {
    for (let i = 1; i <= 30; i++) {
      // const data = { jobId: i, message: `Job #${i}` };
      const data = i;

      await this.queueService.addJob2(data);
    }
    return 'Multiple jobs added!';
  }






}
