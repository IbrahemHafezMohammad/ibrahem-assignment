import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { User } from './entities/user.entity';
import { AdminsController } from './admins/admins.controller';
import { AdminsService } from './admins/admins.service';

@Module({
  imports: [TypeOrmModule.forFeature([User])],
  providers: [UsersService, AdminsService],
  controllers: [UsersController, AdminsController],
  exports: [UsersService],
})
export class UsersModule {}
