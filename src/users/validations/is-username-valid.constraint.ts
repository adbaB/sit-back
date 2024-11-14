import { Injectable } from '@nestjs/common';
import { ValidatorConstraint, ValidatorConstraintInterface } from 'class-validator';
import { UsersService } from '../services/users.service';

@ValidatorConstraint({
  async: true,
})
@Injectable()
export class IsUsernameValidConstraint implements ValidatorConstraintInterface {
  constructor(private userService: UsersService) {}
  async validate(value: string): Promise<boolean> {
    if (!value) return false;
    const user = await this.userService.findByUsername(value);
    return !user;
  }
  defaultMessage?(): string {
    return 'Username is already taken';
  }
}
