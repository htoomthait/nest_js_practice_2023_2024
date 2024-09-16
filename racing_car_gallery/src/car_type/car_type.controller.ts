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
        const carTypes = await this.carTypeService.getCarTypes();

        this.fmtResp.status = "succees";
        this.fmtResp.message = "successfuly query car types";
        this.fmtResp.data = carTypes;

        return res.status(HttpStatus.OK).send(this.fmtResp);
    }

    @Get("/get-by-id/:id")
    async getCarTypeById(@Param("id") id: string, @Res() res: Response) {
        this.logger.debug(id);

        const carType = await this.carTypeService.getDbCarTypeById(parseInt(id));
        this.logger.debug(carType);

        this.fmtResp.status = "succees";
        this.fmtResp.message = "successfuly query car types";
        this.fmtResp.data = carType;

        return res.status(HttpStatus.OK).send(this.fmtResp);
    }

    @Post("/create-new")
    async createNewCartype(@Body() newRecord: any, @Res() res: Response) {

        const createdNewCarType = await this.carTypeService.createNewCarType(newRecord);

        this.fmtResp.status = "succees";
        this.fmtResp.message = "successfuly created car types";
        this.fmtResp.data = createdNewCarType;

        return res.status(HttpStatus.OK).send(this.fmtResp);
    }



    @Delete("/delete-by-id/:id")
    async deleteCarType(@Param("id") id: string, @Res() res: Response) {
        this.carTypeService.deleteCarTypeById(parseInt(id));

        this.fmtResp.status = "succees";
        this.fmtResp.message = "successfuly created car types";
        this.fmtResp.data = `Successfully deleted car type with id ${id}`;

        return res.status(HttpStatus.OK).send(this.fmtResp);
    }

    @Patch("/update-by-id/:id")
    async updateCarTypeById(
        @Body() updatedCarType: any,
        @Param("id") id: string,
        @Res() res: Response) {
        const dbUpdatedCarType = await this.carTypeService.updateCarTypeById(
            updatedCarType,
            parseInt(id)
        );

        this.fmtResp.status = "succees";
        this.fmtResp.message = "successfuly created car types";
        this.fmtResp.data = dbUpdatedCarType;

        return res.status(HttpStatus.OK).send(this.fmtResp);

    }




}
