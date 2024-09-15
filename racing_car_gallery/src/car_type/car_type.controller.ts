import { Controller, Get } from '@nestjs/common';
import { CarTypeService } from './car_type.service';

@Controller('car-type')
export class CarTypeController {

    constructor(private carTypeService: CarTypeService) { }

    @Get("/list")
    async getAllCarType() {
        return await this.carTypeService.getCarTypes();
    }
}
