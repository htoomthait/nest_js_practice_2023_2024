import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { AuthSignUpDto, AuthSignInDto } from './dto';
import * as bcrypt from 'bcrypt';
import { Tokens } from './types';

@Injectable()
export class AuthService {
  private _prismaService: PrismaService;

  constructor(private prismaService: PrismaService) {
    this._prismaService = prismaService;
  }

  private hashData(data: string) {
    return bcrypt.hash(data, 10);
  }

  public async signupLocal(authSignUpDto: AuthSignUpDto): Promise<Tokens> {
    let returnValue: Tokens;
    const hash = this.hashData(authSignUpDto.password);

    const newUser = await this._prismaService.user.create({
      data: {
        ...authSignUpDto,
        phone: Number(authSignUpDto.phone),
        hash: hash,
      },
    });

    returnValue.access_token = '';
    returnValue.refresh_token = '';

    return returnValue;
  }

  public async signinLocal(authSignInDto: AuthSignInDto) {
    return `here is token ${authSignInDto.email}`;
  }

  public async logout() {
    return 'it will logout soon';
  }

  public async refreshTokens() {
    return 'it will refresh tokens soon';
  }
}
