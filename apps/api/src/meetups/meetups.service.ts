import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service.js';

@Injectable()
export class MeetupsService {
  constructor(private readonly prisma: PrismaService) {}

  findAll() {
    return this.prisma.meetup.findMany();
  }
}
