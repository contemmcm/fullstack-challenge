import { Body, Controller, Post } from '@nestjs/common';
import { IUser } from './user.model';
import { UserService } from './user.service';

@Controller('api/v1/user')
export class UserController {
  constructor(protected userService: UserService) {}

  @Post()
  createOne(@Body() user: IUser) {
    return this.userService.createOne(user);
  }
}
