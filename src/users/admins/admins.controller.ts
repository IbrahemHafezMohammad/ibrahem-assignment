import { Controller, Get, Post, Body, HttpCode, ValidationPipe, Res, UseGuards, Req } from '@nestjs/common';
import { UsersService } from '../users.service';
import { UserRoles } from '../entities/enums/roles.enum';
import { CreateUserDto } from '../dto/create-user.dto';
import { User } from '../entities/user.entity';
import { AdminsService } from './admins.service';
import { Response } from 'express';
import { AuthService } from '../auth/auth.service';
import { LoginDto } from './dto/login.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { ApiTags } from '@nestjs/swagger';
import { RolesGuard } from '../auth/guards/roles.guard';

@ApiTags('Admins')
@Controller('admin')
export class AdminsController {
  constructor(
    private readonly adminService: AdminsService,
    private readonly userService: UsersService,
    private readonly authService: AuthService
  ) { }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Post('create')
  async createAdmin(@Res() res: Response, @Body(new ValidationPipe()) createUserDto: CreateUserDto): Promise<Response> {
    const createdUser = await this.adminService.create(createUserDto);
    return res.status(201).json({
      statusCode: 200,
      message: 'Admin user successfully created',
      data: createdUser,
    });
  }

  @Post('login')
  async login(@Res() res: Response, @Body(new ValidationPipe()) loginDto: LoginDto): Promise<Response> {
    const user = await this.authService.validateUser(loginDto.email, loginDto.password);
    if (!user) {
      return res.status(401).json({
        statusCode: 401,
        message: 'Invalid credentials',
      });
    }
    const access_token = await this.authService.login(user);
    return res.status(200).json({
      statusCode: 200,
      message: 'User logged in successfully',
      data: {
        access_token,
        'user': user,
      },
    });
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Get('profile')
  getProfile(@Req() req) {
    return req.user;
  }

}
