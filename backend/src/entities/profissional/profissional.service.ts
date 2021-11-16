import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DeleteResult } from 'typeorm';
import { EntityPagination } from '../../shared/entity-pagination.model';
import { IProfissional, Profissional } from './profissional.model';
import { ProfissionalRepository } from './profissional.repository';

@Injectable()
export class ProfissionalService {
  constructor(
    @InjectRepository(ProfissionalRepository)
    protected profissionalRepository: ProfissionalRepository,
  ) {}

  findOne(id: number): Promise<Profissional> {
    return this.profissionalRepository.findOneOrFail(id, {
      relations: ['profissionalTipo'],
    });
  }

  findAll(): Promise<Profissional[]> {
    return this.profissionalRepository.find();
  }

  async findPage(query: any): Promise<EntityPagination<Profissional>> {
    const take = parseInt(query.take) || 10;
    const page = parseInt(query.page) || 1;
    const skip = (page - 1) * take;

    const order = {};

    if (query.sort) {
      const [field, sort] = query.sort.split(',');
      order[field] = sort.toUpperCase();
    } else {
      order['id'] = 'ASC';
    }

    const [result, total] = await this.profissionalRepository.findAndCount({
      relations: ['profissionalTipo'],
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

  createOne(profissional: IProfissional): Promise<Profissional> {
    return this.profissionalRepository.save(profissional);
  }

  async updateOne(
    id: number,
    profissional: IProfissional | any,
  ): Promise<Profissional> {
    const profissionalDatabase = await this.findOne(id);

    Object.assign(profissionalDatabase, profissional);

    return this.profissionalRepository.save(profissionalDatabase);
  }

  deleteOne(id: number): Promise<DeleteResult> {
    return this.profissionalRepository.delete(id);
  }
}
