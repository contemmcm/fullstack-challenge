import * as typeorm from 'typeorm';

export interface IUser {
  id?: number;
  login?: string;
  password?: string;
  firstName?: string;
  lastName?: string;
  email?: string;
  imageUrl?: string;
  langKey?: string;
  createdBy?: string;
  createdDate?: Date;
  lastModifiedBy?: string;
  lastModifiedDate?: Date;
  authorities?: string[];
}

@typeorm.Entity()
export class User extends typeorm.BaseEntity implements IUser {
  @typeorm.PrimaryGeneratedColumn('increment')
  id: number;

  @typeorm.Column({
    nullable: false,
    type: 'varchar',
    length: 255,
    unique: true,
  })
  login: string;

  @typeorm.Column({ nullable: true, type: 'varchar', length: 255 })
  password: string;

  @typeorm.Column({ nullable: true, type: 'varchar', length: 255 })
  firstName: string;

  @typeorm.Column({ nullable: true, type: 'varchar', length: 255 })
  lastName: string;

  @typeorm.Column({ nullable: true, type: 'varchar', length: 255 })
  email: string;

  @typeorm.Column({ nullable: true, type: 'varchar', length: 255 })
  imageUrl: string;

  @typeorm.Column({
    nullable: true,
    type: 'varchar',
    length: 255,
    default: 'pt-br',
  })
  langKey: string;

  @typeorm.Column({ nullable: true, type: 'varchar', length: 255 })
  createdBy: string;

  @typeorm.CreateDateColumn()
  createdDate: Date;

  @typeorm.Column({ nullable: true, type: 'varchar', length: 255 })
  lastModifiedBy: string;

  @typeorm.UpdateDateColumn()
  lastModifiedDate: Date;

  @typeorm.Column('text', { array: true, default: ['ROLE_USER'] })
  authorities: string[];
}
