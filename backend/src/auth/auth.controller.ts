import { Controller, Get, Post, Request, UseGuards } from '@nestjs/common';
import { UserService } from '../entities/user/user.service';
import { AuthService } from './auth.service';
import { JwtAuthGuard } from './jwt-auth.guard';
import { LocalAuthGuard } from './local-auth.guard';

@Controller('api')
export class AuthController {
  constructor(
    private authService: AuthService,
    private userService: UserService,
  ) {}

  @UseGuards(LocalAuthGuard)
  @Post('authenticate')
  async login(@Request() req: any) {
    return this.authService.login(req.user);
  }

  @UseGuards(JwtAuthGuard)
  @Get('account')
  async getProfile(@Request() req: any) {
    const user = await this.userService.findOneByLogin(req.user.sub);
    user.password = undefined;
    return user;
  }
}
