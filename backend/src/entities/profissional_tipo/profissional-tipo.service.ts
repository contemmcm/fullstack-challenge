import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { EntityPagination } from 'src/shared/entity-pagination.model';

import { IProfissionalTipo, ProfissionalTipo } from './profissional-tipo.model';
import { ProfissionalTipoRepository } from './profissional-tipo.repository';

@Injectable()
export class ProfissionalTipoService {
  constructor(
    @InjectRepository(ProfissionalTipoRepository)
    protected profissionalTipoRepository: ProfissionalTipoRepository,
  ) {}

  findOne(id: number): Promise<ProfissionalTipo> {
    return this.profissionalTipoRepository.findOneOrFail(id);
  }

  findAll(): Promise<ProfissionalTipo[]> {
    return this.profissionalTipoRepository.find();
  }

  async findPage(query: any): Promise<EntityPagination<ProfissionalTipo>> {
    const take = parseInt(query.take) || 100;
    const page = parseInt(query.page) || 0;
    const skip = page * take;

    const order = {};

    if (query.sort) {
      const [field, sort] = query.sort.split(',');
      order[field] = sort.toUpperCase();
    } else {
      order['id'] = 'ASC';
    }

    const [result, total] = await this.profissionalTipoRepository.findAndCount({
      where: {},
      order: order,
      skip: skip,
      take: take,
    });

    return {
      results: result,
      count: total,
    };
  }

  createOne(profissional: IProfissionalTipo): Promise<ProfissionalTipo> {
    return this.profissionalTipoRepository.save(profissional);
  }

  async updateOne(
    id: number,
    profissional: IProfissionalTipo,
  ): Promise<ProfissionalTipo> {
    const profissionalDatabase = await this.findOne(id);

    // Merge
    Object.assign(profissionalDatabase, profissional);

    return this.profissionalTipoRepository.save(profissionalDatabase);
  }

  deleteOne(id: number) {
    this.profissionalTipoRepository.delete(id);
  }
}
