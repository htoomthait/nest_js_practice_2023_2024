import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Logger, Param, Post, Put, Res } from '@nestjs/common';
import { RacingCarService } from './racing_car.service';
import { GenericApiResponseDto } from 'src/dto/generic_api_response.dto';
import { Response } from 'express';
import ShortUniqueId from 'short-unique-id';
import * as moment from 'moment';

@Controller('racing-car')
export class RacingCarController {


    private readonly logger = new Logger(RacingCarController.name);
    private uid = new ShortUniqueId({ length: 10 });



    constructor(private racingCarservice: RacingCarService, private fmtResp: GenericApiResponseDto) { }


    @Get('list')
    @HttpCode(200)
    async getRacingCarList(@Res() res: Response) {
        const carList = await this.racingCarservice.getCarList();
        // this.logger.log("this is racing list api called");
        // this.logger.debug(carList);


        this.fmtResp = {
            status: "success",
            message: "successfuly queried car list",
            data: carList
        };


        return res.status(HttpStatus.ACCEPTED).send(this.fmtResp);
    }

    @Post('record-new')
    createNewRecord(@Body() newRecord: any, @Res() res: Response) {
        const shortUuid: string = this.uid.rnd();

        newRecord.id = shortUuid;
        newRecord.created_at = moment().tz("Asia/Yangon").format();
        newRecord.updated_at = moment().tz("Asia/Yangon").format();


        this.racingCarservice.addNewRecord(newRecord);
        this.fmtResp = {
            status: "success",
            message: "successfuly recorded new car",
            data: newRecord
        }

        return res.status(HttpStatus.ACCEPTED).send(this.fmtResp);

    }

    @Get('get-by-id/:id')
    async getRecordById(@Param('id') id: number, @Res() res: Response) {
        const searchedCarById = await this.racingCarservice.getCarById(id);
        // this.logger.debug(searchedCarById);
        this.fmtResp = {
            status: "success",
            message: "successfuly queried car list",
            data: searchedCarById
        };

        return res.status(HttpStatus.ACCEPTED).send(this.fmtResp);
    }

    @Delete('delete-by-id/:id')
    async deleteRecordById(@Param('id') id: number, @Res() res: Response) {

        this.racingCarservice.deleteRecordById(id);

        this.fmtResp = {
            status: "success",
            message: `successfuly delete car with id ${id} from list`,
            data: null
        };

        return res.status(HttpStatus.ACCEPTED).send(this.fmtResp);
    }

    @Put('update-by-id/:id')
    async updateRecordById(
        @Body() updatedRecord: any,
        @Param('id') id: number,
        @Res() res: Response
    ) {
        updatedRecord.updated_at = moment().tz("Asia/Yangon").format();
        const fullUpdatedRecord = await this.racingCarservice.updatedRecordById(updatedRecord, id);


        this.fmtResp = {
            status: "success",
            message: `successfully updated with ${id} from list`,
            data: fullUpdatedRecord
        };

        return res.status(HttpStatus.ACCEPTED).send(this.fmtResp);
    }



}
