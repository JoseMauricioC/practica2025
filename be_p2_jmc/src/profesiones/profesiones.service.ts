import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateProfesionDto } from './dto/create-profesion.dto';
import { UpdateProfesionDto } from './dto/update-profesion.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Profesion } from './entities/profesion.entity';

@Injectable()
export class ProfesionesService {
  constructor(
    @InjectRepository(Profesion)
    private profesionesRepository: Repository<Profesion>,
  ) {}
  async create(createProfesioneDto: CreateProfesionDto): Promise<Profesion> {
    const existe = await this.profesionesRepository.findOneBy({
      nombreCompleto: createProfesioneDto.nombreCompleto.trim(),
    });

    if (existe) throw new ConflictException('La profesion ya existe');

    const profesion = new Profesion();
    profesion.nombreCompleto = createProfesioneDto.nombreCompleto.trim();
    return this.profesionesRepository.save(profesion);
  }

  async findAll() {
    return this.profesionesRepository.find();
  }

  async findOne(id: number): Promise<Profesion> {
    const profesion = await this.profesionesRepository.findOneBy({ id });
    if (!profesion) throw new NotFoundException('La profesion no existe');
    return profesion;
  }

  async update(id: number, updateProfesioneDto: UpdateProfesionDto) {
    const profesion = await this.findOne(id);
    const profesionUpdate = Object.assign(profesion, updateProfesioneDto);
    return this.profesionesRepository.save(profesionUpdate);
  }

  async remove(id: number) {
    const profesion = await this.findOne(id);
    if (profesion) return this.profesionesRepository.softRemove(profesion);
  }
}
