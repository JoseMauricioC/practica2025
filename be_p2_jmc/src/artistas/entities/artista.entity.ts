import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('artistas')
export class Artista {
  @PrimaryGeneratedColumn('identity')
  id: number;

  @Column('varchar', { length: 50 })
  nombre: string;

  @Column('varchar', { length: 500 })
  fotografia: string;

  @Column('decimal', {
    precision: 10,
    scale: 2,
    name: 'precio_disco',
  })
  precioDisco: number;

  @CreateDateColumn({ name: 'fecha_creacion' })
  fechaCreacion: Date;
  @UpdateDateColumn({ name: 'fecha_modificacion' })
  fechaModificacion: Date;
  @DeleteDateColumn({ name: 'fecha_eliminacion', select: false })
  fechaEliminacion: Date;
}
