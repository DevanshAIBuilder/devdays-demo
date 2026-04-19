import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service.js';

interface FindAllOptions {
  category?: string;
  status?: string;
  search?: string;
  featured?: boolean;
  page: number;
  limit: number;
}

@Injectable()
export class EventsService {
  constructor(private readonly prisma: PrismaService) {}

  async findAll({ category, status, search, featured, page, limit }: FindAllOptions) {
    const where: Record<string, unknown> = {};

    if (status) {
      where['status'] = status;
    }

    if (featured) {
      where['isFeatured'] = true;
    }

    if (category) {
      where['category'] = { slug: category };
    }

    if (search) {
      where['OR'] = [
        { title: { contains: search } },
        { description: { contains: search } },
        { tags: { contains: search } },
        { organizer: { contains: search } },
      ];
    }

    const [total, events] = await Promise.all([
      this.prisma.event.count({ where }),
      this.prisma.event.findMany({
        where,
        include: { category: true },
        orderBy: [{ isFeatured: 'desc' }, { date: 'asc' }],
        skip: (page - 1) * limit,
        take: limit,
      }),
    ]);

    return {
      data: events,
      total,
      page,
      limit,
      totalPages: Math.ceil(total / limit),
    };
  }

  async findOne(id: number) {
    const event = await this.prisma.event.findUnique({
      where: { id },
      include: {
        category: true,
        comments: { orderBy: { createdAt: 'desc' } },
        _count: { select: { rsvps: true } },
      },
    });

    if (!event) {
      throw new NotFoundException(`Event #${id} not found`);
    }

    return event;
  }
}
