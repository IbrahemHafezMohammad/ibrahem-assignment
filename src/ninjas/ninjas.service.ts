import { Injectable } from '@nestjs/common';
import { CreateNinjaDto } from './dto/create-ninja.dto';
import { UpdateNinjaDto } from './dto/update-ninja.dto';
import { Ninja } from './entities/ninja.entity';

@Injectable()
export class NinjasService {
    private ninjas = [
        {id: 0 , name: 'Narco', weapon: 'stars'},
        {id: 1 , name: 'Bombasto', weapon: 'sword'},
    ];

    getNinjas(weapon?: 'stars' | 'sword'): Ninja[] {
        if (weapon) {
            return this.ninjas.filter((ninja) => ninja.weapon === weapon);
        }

        return this.ninjas;
    }

    getNinja(id: number): Ninja | null {
        return this.ninjas.find((ninja) => ninja.id === id) || null;
    }

    createNinja(createNinjaDto: CreateNinjaDto): Ninja {
        const newNinja = {
            id: this.ninjas.length,
            ...createNinjaDto
        };

        this.ninjas.push(newNinja);

        return newNinja;
    }

    updateNinja(id: number, updateNinjaDto: UpdateNinjaDto): Ninja {
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

    removeNinja(id: number): Ninja {
        const toBeRemoved = this.getNinja(id);

        this.ninjas = this.ninjas.filter((ninja) => ninja.id != id);

        return toBeRemoved;
    }
}
