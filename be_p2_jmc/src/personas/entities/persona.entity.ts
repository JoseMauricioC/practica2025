import { Profesion } from 'src/profesiones/entities/profesion.entity';
import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('personas')
export class Persona {
  @PrimaryGeneratedColumn('identity')
  id: number;

  @Column('integer', { name: 'id_profesion' })
  idProfesion: number;

  @Column('varchar', { length: 100, name: 'nombre_completo' })
  nombreCompleto: string;

  @Column('varchar', { length: 500 })
  fotografia: string;

  @CreateDateColumn({ name: 'fecha_creacion' })
  fechaCreacion: Date;
  @UpdateDateColumn({ name: 'fecha_modificacion' })
  fechaModificacion: Date;
  @DeleteDateColumn({ name: 'fecha_eliminacion', select: false })
  fechaEliminacion: Date;

  @ManyToOne(() => Profesion, (profesion) => profesion.personas)
  @JoinColumn({ name: 'id_profesion', referencedColumnName: 'id' })
  profesion: Profesion;
}
