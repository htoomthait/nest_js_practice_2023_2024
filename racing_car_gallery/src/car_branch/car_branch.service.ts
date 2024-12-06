import { Injectable, Logger } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { ResponseForController, RespUtilityService } from '../utility/resp-utility.service';

@Injectable()
export class CarBranchService {
    private logger = new Logger(CarBranchService.name);

    constructor(
        private prisma: PrismaService,
        private respUtilityService: RespUtilityService
    ) {

        this.logger.debug(prisma);
    }
}
