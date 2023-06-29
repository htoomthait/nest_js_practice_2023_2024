import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthSignUpDto, AuthSignInDto } from './dto';
import { Tokens } from './types';

@Controller('auth')
export class AuthController {
  private _authService: AuthService;

  constructor(private authService: AuthService) {
    this._authService = authService;
  }
  @Post('/loca/signup')
  public async signupLocal(
    @Body() authSignUpDto: AuthSignUpDto,
  ): Promise<Tokens> {
    return await this._authService.signupLocal(authSignUpDto);
  }

  @Post('/loca/signin')
  public async signinLocal(@Body() authSignInDto: AuthSignInDto) {
    return await this._authService.signinLocal(authSignInDto);
  }

  @Post('/logout')
  public logout() {
    return this._authService.logout();
  }

  @Post('/refresh')
  public refreshTokens() {
    return this._authService.refreshTokens();
  }
}
