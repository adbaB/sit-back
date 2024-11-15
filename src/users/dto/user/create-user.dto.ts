import {
  IsAlphanumeric,
  IsArray,
  IsEmail,
  IsNotEmpty,
  IsOptional,
  IsPositive,
  IsString,
} from 'class-validator';
import { IsUsernameValid } from '../../validations/is-username-valid';

export class CreateUserDto {
  @IsNotEmpty()
  @IsAlphanumeric()
  @IsUsernameValid()
  username: string;

  @IsString()
  @IsNotEmpty()
  password: string;

  @IsString()
  @IsNotEmpty()
  firstName: string;

  @IsString()
  @IsNotEmpty()
  lastName: string;

  @IsEmail()
  @IsOptional()
  email?: string;

  @IsArray()
  @IsPositive({ each: true })
  @IsNotEmpty({ each: true })
  permissions?: number[];
}
