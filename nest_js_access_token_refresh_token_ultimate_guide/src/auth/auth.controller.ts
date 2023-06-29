import {
  Body,
  Controller,
  Post,
  HttpCode,
  HttpStatus,
  UseGuards,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthSignUpDto, AuthSignInDto } from './dto';
import { Tokens } from './types';
import { Public, GetCurrentUserId } from '../common/decorators';
import { AuthGuard } from '@nestjs/passport';

@Controller('auth')
export class AuthController {
  private _authService: AuthService;

  constructor(authService: AuthService) {
    this._authService = authService;
  }
  @Public()
  @Post('/local/signup')
  @HttpCode(HttpStatus.CREATED)
  signupLocal(@Body() authSignUpDto: AuthSignUpDto): Promise<Tokens> {
    return this._authService.signupLocal(authSignUpDto);
  }

  @Public()
  @Post('/local/signin')
  @HttpCode(HttpStatus.OK)
  signinLocal(@Body() authSignInDto: AuthSignInDto) {
    return this._authService.signinLocal(authSignInDto);
  }

  @Public()
  @UseGuards(AuthGuard('jwt'))
  @Post('/logout')
  @HttpCode(HttpStatus.OK)
  logout(@GetCurrentUserId() userId: number): Promise<boolean> {
    return this._authService.logout(userId);
  }

  @Public()
  @UseGuards(AuthGuard('jwt-refresh'))
  @Post('/refresh')
  @HttpCode(HttpStatus.OK)
  refreshTokens(
    @GetCurrentUserId() userId: number,
    @Body() payload,
  ): Promise<Tokens> {
    return this._authService.refreshTokens(userId, payload.rt);
  }
}
