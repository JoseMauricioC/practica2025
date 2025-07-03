import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { ProfesionesService } from './profesiones.service';
import { CreateProfesionDto } from './dto/create-profesion.dto';
import { UpdateProfesionDto } from './dto/update-profesion.dto';

@Controller('profesiones')
export class ProfesionesController {
  constructor(private readonly profesionesService: ProfesionesService) {}

  @Post()
  create(@Body() createProfesioneDto: CreateProfesionDto) {
    return this.profesionesService.create(createProfesioneDto);
  }

  @Get()
  findAll() {
    return this.profesionesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.profesionesService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateProfesioneDto: UpdateProfesionDto,
  ) {
    return this.profesionesService.update(+id, updateProfesioneDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.profesionesService.remove(+id);
  }
}
