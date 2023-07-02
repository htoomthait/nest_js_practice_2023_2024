import { Controller, Get, Session, Post, Body } from '@nestjs/common';
import { UserService } from './user.service';
import { SessionData } from 'express-session';

@Controller('user')
export class UserController {
  constructor(private userService: UserService) {}

  @Get('me')
  getMe(@Session() session: SessionData) {
    return this.userService.getMe(session.user.userId);
  }

  @Post('promote')
  promoteUserToManager(@Body() employeeId: number) {
    return this.userService.promoteUserToManager(employeeId);
  }

  @Post('demote')
  demnoteManagerToEmployee(@Body() managerId: number) {
    return this.userService.demoteManagerToEmployee(managerId);
  }
}
