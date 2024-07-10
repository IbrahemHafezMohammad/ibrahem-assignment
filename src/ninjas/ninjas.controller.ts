import { Controller, Get, Post, Put, Delete, Param, Query, Body, NotFoundException, ParseIntPipe, ValidationPipe, UseGuards } from '@nestjs/common';
import { CreateNinjaDto } from './dto/create-ninja.dto';
import { UpdateNinjaDto } from './dto/update-ninja.dto';
import { NinjasService } from './ninjas.service';
import { BeltGuard } from './guards/belt/belt.guard';
import { Ninja } from './entities/ninja.entity';
import { ApiCreatedResponse, ApiNotFoundResponse, ApiOkResponse, ApiQuery, ApiTags } from '@nestjs/swagger';

@ApiTags('Ninjas')
@Controller('ninjas')
// @UseGuards(BeltGuard)
export class NinjasController {

    constructor(private readonly ninjasService: NinjasService) { }

    @ApiOkResponse({ type: Ninja, isArray: true })
    @ApiQuery({ name: 'weapon', required: false })
    @Get()
    getNinjas(@Query('weapon') weapon?: 'stars' | 'sword'): Ninja[] {
        return this.ninjasService.getNinjas(weapon);
    }

    @ApiOkResponse({ type: Ninja, isArray: false })
    @ApiNotFoundResponse()
    @Get(':id')
    getNinja(@Param('id', ParseIntPipe) id: number): Ninja {

        const ninja = this.ninjasService.getNinja(id);

        if (!ninja) {
            throw new NotFoundException('Ninga is MIA');
        }

        return ninja;
    }


    @ApiCreatedResponse({ type: Ninja })
    @Post()
    // @UseGuards(BeltGuard)
    createNinja(@Body(new ValidationPipe) createNinjaDto: CreateNinjaDto): Ninja {
        return this.ninjasService.createNinja(createNinjaDto);
    }

    @Put(':id')
    updateNinja(@Param('id') id: string, @Body() updateNinjaDto: UpdateNinjaDto): Ninja {
        return this.ninjasService.updateNinja(+id, updateNinjaDto);
    }

    @Delete(':id')
    removeNinja(@Param('id') id: string): Ninja {
        return this.ninjasService.removeNinja(+id);
    }

}
