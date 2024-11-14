import { registerDecorator, ValidationOptions } from 'class-validator';

import { IsUsernameValidConstraint } from './is-username-valid.constraint';

export function IsUsernameValid(validationOptions?: ValidationOptions) {
  return function (object: unknown, propertyName: string): void {
    registerDecorator({
      target: object.constructor,
      propertyName,
      options: validationOptions,
      validator: IsUsernameValidConstraint,
    });
  };
}
