import { ForbiddenException, Injectable } from '@nestjs/common';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';
import { PrismaService } from 'src/prisma/prisma.service';
import { AuthSignUpDto, AuthSignInDto } from './dto';
import { Tokens } from './types';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import * as argon from 'argon2';
import { Logger } from '@nestjs/common';
import { hashData, updateRtHash, getTokens } from 'src/common/helpers';

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
    const hash = hashData(authSignUpDto.password);
    delete authSignUpDto.password;

    Logger.debug(`Hash: ${hash}`, 'signupLocal@authService');

    // Create New User
    const newUser = await this._prismaService.user
      .create({
        // Create User data
        data: {
          ...authSignUpDto,
          phone: Number(authSignUpDto.phone),
          hash: hash,
        },
      })
      .catch((error) => {
        // Check if Error is PrismaClientKnownRequestError
        if (error instanceof PrismaClientKnownRequestError) {
          if (error.code === 'P2002') {
            throw new ForbiddenException('Credentials incorrect');
          }
        }
        throw error;
      });

    // Get Tokens if New User is Created
    if (newUser) {
      returnValue = await getTokens(
        this._jwtService,
        this._configService,
        newUser.id,
        newUser.email,
      );
      // update refresh token hash in db
      await updateRtHash(
        this._prismaService,
        newUser.id,
        returnValue.refresh_token,
      );
    } else {
      returnValue.access_token = '';
      returnValue.refresh_token = '';
    }

    return returnValue;
  }

  public async signinLocal(authSignInDto: AuthSignInDto): Promise<Tokens> {
    let returnValue: Tokens;
    const hash = hashData(authSignInDto.password);

    // Find Uuser
    const authUser = await this._prismaService.user.findFirst({
      where: {
        email: authSignInDto.email,
        hash: hash,
      },
    });

    // Rengenrate Tokens if User is Found
    if (authUser) {
      returnValue = await getTokens(
        this._jwtService,
        this._configService,
        authUser.id,
        authUser.email,
      );

      // update refresh token hash in db
      await updateRtHash(
        this._prismaService,
        authUser.id,
        returnValue.refresh_token,
      );
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
    const returnValue = await getTokens(
      this._jwtService,
      this._configService,
      authUser.id,
      authUser.email,
    );

    return returnValue;
  }
}
