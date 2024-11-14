import { Inject, Injectable, UnauthorizedException } from '@nestjs/common';
import { ConfigType } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { Request } from 'express';
import { ExtractJwt, Strategy } from 'passport-jwt';

import config from 'src/config/configuration';
import { PayloadToken } from '../../libs/Auth/token';

import { UsersService } from '../../users/services/users.service';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy, 'jwt') {
  constructor(
    @Inject(config.KEY) configService: ConfigType<typeof config>,
    private readonly userService: UsersService,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromExtractors([
        (request: Request): string => {
          const data: string = request?.cookies['access_token'];
          if (!data) {
            return null;
          }

          return data;
        },
      ]),
      ignoreExpiration: false,
      secretOrKey: configService.jwt.secret,
    });
  }

  async validate(payload: PayloadToken): Promise<PayloadToken> {
    if (payload === null) {
      throw new UnauthorizedException();
    }
    const user = await this.userService.validateUser(payload.id);

    if (!user) {
      throw new UnauthorizedException();
    }
    return payload;
  }
}
