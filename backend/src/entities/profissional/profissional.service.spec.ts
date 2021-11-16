import { INestApplication } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProfissionalTipo } from '../profissional_tipo/profissional-tipo.model';
import { ProfissionalTipoModule } from '../profissional_tipo/profissional-tipo.module';
import { ProfissionalTipoRepository } from '../profissional_tipo/profissional-tipo.repository';
import { ProfissionalTipoService } from '../profissional_tipo/profissional-tipo.service';
import { ProfissionalModule } from './profissional.module';
import { ProfissionalRepository } from './profissional.repository';
import { ProfissionalService } from './profissional.service';

describe('ProfissionalService', () => {
  let app: INestApplication;
  let profissionalService: ProfissionalService;
  let profissionalTipoService: ProfissionalTipoService;

  let profissionalTipo: ProfissionalTipo;

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        ProfissionalTipoModule,
        ProfissionalModule,
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
      providers: [
        ProfissionalService,
        ProfissionalRepository,
        ProfissionalTipo,
        ProfissionalTipoRepository,
      ],
    }).compile();

    profissionalService = module.get<ProfissionalService>(ProfissionalService);
    profissionalTipoService = module.get<ProfissionalTipoService>(
      ProfissionalTipoService,
    );

    app = module.createNestApplication();
    await app.init();

    if (!profissionalTipo) {
      profissionalTipo = await profissionalTipoService.createOne({
        descricao: 'Programador',
        situacao: true,
      });
    }
  });

  it('ProfissionalService - should be defined', () => {
    expect(profissionalService).toBeDefined();
  });

  describe('createOne', () => {
    it('should save a Profissional', async () => {
      const profissional = await profissionalService.createOne({
        nome: 'MARCIO MURILO CONTE MONTEIRO',
        telefone: '(12) 99999999',
        email: 'muriloconte@gmail.com',
        situacao: true,
        profissionalTipo: profissionalTipo,
      });
      expect(profissional.id).toBeDefined();
      expect(profissional.createdAt).toBeDefined();
      expect(profissional.updatedAt).toBeDefined();
    });

    it('should NOT create Profissional without nome', async () => {
      try {
        await profissionalService.createOne({
          nome: null,
          telefone: null,
          email: null,
          situacao: true,
          profissionalTipo: profissionalTipo,
        });
        expect(undefined).toBeDefined(); // Shouldn't get here
      } catch (error) {
        expect(error).toBeDefined();
      }
    });

    it('should NOT create Profissional without tipoDeProfissional', async () => {
      try {
        await profissionalService.createOne({
          nome: 'NOME',
          telefone: null,
          email: null,
          situacao: true,
          profissionalTipo: null,
        });
        expect(undefined).toBeDefined(); // Shouldn't get here
      } catch (error) {
        expect(error).toBeDefined();
      }
    });

    it('should NOT create Profissional without situacao', async () => {
      try {
        await profissionalService.createOne({
          nome: 'NOME',
          telefone: null,
          email: null,
          situacao: null,
          profissionalTipo: profissionalTipo,
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
