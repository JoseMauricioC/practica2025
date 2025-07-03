import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateArtistaDto } from './dto/create-artista.dto';
import { UpdateArtistaDto } from './dto/update-artista.dto';
import { Artista } from './entities/artista.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class ArtistasService {
  constructor(
    @InjectRepository(Artista) private artistasRepository: Repository<Artista>,
  ) {}
  async create(createArtistaDto: CreateArtistaDto): Promise<Artista> {
    const existe = await this.artistasRepository.findOneBy({
      nombre: createArtistaDto.nombre.trim(),
    });

    if (existe) throw new ConflictException('el artista ya existe');

    const artista = new Artista();
    artista.nombre = createArtistaDto.nombre.trim();
    artista.fotografia = createArtistaDto.fotografia.trim();
    artista.precioDisco = createArtistaDto.precioDisco;

    return this.artistasRepository.save(artista);
  }

  async findAll() {
    return this.artistasRepository.find();
  }

  async findOne(id: number): Promise<Artista> {
    const artista = await this.artistasRepository.findOneBy({ id });
    if (!artista) throw new NotFoundException('El artista no existe');
    return artista;
  }

  async update(id: number, updateArtistaDto: UpdateArtistaDto) {
    const artista = await this.findOne(id);
    const artistaUpdate = Object.assign(artista, updateArtistaDto);
    return this.artistasRepository.save(artistaUpdate);
  }

  async remove(id: number) {
    const artista = await this.findOne(id);
    if (artista) return this.artistasRepository.softRemove(artista);
  }
}
