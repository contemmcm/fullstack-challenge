import * as bcrypt from 'bcrypt';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { IUser } from './user.model';
import { UserRepository } from './user.repository';

// This should be a real class/interface representing a user entity
export type User = any;

@Injectable()
export class UserService {
  private saltOrRounds = 10;

  constructor(
    @InjectRepository(UserRepository)
    protected userRepository: UserRepository,
  ) {}

  findOneByLogin(login: string): Promise<User> {
    return this.userRepository.findOneOrFail({ where: { login } });
  }

  findOneById(id: number): Promise<User> {
    return this.userRepository.findOneOrFail({ where: { id } });
  }

  async createOne(user: IUser): Promise<User> {
    user.password = await bcrypt.hash(user.password, this.saltOrRounds);
    const newUser = await this.userRepository.save(user);

    // Escondendo o hash da senha
    newUser.password = undefined;

    return newUser;
  }
}
