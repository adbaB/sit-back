import { Injectable, NestMiddleware, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { NextFunction, Request, Response } from 'express';
import { JwtTokenPayload } from '../libs/Auth/token';
@Injectable()
export class RefreshAccessMiddleware implements NestMiddleware {
  constructor(private readonly jwtService: JwtService) {}
  use(req: Request, res: Response, next: NextFunction): void {
    const refreshToken = req.cookies.refresh_token;
    const accessToken = req.cookies.access_token;

    if (!refreshToken) {
      throw new UnauthorizedException('login need');
    }
    try {
      const { exp }: JwtTokenPayload = this.jwtService.decode(accessToken);
      if (new Date().getTime() > exp * 1000) {
        const { exp }: JwtTokenPayload = this.jwtService.decode(refreshToken);
        if (new Date().getTime() > exp * 1000) {
          throw new UnauthorizedException('refresh token expired');
        }
        const payload = this.jwtService.decode(refreshToken);
        const newAccessToken = this.jwtService.sign(payload);
        res.cookie('access_token', newAccessToken, {
          httpOnly: true,
          sameSite: 'lax',
          path: '/',
          expires: new Date(Date.now() + 1000 * 60 * 60 * 1), // 1 hour
        });
        next();
      }
      next();
    } catch (error) {
      throw new UnauthorizedException(error.message);
    }
  }
}
