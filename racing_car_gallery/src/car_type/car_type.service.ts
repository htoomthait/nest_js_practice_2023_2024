import { HttpStatus, Injectable, Logger } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { RespUtilityService } from 'src/utility/resp-utility.service';

@Injectable()
export class CarTypeService {

    private logger = new Logger(CarTypeService.name);
    constructor(private prisma: PrismaService, private respUtilityService: RespUtilityService) { }

    async getCarTypes() {
        let carTypes;

        try {

            carTypes = await this.prisma.carType.findMany();

        } catch (error) {
            this.logger.error(error);
            return this.respUtilityService.respWithDefaultDatabaseError();
        }

        return this.respUtilityService
            .setStatus("success")
            .setMessage("Successfuly query the car types")
            .setData(carTypes)
            .composeResponse();
    }

    async getDbCarTypeById(id: number) {
        let carType;

        try {
            carType = await this.prisma.carType.findUnique({
                where: { id: id }
            });
        } catch (error) {
            this.logger.error(error);
            return this.respUtilityService.respWithDefaultDatabaseError();
        }


        if (!carType) {
            return this.respUtilityService
                .setMessage(`Car type not found with provided id ${id}`)
                .respDefaultNotFound();
        }
        else {
            return this.respUtilityService
                .setStatus("success")
                .setMessage("Successfully query the car type")
                .setData(carType)
                .composeResponse();
        }
    }

    async createNewCarType(newCarType: any) {
        let createdCarType

        try {
            createdCarType = await this.prisma.carType.create({
                data: newCarType
            });
        } catch (error) {
            this.logger.error(error);
            return this.respUtilityService.respWithDefaultDatabaseError();
        }

        return this.respUtilityService
            .setStatus("success")
            .setMessage("Successfuly query the car type")
            .setData(createdCarType)
            .setHttpStatus(HttpStatus.CREATED)
            .composeResponse();


    }

    async deleteCarTypeById(id: number) {

        let checkRecord;
        try {
            checkRecord = await this.prisma.carType.count({
                where: { id: id }
            });
        } catch (error) {
            this.logger.error(error);
            this.respUtilityService.respWithDefaultDatabaseError();
        }

        if (checkRecord == 0) {
            return this.respUtilityService
                .setMessage(`Car type not found by provided id ${id}`)
                .respDefaultNotFound();
        }

        try {
            await this.prisma.carType.delete({
                where: { id: id }
            });
        } catch (error) {

            this.logger.error(`#dete_car_type_by_id ${error}`);
            return this.respUtilityService.respWithDefaultDatabaseError();

        }

        return this.respUtilityService
            .setStatus("success")
            .setMessage(`Car type with id ${id} is deleted successfully!`)
            .composeResponse();
    }

    async updateCarTypeById(updatedCarType: any, id: number) {
        let checkRecord;
        try {
            checkRecord = await this.prisma.carType.count({
                where: { id: id }
            });
        } catch (error) {
            this.logger.error(error);
            this.respUtilityService.respWithDefaultDatabaseError();
        }

        if (checkRecord == 0) {
            return this.respUtilityService
                .setMessage(`Car type not found by provided id ${id}`)
                .respDefaultNotFound();

        }

        let dbUpdatedCarType;

        try {
            dbUpdatedCarType = await this.prisma.carType.update({
                where: { id: id },
                data: { ...updatedCarType }
            })
        } catch (error) {
            this.logger.error(error);

            return this.respUtilityService.respWithDefaultDatabaseError();
        }

        return this.respUtilityService
            .setStatus("success")
            .setMessage(`Car type with id ${id} is updated successfully!`)
            .setData(dbUpdatedCarType)
            .setHttpStatus(HttpStatus.OK)
            .composeResponse();




    }



}