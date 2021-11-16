import * as bcrypt from 'bcrypt';
import { Injectable } from '@nestjs/common';
import { UserService } from '../entities/user/user.service';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
  ) {}

  async validateUser(username: string, pass: string): Promise<any> {
    const user = await this.userService.findOneByLogin(username);

    if (!user) {
      return null;
    }

    const isMatch = await bcrypt.compare(pass, user.password);

    if (isMatch) {
      user.password = undefined;
      return user;
    }
    return null;
  }

  async login(user: any) {
    const payload = { sub: user.login, auth: user.authorities.join(',') };
    return {
      id_token: this.jwtService.sign(payload),
    };
  }
}
