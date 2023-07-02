import { Controller, Get, Param, Session } from '@nestjs/common';
import { SessionData } from 'express-session';
import { EmployeeDataService } from './employee-data.service';

@Controller('employee-data')
export class EmployeeDataController {
  constructor(private employeeDataService: EmployeeDataService) {}

  @Get('all')
  getAllEmployees() {
    return this.employeeDataService.getAllEmployees();
  }

  @Get()
  getManagedEmployees(@Session() session: SessionData) {
    return this.employeeDataService.getManagedEmployees(session.user.userId);
  }

  @Get('employee/:employeeId')
  getEmployeeById(@Param('employeeId') employeeId: number) {
    return this.employeeDataService.getEmployeeById(employeeId);
  }

  @Get('sector/:sector')
  getEmployeesBySector(
    @Param('sector') sector: string,
    @Session() session: SessionData,
  ) {
    return this.employeeDataService.getEmployeesBySector(session.user.userId, session.user.role[0]  sector);
  }
}
