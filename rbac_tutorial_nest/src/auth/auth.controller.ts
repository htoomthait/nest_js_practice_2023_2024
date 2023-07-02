import {
  Controller,
  Post,
  Req,
  Session,
  HttpStatus,
  HttpCode,
} from '@nestjs/common';
import { SessionData } from 'express-session';
import { Request } from 'express';

@Controller('auth')
export class AuthController {
  @HttpCode(HttpStatus.OK)
  @Post('/login')
  login(@Req() req: Request, @Session() session: SessionData) {
    session.user = {
      userId: req.user.userId,
      username: req.user.username,
      roles: req.user.roles,
    };

    return req.user;
  }

  @HttpCode(HttpStatus.NO_CONTENT)
  @Post('/logout')
  logout(@Req() req: Request) {
    return new Promise((resolve, reject) => {
      req.session.destroy((err) => {
        if (err) reject(err);
        resolve({
          status: 204,
          message: 'Session destroyed!',
        });
      });
    });
  }
}
