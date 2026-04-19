import { Module } from '@nestjs/common';
import { AppController } from './app.controller.js';
import { AppService } from './app.service.js';
import { PrismaModule } from './prisma/prisma.module.js';
import { EventsModule } from './events/events.module.js';
import { RsvpModule } from './rsvp/rsvp.module.js';
import { CategoriesModule } from './categories/categories.module.js';

@Module({
  imports: [PrismaModule, EventsModule, RsvpModule, CategoriesModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
