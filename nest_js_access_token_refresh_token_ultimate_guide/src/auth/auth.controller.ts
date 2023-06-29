import { Body, Controller, Post, HttpCode, HttpStatus } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthSignUpDto, AuthSignInDto } from './dto';
import { Tokens } from './types';
import { Public, GetCurrentUserId } from '../common/decorators';

@Controller('auth')
export class AuthController {
  private _authService: AuthService;

  constructor(private authService: AuthService) {
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
  @Post('/logout')
  @HttpCode(HttpStatus.OK)
  logout(@GetCurrentUserId() userId: number): Promise<boolean> {
    return this._authService.logout(userId);
  }

  @Public()
  @Post('/refresh')
  @HttpCode(HttpStatus.OK)
  refreshTokens(
    @GetCurrentUserId() userId: number,
    @Body() rt: string,
  ): Promise<Tokens> {
    return this._authService.refreshTokens(userId, rt);
  }
}
