import { Controller, Get, HttpCode, HttpStatus, Logger, Param, Post, Res } from '@nestjs/common';
import { RacingCarService } from './racing_car.service';
import { GenericApiResponseDto } from 'src/dto/generic_api_response.dto';
import { Response } from 'express';

@Controller('racing-car')
export class RacingCarController {

    private fmtResp: GenericApiResponseDto;
    private readonly logger = new Logger(RacingCarController.name);

    constructor(private racingCarservice: RacingCarService,) { }

    @Get('list')
    @HttpCode(200)
    getRacingCarList(@Res() res: Response) {
        const carList = this.racingCarservice.getCarList();
        this.logger.log("this is racing list api called");
        this.logger.debug(carList);


        this.fmtResp = {
            status: "success",
            message: "successfuly queried car list",
            data: carList
        };


        return res.status(HttpStatus.ACCEPTED).send(this.fmtResp);
    }

    @Post('record-new')
    createNewRecord() {
        return "you have created new record";
    }

    @Get('get-by-id/:id')
    getRecordById(@Param('id') id: number) {
        return `here is requested record ${id}`;
    }


}
