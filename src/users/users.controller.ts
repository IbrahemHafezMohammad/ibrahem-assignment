import { Controller, Get, Post, Body, Patch, Param, Delete, ValidationPipe, HttpCode } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('users')
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  @HttpCode(200)
  async create(@Body(new ValidationPipe()) createUserDto: CreateUserDto): Promise<{ statusCode: number; message: string; data: any }> {
    const createdUser = await this.usersService.create(createUserDto);
    return {
      statusCode: 200,
      message: 'User successfully created',
      data: {
        'userId': createdUser.id
      }
    };
  }
}
