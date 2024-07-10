import { ApiProperty } from "@nestjs/swagger";
import { IsEnum, MinLength } from "class-validator";

export class CreateNinjaDto {

    @ApiProperty()
    @MinLength(3)
    name: string;

    @ApiProperty()
    @IsEnum(['stars', 'sword'], { message: 'Weapon must be either stars or sword' })
    weapon: 'stars' | 'sword';
}
