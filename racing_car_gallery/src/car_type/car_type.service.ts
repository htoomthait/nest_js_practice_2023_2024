import { Injectable, Logger } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class CarTypeService {

    private logger = new Logger(CarTypeService.name);
    constructor(private prisma: PrismaService) { }

    async getCarTypes() {
        return await this.prisma.carType.findMany();
    }

    async getDbCarTypeById(id: number) {
        return await this.prisma.carType.findUnique({
            where: { id: id }
        });
    }

    async createNewCarType(newCarType: any) {
        const createdCarType = await this.prisma.carType.create({
            data: newCarType
        });

        return createdCarType;


    }

    async deleteCarTypeById(id: number) {


        try {
            await this.prisma.carType.delete({
                where: { id: id }
            });
        } catch (error) {

            this.logger.error(`#dete_car_type_by_id ${error}`)
        }

        return true;
    }

    async updateCarTypeById(updatedCarType: any, id: number) {
        const dbUpdatedCarType = await this.prisma.carType.update({
            where: { id: id },
            data: { ...updatedCarType }
        })

        return dbUpdatedCarType;


    }
}