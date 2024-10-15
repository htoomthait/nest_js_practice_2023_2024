import { Controller, Delete, Get, Logger, Param, Patch, Post, Req, Res, UploadedFile, UseInterceptors } from '@nestjs/common';
import { CarBrandService } from './car_brand.service';
import { Request, Response } from 'express';
import { GenericApiResponseDto } from 'src/dto/generic_api_response.dto';
import { CarBrandLogoImgFileInterceptor } from './car_brand_logo_img.interceptor';


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
    @UseInterceptors(CarBrandLogoImgFileInterceptor())
    async createCarBrand(
        @UploadedFile() logo_img: Express.Multer.File,
        @Req() req: Request,
        @Res() res: Response
    ): Promise<Response<Record<string, GenericApiResponseDto>>> {

        console.log(logo_img);
        const fileUrl = `${req.protocol}://${req.get('host')}/uploads/car_brand_img/${logo_img.filename}`;
        console.log(fileUrl);

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
