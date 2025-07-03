import { Test, TestingModule } from '@nestjs/testing';
import { ProfesionesController } from './profesiones.controller';
import { ProfesionesService } from './profesiones.service';

describe('ProfesionesController', () => {
  let controller: ProfesionesController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ProfesionesController],
      providers: [ProfesionesService],
    }).compile();

    controller = module.get<ProfesionesController>(ProfesionesController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
