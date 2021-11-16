import { EntityRepository, Repository } from 'typeorm';
import { ProfissionalTipo } from './profissional-tipo.model';

@EntityRepository(ProfissionalTipo)
export class ProfissionalTipoRepository extends Repository<ProfissionalTipo> {}
