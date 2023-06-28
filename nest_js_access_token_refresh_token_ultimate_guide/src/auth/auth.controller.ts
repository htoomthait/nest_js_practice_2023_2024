import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthDto } from './dto';

@Controller('auth')
export class AuthController {
  private _authService: AuthService;

  constructor(private authService: AuthService) {
    this._authService = authService;
  }
  @Post('/loca/signup')
  public signupLocal(@Body() authDto: AuthDto) {
    return this._authService.signupLocal(authDto);
  }

  @Post('/loca/signin')
  public signinLocal() {
    return this._authService.signinLocal();
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
