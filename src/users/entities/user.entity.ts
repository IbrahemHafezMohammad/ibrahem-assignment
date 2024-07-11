import { ApiProperty } from '@nestjs/swagger';
import { Entity, Column, PrimaryGeneratedColumn, BaseEntity, BeforeInsert, BeforeUpdate } from 'typeorm';
import { UserRoles } from './enums/roles.enum'; // Adjust the path according to your project structure
import { Exclude } from 'class-transformer';
import * as bcrypt from 'bcrypt';

@Entity('users')
export class User extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty()
  @Column({ length: 255 })
  name: string;

  @ApiProperty()
  @Column({ unique: true, length: 50 })
  username: string;

  @ApiProperty()
  @Column({ unique: true, length: 320  })
  email: string;

  @Exclude()
  @ApiProperty()
  @Column({ length: 255 })
  password: string;

  @ApiProperty()
  @Column({ type: 'int', default: UserRoles.Member }) // Use the enum for role
  role: UserRoles; // 0: admin, 1: regular

  @BeforeInsert()
  @BeforeUpdate()
  async hashPassword() {
    if (this.password) {
      this.password = await bcrypt.hash(this.password, 10);
    }
  }
}
