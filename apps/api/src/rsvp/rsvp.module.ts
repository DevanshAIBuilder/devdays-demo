import { Module } from '@nestjs/common';
import { RsvpController } from './rsvp.controller.js';
import { RsvpService } from './rsvp.service.js';

@Module({
  controllers: [RsvpController],
  providers: [RsvpService],
})
export class RsvpModule {}
