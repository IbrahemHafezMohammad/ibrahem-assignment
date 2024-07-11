import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateNinjaDto } from './dto/create-ninja.dto';
import { UpdateNinjaDto } from './dto/update-ninja.dto';
import { Ninja } from './entities/ninja.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class NinjasService {

    constructor(@InjectRepository(Ninja) private ninjasRepository: Repository<Ninja>) {

    }

    getNinjas(weapon?: 'stars' | 'sword'): Promise<Ninja[]> {
        if (weapon) {
            return this.ninjasRepository.find({where: { weapon: weapon }});
        }

        return this.ninjasRepository.find();
    }

    async getNinja(id: number): Promise<Ninja> {
        try {
            return await this.ninjasRepository.findOneOrFail({where: { id: id }});
        } catch (err) {
            throw new NotFoundException('ninja is MIA');
        }
    }

    createNinja(createNinjaDto: CreateNinjaDto): Promise<Ninja> {
        
        const newNinja =  this.ninjasRepository.create(createNinjaDto);

        return this.ninjasRepository.save(newNinja);
    }

    updateNinja(id: number, updateNinjaDto: UpdateNinjaDto): Promise<Ninja> {
        
        const res = this.ninjasRepository.update(id, updateNinjaDto);
        
        console.log(res);

        return this.getNinja(id);
    }

    async removeNinja(id: number): Promise<Ninja> {

        const ninja = await this.getNinja(id);
        
        return this.ninjasRepository.remove(ninja);
    }
}
