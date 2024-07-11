import { Controller, Get, Post, Put, Delete, Param, Query, Body, NotFoundException, ParseIntPipe, ValidationPipe, UseGuards } from '@nestjs/common';
import { CreateNinjaDto } from './dto/create-ninja.dto';
import { UpdateNinjaDto } from './dto/update-ninja.dto';
import { NinjasService } from './ninjas.service';
import { BeltGuard } from './guards/belt/belt.guard';
import { Ninja } from './entities/ninja.entity';
import { ApiBadRequestResponse, ApiCreatedResponse, ApiNotFoundResponse, ApiOkResponse, ApiQuery, ApiTags } from '@nestjs/swagger';

@ApiTags('Ninjas')
@Controller('ninjas')
// @UseGuards(BeltGuard)
export class NinjasController {

    constructor(private readonly ninjasService: NinjasService) { }

    @ApiOkResponse({ type: Ninja, isArray: true })
    @ApiQuery({ name: 'weapon', required: false })
    @Get()
    async getNinjas(@Query('weapon') weapon?: 'stars' | 'sword'): Promise<Ninja[]> {
        return this.ninjasService.getNinjas(weapon);
    }

    @ApiOkResponse({ type: Ninja, isArray: false })
    @ApiNotFoundResponse()
    @Get(':id')
    async getNinja(@Param('id', ParseIntPipe) id: number): Promise<Ninja> {

        return this.ninjasService.getNinja(id);
    }


    @ApiCreatedResponse({ type: Ninja })
    @Post()
    @ApiBadRequestResponse()
    // @UseGuards(BeltGuard)
    async createNinja(@Body(new ValidationPipe) createNinjaDto: CreateNinjaDto): Promise<Ninja>{
        return this.ninjasService.createNinja(createNinjaDto);
    }

    @ApiCreatedResponse({ type: Ninja })
    @Put(':id')
    @ApiBadRequestResponse()
    async updateNinja(@Param('id') id: string, @Body() updateNinjaDto: UpdateNinjaDto): Promise<Ninja> {
        return this.ninjasService.updateNinja(+id, updateNinjaDto);
    }

    @Delete(':id')
    async removeNinja(@Param('id') id: string): Promise<Ninja> {
        return this.ninjasService.removeNinja(+id);
    }

}
