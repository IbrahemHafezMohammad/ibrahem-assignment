// validators/is-unique-username.validator.ts
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ValidatorConstraint, ValidatorConstraintInterface, ValidationArguments, registerDecorator, ValidationOptions } from 'class-validator';
import { Repository } from 'typeorm';
import { User } from '../entities/user.entity';

@ValidatorConstraint({ async: true })
@Injectable()
export class IsUniqueUsernameConstraint implements ValidatorConstraintInterface {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  async validate(username: string, args: ValidationArguments): Promise<boolean> {
    const user = await this.userRepository.findOne({ where: { username } });
    return !user;
  }

  defaultMessage(args: ValidationArguments): string {
    return 'Username already exists';
  }
}