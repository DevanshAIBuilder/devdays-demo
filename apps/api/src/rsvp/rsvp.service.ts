import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service.js';
import type { RsvpDto } from '@repo/shared';

@Injectable()
export class RsvpService {
  constructor(private readonly prisma: PrismaService) {}

  create(dto: RsvpDto) {
    return this.prisma.rsvp.create({
      data: {
        eventId: dto.eventId,
        name: dto.name,
        email: dto.email,
      },
    });
  }
}
