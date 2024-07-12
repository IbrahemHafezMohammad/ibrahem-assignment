import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsEnum, IsNotEmpty, IsOptional, Matches, MaxLength, MinLength } from "class-validator";
import { UserRoles } from "../entities/enums/roles.enum";
import { User } from "../entities/user.entity";
import { isUnique } from "src/shared/validation/is-unique-constraint";

export class CreateUserDto {

    @ApiProperty({ example: 'John Doe', required: false})
    @IsOptional()
    @MaxLength(255)
    name: string;

    @ApiProperty({ example: 'john_doe' })
    @IsNotEmpty()
    @isUnique({tableName: 'users', column: 'username'})
    @MaxLength(50)
    username: string;

    @ApiProperty({ example: 'john.doe@example.com' })
    @IsNotEmpty()
    @IsEmail()
    @MaxLength(320)
    email: string;

    @ApiProperty({ example: 'StrongP@ssw0rd' })
    @IsNotEmpty()
    @MinLength(6)
    @MaxLength(16)
    @Matches(/^[A-Za-z0-9!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]{6,16}$/, {
        message: 'Password must be 6-16 characters long and can only contain letters, numbers, and special characters.',
    })
    password: string;

    // @ApiProperty({ enum: UserRoles, example: UserRoles.Regular })
    // @IsEnum(UserRoles)
    // role: UserRoles; // 0: admin, 1: regular
}
