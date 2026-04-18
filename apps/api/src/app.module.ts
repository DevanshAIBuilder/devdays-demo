import { Module } from '@nestjs/common';
import { AppController } from './app.controller.js';
import { AppService } from './app.service.js';
import { PrismaModule } from './prisma/prisma.module.js';
import { MeetupsModule } from './meetups/meetups.module.js';
import { RsvpModule } from './rsvp/rsvp.module.js';

@Module({
  imports: [PrismaModule, MeetupsModule, RsvpModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
