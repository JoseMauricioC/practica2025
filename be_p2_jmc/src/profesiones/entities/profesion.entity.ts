import { Persona } from 'src/personas/entities/persona.entity';
import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('profesiones')
export class Profesion {
  @PrimaryGeneratedColumn('identity')
  id: number;

  @Column('varchar', { length: 100, name: 'nombre_profesion' })
  nombreCompleto: string;

  @CreateDateColumn({ name: 'fecha_creacion' })
  fechaCreacion: Date;
  @UpdateDateColumn({ name: 'fecha_modificacion' })
  fechaModificacion: Date;
  @DeleteDateColumn({ name: 'fecha_eliminacion', select: false })
  fechaEliminacion: Date;

  @OneToMany(() => Persona, (persona) => persona.profesion)
  personas: Persona[];
}
