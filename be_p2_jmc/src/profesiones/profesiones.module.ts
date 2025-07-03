import { Module } from '@nestjs/common';
import { ProfesionesService } from './profesiones.service';
import { ProfesionesController } from './profesiones.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Profesion } from './entities/profesion.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Profesion])],

  controllers: [ProfesionesController],
  providers: [ProfesionesService],
})
export class ProfesionesModule {}
