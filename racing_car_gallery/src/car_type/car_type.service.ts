import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class CarTypeService {

    constructor(private prisma: PrismaService) { }

    async getCarTypes() {
        return this.prisma.carType.findMany();
    }
}
