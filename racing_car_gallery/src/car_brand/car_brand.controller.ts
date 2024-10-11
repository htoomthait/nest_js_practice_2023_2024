import { Controller, Delete, Get, Logger, Param, Patch, Post, Res } from '@nestjs/common';
import { CarBrandService } from './car_brand.service';
import { Response } from 'express';
import { GenericApiResponseDto } from 'src/dto/generic_api_response.dto';

@Controller('car-brand')
export class CarBrandController {

    private logger = new Logger(CarBrandController.name);
    constructor(private carBrandService: CarBrandService) { }


    /**
     * A controller method to response all car brand data  stored at database using service layer
     * @authro Htoo Maung Thait (htoomaungthait@gmail.com)
     * @since 2024-10-12
     * @returns genericApiResponse 
     */
    @Get('list')
    async getAllCarBrand(
        @Res() res: Response
    ): Promise<Response<Record<string, GenericApiResponseDto>>> {

        // Call and get from service
        const resp = await this.carBrandService.getAllCarBrand();

        // Response with custom httpstatus and formatted data
        return res.status(resp.httpStatus).send(resp.fmtResp);
    }

    /**
     * A controller method to response all car brand data by requested ID  stored at database using service layer
     * @authro Htoo Maung Thait (htoomaungthait@gmail.com)
     * @since 2024-10-12
     * @returns genericApiResponse 
     */
    @Get('get-by-id/:id')
    async getCarById(
        @Param("id") id: string,
        @Res() res: Response
    ): Promise<Response<Record<string, GenericApiResponseDto>>> {

        // Call and get from service
        const resp = await this.carBrandService.getCarBrandById(parseInt(id));

        // Response with custom httpstatus and formatted data
        return res.status(resp.httpStatus).send(resp.fmtResp);
    }

    @Post("create-new")
    async createCarBrand(
        @Res() res: Response
    ): Promise<Response<Record<string, GenericApiResponseDto>>> {

        // Response with custom httpstatus and formatted data
        return res.status(200).send("This is car brand creation");
    }

    @Delete("delete-by-id/:id")
    async deleteCarBrandByid(
        @Res() res: Response
    ): Promise<Response<Record<string, GenericApiResponseDto>>> {

        // Response with custom httpstatus and formatted data
        return res.status(200).send("This is car brand deletion");
    }

    @Patch("update-by-id/:id")
    async updateCarBrandById(
        @Res() res: Response
    ): Promise<Response<Record<string, GenericApiResponseDto>>> {

        // Response with custom httpstatus and formatted data
        return res.status(200).send("This is car brand update");
    }

}
