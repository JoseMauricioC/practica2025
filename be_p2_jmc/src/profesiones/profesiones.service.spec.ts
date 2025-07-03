import { Test, TestingModule } from '@nestjs/testing';
import { ProfesionesService } from './profesiones.service';

describe('ProfesionesService', () => {
  let service: ProfesionesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ProfesionesService],
    }).compile();

    service = module.get<ProfesionesService>(ProfesionesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
