import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsEnum, IsNotEmpty, Matches, MaxLength, MinLength } from "class-validator";
import { UserRoles } from "../entities/enums/roles.enum";
import { User } from "../entities/user.entity";
import { IsUniqueEmail } from "../validations/is-unique-email.validator";
import { IsUniqueUsername } from "../validations/is.unique";

export class CreateUserDto {

    @ApiProperty({ example: 'John Doe', required: false})
    @MaxLength(255)
    name: string;

    @ApiProperty({ example: 'john_doe' })
    @IsNotEmpty()
    @MaxLength(50)
    @IsUniqueUsername({ message: 'Username already exists' })
    username: string;

    @ApiProperty({ example: 'john.doe@example.com' })
    @IsNotEmpty()
    @IsEmail()
    // @IsUniqueEmail({ message: 'Email already exists' })
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
