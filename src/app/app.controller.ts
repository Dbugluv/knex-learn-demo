import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { create } from '../knex/lib/common/knex.opt.database';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    create();
    return this.appService.getHello();
  }
}
