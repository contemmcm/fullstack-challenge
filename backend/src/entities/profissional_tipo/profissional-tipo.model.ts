import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

export interface IProfissionalTipo {
  id?: number;
  descricao?: string;
  situacao?: boolean;
  updatedAt?: Date;
  createdAt?: Date;
}

@Entity()
export class ProfissionalTipo extends BaseEntity implements IProfissionalTipo {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column({ nullable: false, type: 'varchar', length: 255, unique: true })
  descricao: string;

  @Column({ nullable: false, type: 'boolean', default: true })
  situacao: boolean;

  @UpdateDateColumn()
  updatedAt: Date;

  @CreateDateColumn()
  createdAt: Date;
}
