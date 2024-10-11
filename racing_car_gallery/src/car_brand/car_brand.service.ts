import { Injectable, Logger } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { ResponseForController, RespUtilityService } from 'src/utility/resp-utility.service';

@Injectable()
export class CarBrandService {
    private logger = new Logger(CarBrandService.name);

    constructor(
        private prisma: PrismaClient,
        private respUtilityService: RespUtilityService
    ) { }

    /**
     * To get the all car brand from database with prisma
     * @author Htoo Maung Thait 
     * @since 2024-10-11
     * @return responseForController Promise<ResponseForController> 
     *
    */
    async getAllCarBrand(): Promise<ResponseForController> {
        let carBrands;

        try {

            carBrands = await this.prisma.carBrand.findMany();


        } catch (error) {
            this.logger.error(error);
            return this.respUtilityService.respWithDefaultDatabaseError();
        }

        return this.respUtilityService
            .setStatus("success")
            .setMessage("successfully query the car brands")
            .setData(carBrands)
            .composeResponse();
    }

    /**
     * To find the car brand with given ID
     * @author Htoo Maung Thait
     * @since 2024-10-11
     * @param id number
     * @returns responseForController Promise<ResponseForController>
     */
    async getCarBrandById(id: number): Promise<ResponseForController> {
        let carBrand;
        try {
            carBrand = await this.prisma.carBrand.findFirst({
                where: { id: id }
            });
        } catch (error) {
            this.logger.error(error);
            return this.respUtilityService.respWithDefaultDatabaseError();
        }

        if (!carBrand) {
            return this.respUtilityService
                .setMessage(`Car brand not found with provided id ${id}`)
                .respDefaultNotFound();
        }
        else {
            return this.respUtilityService
                .setStatus("success")
                .setMessage(`successfully query the car brand with id of ${id}`)
                .setData(carBrand)
                .composeResponse();
        }


    }

}
