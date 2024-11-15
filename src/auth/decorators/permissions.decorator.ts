import { CustomDecorator, SetMetadata } from '@nestjs/common';
import { PermissionsEnum } from '../../libs/permissions.enum';

export const PERMISSIONS_KEY = 'roles';
export const Permissions = (...permissions: PermissionsEnum[]): CustomDecorator<string> =>
  SetMetadata(PERMISSIONS_KEY, permissions);
