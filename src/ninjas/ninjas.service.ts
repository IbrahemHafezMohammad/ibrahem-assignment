import { Injectable } from '@nestjs/common';
import { CreateNinjaDto } from './dto/create-ninja.dto';
import { UpdateNinjaDto } from './dto/update-ninja.dto';
import { Ninja } from './entities/ninja.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

interface NinjaObj {
    id: number;
    name: string;
    weapon: string;
}

@Injectable()
export class NinjasService {

    constructor(@InjectRepository(Ninja) private ninjasRepository: Repository<Ninja>) {

    }

    private ninjas = [
        {id: 0 , name: 'Narco', weapon: 'stars'},
        {id: 1 , name: 'Bombasto', weapon: 'sword'},
    ];

    getNinjas(weapon?: 'stars' | 'sword'): Promise<Ninja[]> | NinjaObj[] {
        if (weapon) {
            return this.ninjasRepository.find({where: { weapon: weapon }});
            // return this.ninjas.filter((ninja) => ninja.weapon === weapon);
        }

        return this.ninjasRepository.find();
    }

    getNinja(id: number): Ninja | NinjaObj | null {
        return this.ninjas.find((ninja) => ninja.id === id) || null;
    }

    createNinja(createNinjaDto: CreateNinjaDto): Ninja | NinjaObj {
        const newNinja = {
            id: this.ninjas.length,
            ...createNinjaDto
        };

        this.ninjas.push(newNinja);

        return newNinja;
    }

    updateNinja(id: number, updateNinjaDto: UpdateNinjaDto): Ninja | NinjaObj {
        this.ninjas = this.ninjas.map((ninja) => {

            if (ninja.id === id) {
                return {
                    ...ninja,
                    ...updateNinjaDto
                };
            }

            return ninja;
        });

        return this.getNinja(id);
    }

    removeNinja(id: number): Ninja | NinjaObj {
        const toBeRemoved = this.getNinja(id);

        this.ninjas = this.ninjas.filter((ninja) => ninja.id != id);

        return toBeRemoved;
    }
}
