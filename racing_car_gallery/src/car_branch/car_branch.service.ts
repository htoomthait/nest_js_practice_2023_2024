import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { ResponseForController, RespUtilityService } from '../utility/resp-utility.service';

@Injectable()
export class CarBranchService {

    constructor(
        private prisma: PrismaService,
        private respUtilityService: RespUtilityService
    ) { }
}
