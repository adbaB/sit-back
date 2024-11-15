import { Body, Controller, Post, Res } from '@nestjs/common';

import { AuthService } from '../services/auth.service';

import { Response } from 'express';
import { IsPublic } from '../decorators/isPublic.decorator';
import { LoginDto } from '../dto/logIn.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @IsPublic()
  @Post('login')
  async login(@Body() loginDto: LoginDto, @Res() res: Response): Promise<void> {
    const response = await this.authService.signIn(loginDto);

    res.cookie('access_token', response.data.accessToken, {
      httpOnly: true,
      sameSite: 'lax',
      path: '/',
      expires: new Date(Date.now() + 1000 * 60 * 60 * 1), // 1 hour
    });

    res.cookie('refresh_token', response.data.refreshToken, {
      httpOnly: true,
      sameSite: 'lax',
      path: '/',
      expires: new Date(Date.now() + 1000 * 60 * 60 * 24), // 24 hours
    });

    res.cookie('is_logged_in', 'true', {
      httpOnly: false,
      sameSite: 'lax',
      expires: new Date(Date.now() + 1000 * 60 * 60 * 1), // 1 hour
    });

    res.status(response.status).json(response);
  }
}
