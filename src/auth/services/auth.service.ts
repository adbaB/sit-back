import { Inject, Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

import { LoginResponse } from '../../libs/responses';
import { comparePassword } from '../../utils/bcrypt.utils';

import { ConfigType } from '@nestjs/config';
import configuration from '../../config/configuration';
import { PayloadToken } from '../../libs/Auth/token';
import { UsersService } from '../../users/services/users.service';
import { LoginDto } from '../dto/logIn.dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    @Inject(configuration.KEY) private configService: ConfigType<typeof configuration>,
    private readonly jwtService: JwtService,
  ) {}

  async signIn(loginDto: LoginDto): Promise<LoginResponse> {
    const { username, password } = loginDto;

    const user = await this.usersService.findWithPasswordByUsername(username);

    if (!user || !user.isActive || !(await comparePassword(password, user.password))) {
      throw new UnauthorizedException('username or password is incorrect');
    }
    const permissions = user.permissions
      ? user.permissions.map((permission) => permission.code)
      : [];

    const payload: PayloadToken = {
      username,
      id: user.id,
      name: user.firstName + ' ' + user.lastName,
      permissions,
    };

    const accessToken = await this.generateAccessToken(payload);
    const refreshToken = await this.generateRefreshToken(payload);

    return {
      status: 200,
      message: 'success',
      data: {
        accessToken: accessToken,
        refreshToken: refreshToken,
      },
    };
  }

  async generateAccessToken(payload: PayloadToken): Promise<string> {
    return this.jwtService.signAsync(payload);
  }

  async generateRefreshToken(payload: PayloadToken): Promise<string> {
    return this.jwtService.signAsync(payload, {
      secret: this.configService.jwt.refreshSecret,
      expiresIn: this.configService.jwt.refreshExpiresIn,
    });
  }
}
