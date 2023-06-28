import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { AuthDto } from './dto';

@Injectable()
export class AuthService {
  private _prismaService: PrismaService;

  constructor(private prismaService: PrismaService) {
    this._prismaService = prismaService;
  }

  public signupLocal(authDto: AuthDto) {
    return 'This is signupLocal';
  }

  public signinLocal() {
    return 'This is signinLocal';
  }

  public logout() {
    return 'This is logout';
  }

  public refreshTokens() {
    return 'This is refreshTokens';
  }
}
