import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Get('/management/info')
  getManagementInfo() {
    return {
      'display-ribbon-on-profiles': 'dev',
      git: {},
      activeProfiles: ['dev'],
    };
  }
}
