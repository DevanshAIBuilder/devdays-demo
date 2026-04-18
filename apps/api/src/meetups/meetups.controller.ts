import { Controller, Get } from '@nestjs/common';
import { MeetupsService } from './meetups.service.js';

@Controller('meetups')
export class MeetupsController {
  constructor(private readonly meetupsService: MeetupsService) {}

  @Get()
  findAll() {
    return this.meetupsService.findAll();
  }
}
