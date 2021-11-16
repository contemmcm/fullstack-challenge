import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { ProfissionalTipo } from '../profissional_tipo/profissional-tipo.model';

export interface IProfissional {
  id?: number;
  nome?: string;
  telefone?: string;
  email?: string;
  profissionalTipo?: ProfissionalTipo;
  situacao?: boolean;
  updatedAt?: Date;
  createdAt?: Date;
}

@Entity()
export class Profissional extends BaseEntity implements IProfissional {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column({ nullable: false, type: 'varchar', length: 255 })
  nome: string;

  @Column({ nullable: true, type: 'varchar', length: 20 })
  telefone: string;

  @Column({ nullable: true, type: 'varchar', length: 100 })
  email: string;

  @ManyToOne(() => ProfissionalTipo)
  profissionalTipo: ProfissionalTipo;

  @Column({ nullable: true, type: 'boolean' })
  situacao: boolean;

  @UpdateDateColumn()
  updatedAt: Date;

  @CreateDateColumn()
  createdAt: Date;
}
