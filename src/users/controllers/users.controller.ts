import { Body, Controller, Post } from '@nestjs/common';
import { Permissions } from '../../auth/decorators/permissions.decorator';
import { PermissionsEnum } from '../../libs/permissions.enum';
import { CreatedResponse } from '../../libs/responses';
import { CreateUserDto } from '../dto/user/create-user.dto';
import { UserDto } from '../dto/user/user.dto';
import { UsersService } from '../services/users.service';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Permissions(PermissionsEnum.USER_CREATE)
  @Post()
  create(@Body() createUserDto: CreateUserDto): Promise<CreatedResponse<UserDto>> {
    return this.usersService.create(createUserDto);
  }
}
