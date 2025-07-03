import { ApiProperty } from '@nestjs/swagger';
import {
  IsDefined,
  IsInt,
  IsNotEmpty,
  IsString,
  MaxLength,
} from 'class-validator';
import { Profesion } from 'src/profesiones/entities/profesion.entity';

export class CreatePersonaDto {
  @ApiProperty()
  @IsDefined({ message: 'El campo idProfesion debe estar definido' })
  @IsInt({ message: 'El campo idProfesion debe ser de tipo numérico' })
  readonly idProfesion: Profesion['id'];

  @ApiProperty()
  @IsNotEmpty({ message: 'El campo nombre no debe ser vacío' })
  @IsString({ message: 'El campo nombre debe ser de tipo cadena' })
  @MaxLength(100, {
    message: 'El campo nombre no debe ser mayor a 100 caracteres',
  })
  readonly nombreCompleto: string;

  @ApiProperty()
  @IsNotEmpty({ message: 'El campo fotografia es obligatorio' })
  @IsString({ message: 'El campo fotografia debe ser de tipo cadena' })
  @MaxLength(500, {
    message: 'El campo fotografia no debe ser mayor a 500 caracteres',
  })
  readonly fotografia: string;
}
