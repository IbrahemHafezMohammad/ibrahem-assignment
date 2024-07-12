import { registerDecorator, ValidationOptions } from "class-validator";
import { IsUniqueUsernameConstraint } from "./is-unique-username.validator";

export function IsUniqueUsername(validationOptions?: ValidationOptions) {
    return function (object: Object, propertyName: string) {
      registerDecorator({
        target: object.constructor,
        propertyName: propertyName,
        options: validationOptions,
        constraints: [],
        validator: IsUniqueUsernameConstraint,
      });
    };
  }
  