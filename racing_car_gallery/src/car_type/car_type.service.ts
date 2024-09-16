import { HttpStatus, Injectable, Logger } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { UtilityService } from 'src/utility/utility.service';

@Injectable()
export class CarTypeService {

    private logger = new Logger(CarTypeService.name);
    constructor(private prisma: PrismaService, private uitlityService: UtilityService) { }

    async getCarTypes() {
        let carTypes;

        try {

            carTypes = await this.prisma.carType.findMany();

        } catch (error) {
            this.logger.error(error);
            return this.uitlityService.respWithDefaultDatabaseError();
        }

        return this.uitlityService.composeResponse(
            "success",
            "Successfuly query the car types",
            carTypes,
            HttpStatus.OK
        );
    }

    async getDbCarTypeById(id: number) {
        let carType;

        try {
            carType = await this.prisma.carType.findUnique({
                where: { id: id }
            });
        } catch (error) {
            this.logger.error(error);
            return this.uitlityService.respWithDefaultDatabaseError();
        }


        if (!carType) {
            return this.uitlityService.composeResponse(
                "not found",
                `Car type not found with provided id ${id}`,
                null,
                HttpStatus.OK
            );
        }
        else {
            return this.uitlityService.composeResponse(
                "success",
                "Successfuly query the car type",
                carType,
                HttpStatus.OK
            );
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
            return this.uitlityService.respWithDefaultDatabaseError();
        }

        return this.uitlityService.composeResponse(
            "success",
            "Successfuly query the car type",
            createdCarType,
            HttpStatus.OK
        );


    }

    async deleteCarTypeById(id: number) {

        let checkRecord;
        try {
            checkRecord = await this.prisma.carType.count({
                where: { id: id }
            });
        } catch (error) {
            this.logger.error(error);
            this.uitlityService.respWithDefaultDatabaseError();
        }

        if (checkRecord == 0) {
            return this.uitlityService.composeResponse(
                "not found",
                `Car type not found by provided id ${id}`,
                null,
                HttpStatus.NOT_FOUND
            );
        }

        try {
            await this.prisma.carType.delete({
                where: { id: id }
            });
        } catch (error) {

            this.logger.error(`#dete_car_type_by_id ${error}`);
            return this.uitlityService.respWithDefaultDatabaseError();

        }

        return this.uitlityService.composeResponse(
            "success",
            `Car type with id ${id} is deleted successfully!`,
            null,
            HttpStatus.OK
        );
    }

    async updateCarTypeById(updatedCarType: any, id: number) {
        let checkRecord;
        try {
            checkRecord = await this.prisma.carType.count({
                where: { id: id }
            });
        } catch (error) {
            this.logger.error(error);
            this.uitlityService.respWithDefaultDatabaseError();
        }

        if (checkRecord == 0) {
            return this.uitlityService.composeResponse(
                "not found",
                `Car type not found by provided id ${id}`,
                null,
                HttpStatus.NOT_FOUND
            );
        }

        let dbUpdatedCarType;

        try {
            dbUpdatedCarType = await this.prisma.carType.update({
                where: { id: id },
                data: { ...updatedCarType }
            })
        } catch (error) {
            this.logger.error(error);
            return this.uitlityService.respWithDefaultDatabaseError();
        }

        return this.uitlityService.composeResponse(
            "success",
            `Car type with id ${id} is updated successfully!`,
            updatedCarType,
            HttpStatus.OK
        );


    }
}