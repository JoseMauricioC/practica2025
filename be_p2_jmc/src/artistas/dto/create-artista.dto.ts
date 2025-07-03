// import { ApiProperty } from '@nestjs/swagger';

// export class CreateArtistaDto {
//   @ApiProperty()
//   readonly nombre: string;
//   @ApiProperty()
//   readonly fotografia: string;
// }

import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import {
  IsNotEmpty,
  IsNumber,
  IsString,
  Max,
  MaxLength,
  Min,
} from 'class-validator';

export class CreateArtistaDto {
  @ApiProperty({
    description: 'The name of the artist',
    example: 'Frida Kahlo',
    maxLength: 50,
  })
  @IsNotEmpty({ message: 'El nombre del artista no puede estar vacío.' })
  @IsString({ message: 'El nombre del artista debe ser una cadena de texto.' })
  @MaxLength(50, {
    message: 'El nombre del artista no puede exceder los 50 caracteres.',
  })
  readonly nombre: string;

  @ApiProperty()
  @IsNotEmpty({ message: 'El campo fotografia es obligatorio' })
  @IsString({ message: 'El campo fotografia debe ser de tipo cadena' })
  @MaxLength(500, {
    message: 'El campo fotografia no debe ser mayor a 500 caracteres',
  })
  readonly fotografia: string;

  @ApiProperty({
    description: 'Precio del disco del artista',
    example: 19.99,
    minimum: 0,
    maximum: 10000,
  })
  @IsNotEmpty({ message: 'El precio del disco es obligatorio.' })
  @Type(() => Number)
  @IsNumber(
    { maxDecimalPlaces: 2 },
    { message: 'El precio del disco debe ser un número.' },
  )
  @Min(0, { message: 'El precio no puede ser negativo.' })
  @Max(10000, { message: 'El precio no puede ser mayor a 10000.' })
  readonly precioDisco: number;
}
