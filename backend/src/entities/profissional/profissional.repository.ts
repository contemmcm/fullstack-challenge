import { EntityRepository, Repository } from 'typeorm';
import { Profissional } from './profissional.model';

@EntityRepository(Profissional)
export class ProfissionalRepository extends Repository<Profissional> {}
