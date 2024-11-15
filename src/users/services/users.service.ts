import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { CreatedResponse } from '../../libs/responses';
import { hashPassword } from '../../utils/bcrypt.utils';
import { CreateUserDto } from '../dto/user/create-user.dto';
import { UserDto } from '../dto/user/user.dto';
import { User } from '../entities/user.entity';
import { PermissionsService } from './permissions.service';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private readonly userRepo: Repository<User>,
    private readonly permissionsServices: PermissionsService,
  ) {}

  async create(dto: CreateUserDto): Promise<CreatedResponse<UserDto>> {
    const permissions = await this.permissionsServices.findByIds(dto.permissions);
    const password = await hashPassword(dto.password);
    const user = this.userRepo.create({
      ...dto,
      password,
      permissions,
    });
    const savedUser = await this.userRepo.save(user);
    const createdUser = this.buildUserDto(savedUser);
    return {
      data: createdUser,
      status: 201,
      message: 'User created successfully',
    };
  }

  async findWithPasswordByUsername(username: string): Promise<User> {
    return this.userRepo.findOne({
      where: { username },
      relations: { permissions: true },
    });
  }
  async findByUsername(username: string): Promise<UserDto> {
    const user = await this.userRepo.findOneBy({ username });
    return user ? this.buildUserDto(user) : null;
  }

  validateUser(id: number): Promise<boolean> {
    return this.userRepo.exists({ where: { id, isActive: true } });
  }

  buildUserDto(user: User): UserDto {
    return new UserDto()
      .setId(user.id)
      .setUsername(user.username)
      .setFirstName(user.firstName)
      .setLastName(user.lastName)
      .setEmail(user.email)
      .setIsActive(user.isActive)
      .build();
  }
}
