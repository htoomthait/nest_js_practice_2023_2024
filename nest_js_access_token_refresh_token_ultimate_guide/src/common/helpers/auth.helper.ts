import * as bcrypt from 'bcrypt';
import { PrismaService } from 'src/prisma/prisma.service';
import { Tokens } from 'src/auth/types';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import * as moment from 'moment';

export const compareHashData = async (
  data: string,
  hashedData: string,
): Promise<boolean> => {
  return await bcrypt.compare(data, hashedData);
};

export const hashData = (data: string): string => {
  return bcrypt.hash(data, 10);
};

export const updateRtHash = async (
  prismaService: PrismaService,
  userId: number,
  hashedRt: string,
) => {
  return await prismaService.user.update({
    where: {
      id: userId,
    },
    data: {
      hashedRt: hashedRt,
    },
  });
};

export const getTokens = async (
  jwtService: JwtService,
  configService: ConfigService,
  userId: number,
  email: string,
): Promise<Tokens> => {
  const [at, at_expire, rt, rt_expire] = await Promise.all([
    jwtService.signAsync(
      {
        sub: userId,
        email,
      },
      {
        secret: configService.get<string>('jwt.accessTokenSecret'),
        expiresIn: 60 * 15,
      },
    ),
    moment().add(15, 'minutes').unix(),
    jwtService.signAsync(
      {
        sub: userId,
        email,
      },
      {
        secret: configService.get<string>('jwt.refreshTokenSecret'),
        expiresIn: 60 * 60 * 24 * 7,
      },
    ),
    moment().add(7, 'days').unix(),
  ]);

  return {
    access_token: at,
    access_token_expires_in: at_expire,
    refresh_token: rt,
    refresh_token_expires_in: rt_expire,
  } as Tokens;
};
