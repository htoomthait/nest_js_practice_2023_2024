import { ForbiddenException, Injectable } from '@nestjs/common';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime';
import { PrismaService } from 'src/prisma/prisma.service';
import { AuthSignUpDto, AuthSignInDto } from './dto';
import * as bcrypt from 'bcrypt';
import { Tokens } from './types';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import * as argon from 'argon2';
import { Logger } from '@nestjs/common';

@Injectable()
export class AuthService {
  private _prismaService: PrismaService;
  private _jwtService: JwtService;
  private _configService: ConfigService;

  constructor(
    prismaService: PrismaService,
    jwtService: JwtService,
    configService: ConfigService,
  ) {
    this._prismaService = prismaService;
    this._jwtService = jwtService;
    this._configService = configService;
  }

  public async signupLocal(authSignUpDto: AuthSignUpDto): Promise<Tokens> {
    let returnValue: Tokens;
    const hash = await this.hashData(authSignUpDto.password);
    delete authSignUpDto.password;

    Logger.debug(`Hash: ${hash}`, 'signupLocal@authService');

    // Create New User
    const newUser = await this._prismaService.user
      .create({
        data: {
          ...authSignUpDto,
          phone: Number(authSignUpDto.phone),
          hash: hash,
        },
      })
      .catch((error) => {
        if (error instanceof PrismaClientKnownRequestError) {
          if (error.code === 'P2002') {
            throw new ForbiddenException('Credentials incorrect');
          }
        }
        throw error;
      });
    // Get Tokens if New User is Created
    if (newUser) {
      returnValue = await this.getTokens(newUser.id, newUser.email);
      // update refresh token hash in db
      await this.updateRtHash(newUser.id, returnValue.refresh_token);
    } else {
      returnValue.access_token = '';
      returnValue.refresh_token = '';
    }

    return returnValue;
  }

  public async signinLocal(authSignInDto: AuthSignInDto): Promise<Tokens> {
    let returnValue: Tokens;
    const hash = this.hashData(authSignInDto.password);

    // Find Uuser
    const authUser = await this._prismaService.user.findFirst({
      where: {
        email: authSignInDto.email,
        hash: hash,
      },
    });

    // Rengenrate Tokens if User is Found
    if (authUser) {
      returnValue = await this.getTokens(authUser.id, authUser.email);

      // update refresh token hash in db
      await this.updateRtHash(authUser.id, returnValue.refresh_token);
    } else {
      throw new ForbiddenException('Invalid Credentials');
    }

    return returnValue;
  }

  public async logout(userId: number): Promise<boolean> {
    const result = await this._prismaService.user.updateMany({
      where: {
        id: userId,
      },
      data: {
        hashedRt: null,
      },
    });

    return result ? true : false;
  }

  public async refreshTokens(userId: number, rt: string): Promise<Tokens> {
    const authUser = await this._prismaService.user.findUnique({
      where: {
        id: userId,
      },
    });

    if (!authUser || !authUser.hashedRt) {
      throw new ForbiddenException('Access Denied');
    }

    // verify refresh token
    const rtMatches = await argon.verify(authUser.hashedRt, rt);
    if (!rtMatches) throw new ForbiddenException('Access Denied');

    // update refresh token hash in db
    const returnValue = await this.getTokens(authUser.id, authUser.email);

    return returnValue;
  }

  private async updateRtHash(userId: number, hashedRt: string) {
    return await this._prismaService.user.update({
      where: {
        id: userId,
      },
      data: {
        hashedRt: hashedRt,
      },
    });
  }

  private hashData(data: string) {
    return bcrypt.hash(data, 10);
  }

  private async getTokens(userId: number, email: string): Promise<Tokens> {
    const [at, rt] = await Promise.all([
      this._jwtService.signAsync(
        {
          sub: userId,
          email,
        },
        {
          secret: this._configService.get<string>('jwt.accessTokenSecret'),
          expiresIn: 60 * 15,
        },
      ),
      this._jwtService.signAsync(
        {
          sub: userId,
          email,
        },
        {
          secret: this._configService.get<string>('jwt.refreshTokenSecret'),
          expiresIn: 60 * 60 * 24 * 7,
        },
      ),
    ]);

    return { access_token: at, refresh_token: rt } as Tokens;
  }
}
