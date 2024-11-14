import { OmitType } from '@nestjs/mapped-types';
import { User } from '../../entities/user.entity';

export class UserDto extends OmitType(User, [
  'password',
  'createdAt',
  'deletedAt',
  'createdBy',
  'lastLoginAt',
  'updatedAt',
  'permissions',
] as const) {
  setUsername(username: string): UserDto {
    this.username = username;
    return this;
  }

  setId(id: number): UserDto {
    this.id = id;
    return this;
  }

  setFirstName(firstName: string): UserDto {
    this.firstName = firstName;
    return this;
  }

  setLastName(lastName: string): UserDto {
    this.lastName = lastName;
    return this;
  }

  setEmail(email: string): UserDto {
    this.email = email;
    return this;
  }

  setIsActive(isActive: boolean): UserDto {
    this.isActive = isActive;
    return this;
  }

  build(): UserDto {
    return this;
  }
}
