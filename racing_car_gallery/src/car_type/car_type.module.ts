import { Module } from '@nestjs/common';
import { CarTypeService } from './car_type.service';
import { CarTypeController } from './car_type.controller';
import { PrismaModule } from 'src/prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  providers: [CarTypeService],
  controllers: [CarTypeController],

})
export class CarTypeModule { }
