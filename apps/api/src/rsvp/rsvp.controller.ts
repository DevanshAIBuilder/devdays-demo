import { Body, Controller, HttpCode, Post } from '@nestjs/common';
import { RsvpService } from './rsvp.service.js';
import { RsvpSchema } from '@repo/shared';

@Controller('rsvp')
export class RsvpController {
  constructor(private readonly rsvpService: RsvpService) {}

  @Post()
  @HttpCode(201)
  create(@Body() body: unknown) {
    const dto = RsvpSchema.parse(body);
    return this.rsvpService.create(dto);
  }
}
