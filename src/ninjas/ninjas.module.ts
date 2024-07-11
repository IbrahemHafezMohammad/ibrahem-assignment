import { Module } from '@nestjs/common';
import { NinjasController } from './ninjas.controller';
import { NinjasService } from './ninjas.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Ninja } from './entities/ninja.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Ninja])],
  providers: [NinjasService],
  controllers: [NinjasController],
  exports: [NinjasService]
})
export class NinjasModule {}
