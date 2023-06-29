import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { JwtPayload, JwtPayloadWithRt } from '../types';
import { Request } from 'express';
import { Injectable, ForbiddenException } from '@nestjs/common';

@Injectable()
export class RtStragey extends PassportStrategy(Strategy, 'jwt-refresh-token') {
  constructor(config: ConfigService) {
    super({
      jwtFormRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secrectOrKey: config.get<string>('jwt.refreshTokenSecret'),
      passReqToCallback: true,
      ignoreExpiration: false,
    });
  }

  validate(req: Request, payload: JwtPayload): JwtPayloadWithRt {
    const refreshToken = req
      ?.get('authorization')
      ?.replace('Bearer ', '')
      .trim();

    if (!refreshToken) throw new ForbiddenException('No token provided');

    return {
      ...payload,
      refreshToken,
    } as JwtPayloadWithRt;
  }
}
