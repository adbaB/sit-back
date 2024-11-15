import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { UsersController } from './controllers/users.controller';

import { Permission } from './entities/permission.entity';
import { User } from './entities/user.entity';

import { PermissionsService } from './services/permissions.service';
import { UsersService } from './services/users.service';
import { IsUsernameValidConstraint } from './validations/is-username-valid.constraint';

@Module({
  imports: [TypeOrmModule.forFeature([User, Permission])],
  controllers: [UsersController],
  providers: [UsersService, PermissionsService, IsUsernameValidConstraint],
  exports: [UsersService, IsUsernameValidConstraint],
})
export class UsersModule {}
