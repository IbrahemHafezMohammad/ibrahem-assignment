import { Controller, Get, Post, Body, HttpCode, ValidationPipe } from '@nestjs/common';
import { UsersService } from '../users.service';
import { UserRoles } from '../entities/enums/roles.enum';
import { CreateUserDto } from '../dto/create-user.dto';
import { User } from '../entities/user.entity';
import { AdminsService } from './admins.service';


@Controller('admin')
export class AdminController {
  constructor(private readonly adminService: AdminsService, private readonly userService: UsersService) {}

  @Post()
  @HttpCode(200)
  async createAdmin(@Body(new ValidationPipe()) createUserDto: CreateUserDto): Promise<{ statusCode: number; message: string; data: User }> {
    const createdUser = await this.adminService.createAdmin(createUserDto);
    return {
      statusCode: 200,
      message: 'Admin user successfully created',
      data: createdUser,
    };
  }
}
