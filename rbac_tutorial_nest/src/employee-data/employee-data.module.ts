import { Module } from '@nestjs/common';
import { EmployeeDataController } from './employee-data.controller';
import { EmployeeDataService } from './employee-data.service';

@Module({
  controllers: [EmployeeDataController],
  providers: [EmployeeDataService],
})
export class EmployeeDataModule {}
