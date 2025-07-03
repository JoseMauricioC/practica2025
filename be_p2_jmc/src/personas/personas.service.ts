import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreatePersonaDto } from './dto/create-persona.dto';
import { UpdatePersonaDto } from './dto/update-persona.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Persona } from './entities/persona.entity';
import { Repository } from 'typeorm';

@Injectable()
export class PersonasService {
  constructor(
    @InjectRepository(Persona) private personasRepository: Repository<Persona>,
  ) {}
  async create(createPersonaDto: CreatePersonaDto): Promise<Persona> {
    const existe = await this.personasRepository.findOneBy({
      nombreCompleto: createPersonaDto.nombreCompleto.trim(),
      idProfesion: createPersonaDto.idProfesion,
    });
    if (existe) throw new ConflictException('La persona ya existe');

    const persona = new Persona();
    persona.idProfesion = createPersonaDto.idProfesion;
    persona.nombreCompleto = createPersonaDto.nombreCompleto.trim();
    persona.fotografia = createPersonaDto.fotografia.trim();
    return this.personasRepository.save(persona);
  }
  async findAll(): Promise<Persona[]> {
    return this.personasRepository.find({
      relations: { profesion: true },
      select: {
        id: true,
        nombreCompleto: true,
        fotografia: true,
        profesion: { id: true, nombreCompleto: true },
      },
    });
  }

  async findOne(id: number): Promise<Persona> {
    const persona = await this.personasRepository.findOne({
      where: { id },
      relations: { profesion: true },
    });

    if (!persona) throw new NotFoundException('La persona no existe');

    return persona;
  }

  async update(
    id: number,
    updatePersonaDto: UpdatePersonaDto,
  ): Promise<Persona> {
    const persona = await this.findOne(id);
    Object.assign(persona, updatePersonaDto);
    return this.personasRepository.save(persona);
  }

  async remove(id: number) {
    const persona = await this.findOne(id);
    return this.personasRepository.softRemove(persona);
  }
}
