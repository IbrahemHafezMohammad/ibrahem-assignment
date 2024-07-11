import { Injectable } from '@nestjs/common';
import { CreateUserDto } from '../dto/create-user.dto';
import { UpdateUserDto } from '../dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../entities/user.entity';
import { Repository } from 'typeorm';
import { UserRoles } from '../entities/enums/roles.enum';

@Injectable()
export class AdminsService {

  constructor(@InjectRepository(User) private userRepository: Repository<User>) {}

  async createAdmin(createUserDto: CreateUserDto): Promise<User> {

    const newUser = this.userRepository.create({...createUserDto, role: UserRoles.Admin});

    return await this.userRepository.save(newUser);
  }
}
