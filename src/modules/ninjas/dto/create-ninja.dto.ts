import { IsEnum, MinLength } from "class-validator";

export class CreateNinjaDto {

    @MinLength(3)
    name: string;

    @IsEnum(['stars', 'sword'], { message: 'Weapon must be either stars or sword' })
    weapon: 'stars' | 'sword';
}
