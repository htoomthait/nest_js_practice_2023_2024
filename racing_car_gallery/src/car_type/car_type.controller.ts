import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Logger, Param, Patch, Post, Res } from '@nestjs/common';
import { CarTypeService } from './car_type.service';
import { GenericApiResponseDto } from 'src/dto/generic_api_response.dto';
import { Response } from 'express';

@Controller('car-type')
export class CarTypeController {

    private logger = new Logger(CarTypeController.name);
    constructor(private carTypeService: CarTypeService, private fmtResp: GenericApiResponseDto) { }


    @Get("/list")
    async getAllCarType(@Res() res: Response) {
        const respData = await this.carTypeService.getCarTypes();

        return res.status(respData.httpStatus).send(respData.fmtResp);
    }

    @Get("/get-by-id/:id")
    async getCarTypeById(@Param("id") id: string, @Res() res: Response) {
        this.logger.debug(id);

        const respData = await this.carTypeService.getDbCarTypeById(parseInt(id));

        return res.status(respData.httpStatus).send(respData.fmtResp);
    }

    @Post("/create-new")
    async createNewCartype(@Body() newRecord: any, @Res() res: Response) {

        const respData = await this.carTypeService.createNewCarType(newRecord);

        return res.status(respData.httpStatus).send(respData.fmtResp);
    }



    @Delete("/delete-by-id/:id")
    async deleteCarType(@Param("id") id: string, @Res() res: Response) {
        const respData = await this.carTypeService.deleteCarTypeById(parseInt(id));

        return res.status(respData.httpStatus).send(respData.fmtResp);
    }

    @Patch("/update-by-id/:id")
    async updateCarTypeById(
        @Body() updatedCarType: any,
        @Param("id") id: string,
        @Res() res: Response) {
        const respData = await this.carTypeService.updateCarTypeById(
            updatedCarType,
            parseInt(id)
        );

        return res.status(respData.httpStatus).send(respData.fmtResp);

    }




}
