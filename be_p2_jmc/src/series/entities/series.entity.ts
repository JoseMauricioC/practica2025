import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('series')
export class Series {
  @PrimaryGeneratedColumn('identity')
  id: number;

  @Column({ type: 'varchar', length: 500, default: '' })
  poster: string;

  @Column({ type: 'varchar', length: 250 })
  titulo: string;

  @Column({ type: 'varchar', length: 50, default: '' })
  genero: string;

  @Column({ type: 'varchar', length: 5000 })
  sinopsis: string;

  @Column({ type: 'varchar', length: 100 })
  director: string;

  @Column({ type: 'int' })
  temporadas: number;

  @Column({ type: 'date', name: 'fecha_estreno' })
  fechaEstreno: Date;

  @CreateDateColumn({ name: 'fecha_creacion' })
  fechaCreacion: Date;
  @UpdateDateColumn({ name: 'fecha_modificacion' })
  fechaModificacion: Date;
  @DeleteDateColumn({ name: 'fecha_eliminacion', select: false })
  fechaEliminacion: Date;
}
