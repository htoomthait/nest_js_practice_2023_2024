import { Body, Controller, Delete, Get, Logger, Param, Patch, Post } from '@nestjs/common';
import { CarTypeService } from './car_type.service';

@Controller('car-type')
export class CarTypeController {

    private logger = new Logger(CarTypeController.name);
    constructor(private carTypeService: CarTypeService) { }


    @Get("/list")
    async getAllCarType() {
        return await this.carTypeService.getCarTypes();
    }

    @Get("/get-by-id/:id")
    async getCarTypeById(@Param("id") id: string) {
        this.logger.log(id);
        return await this.carTypeService.getDbCarTypeById(parseInt(id));
    }

    @Post("/create-new")
    async createNewCartype(@Body() newRecord: any) {

    }



    @Delete("/delete-by-id/:id")
    async deleteCarType(@Param("id") id: string) {

    }

    @Patch("/update_by-id/:id")
    async updateCarTypeById(@Body() updatedCarType: any, @Param("id") id: number) {

    }




}
