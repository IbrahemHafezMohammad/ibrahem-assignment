import { ApiProperty } from "@nestjs/swagger";

export class Ninja {

    @ApiProperty()
    id: number;
    
    @ApiProperty()
    name: string;

    @ApiProperty()
    weapon: string;
}