import { Controller, Delete, Get, Logger, Param, Patch, Post, Res } from '@nestjs/common';
import { CarBrandService } from './car_brand.service';
import { Response } from 'express';
import { GenericApiResponseDto } from 'src/dto/generic_api_response.dto';

@Controller('car-brand')
export class CarBrandController {

    private logger = new Logger(CarBrandController.name);
    constructor(private carBrandService: CarBrandService) { }


    @Get('list')
    async getAllCarBrand(@Res() res: Response): Promise<Response<Record<string, GenericApiResponseDto>>> {
        const resp = await this.carBrandService.getAllCarBrand();
        return res.status(resp.httpStatus).send(resp.fmtResp);
    }

    @Get('get-by-id/:id')
    async getCarById(@Param("id") id: string, @Res() res: Response): Promise<Response<Record<string, GenericApiResponseDto>>> {
        const resp = await this.carBrandService.getCarBrandById(parseInt(id));
        return res.status(resp.httpStatus).send(resp.fmtResp);
    }

    @Post("create-new")
    async createCarBrand(@Res() res: Response): Promise<Response<Record<string, GenericApiResponseDto>>> {
        return res.status(200).send("This is car brand creation");
    }

    @Delete("delete-by-id/:id")
    async deleteCarBrandByid(@Res() res: Response) {
        return res.status(200).send("This is car brand deletion");
    }

    @Patch("update-by-id/:id")
    async updateCarBrandById(@Res() res: Response) {
        return res.status(200).send("This is car brand update");
    }

}
