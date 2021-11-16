import { INestApplication } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProfissionalTipoModule } from '../profissional_tipo/profissional-tipo.module';
import { ProfissionalTipoRepository } from '../profissional_tipo/profissional-tipo.repository';
import { ProfissionalTipoService } from '../profissional_tipo/profissional-tipo.service';

describe('ProfissionalService', () => {
  let app: INestApplication;
  let service: ProfissionalTipoService;

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        ProfissionalTipoModule,
        TypeOrmModule.forRoot({
          type: 'postgres',
          host: 'localhost',
          port: 5432,
          username: 'maxxidata',
          password: 'maxxidata',
          database: 'test_maxxidata',
          entities: ['**/*.model.{js,ts}'],
          synchronize: true,
          dropSchema: true,
        }),
      ],
      providers: [ProfissionalTipoService, ProfissionalTipoRepository],
    }).compile();

    service = module.get<ProfissionalTipoService>(ProfissionalTipoService);

    app = module.createNestApplication();
    await app.init();
  });

  it('ProfissionalTipoService - should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('createOne', () => {
    it('should save a ProfissionalTipo', async () => {
      const tipo = await service.createOne({
        descricao: 'DESCRICAO',
        situacao: true,
      });
      expect(tipo.id).toBeDefined();
      expect(tipo.createdAt).toBeDefined();
      expect(tipo.updatedAt).toBeDefined();
    });

    it('descricao is mandatory', async () => {
      try {
        await service.createOne({
          descricao: null,
          situacao: true,
        });
        expect(undefined).toBeDefined(); // Shouldn't get here
      } catch (error) {
        expect(error).toBeDefined();
      }
    });

    it('descricao is mandatory', async () => {
      try {
        await service.createOne({
          descricao: 'DESCRICAO',
          situacao: null,
        });
        expect(undefined).toBeDefined(); // Shouldn't get here
      } catch (error) {
        expect(error).toBeDefined();
      }
    });
  });

  afterAll(async () => {
    await app.close();
  });
});
