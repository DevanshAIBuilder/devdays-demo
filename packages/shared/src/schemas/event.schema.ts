import { z } from 'zod';

export const EventSchema = z.object({
  id: z.number().int(),
  title: z.string(),
  slug: z.string(),
  description: z.string(),
  date: z.string(),
  time: z.string(),
  endDate: z.string().nullable(),
  endTime: z.string().nullable(),
  venue: z.string(),
  address: z.string(),
  city: z.string(),
  organizer: z.string(),
  organizerUrl: z.string().nullable(),
  imageUrl: z.string().nullable(),
  registrationUrl: z.string().nullable(),
  maxAttendees: z.number().int().nullable(),
  status: z.enum(['upcoming', 'ongoing', 'completed']),
  isFeatured: z.boolean(),
  tags: z.string(),
  categoryId: z.number().int().nullable(),
  createdAt: z.coerce.date(),
  updatedAt: z.coerce.date(),
});

export const CreateEventSchema = z.object({
  title: z.string().min(3).max(200),
  slug: z.string().min(3).max(200),
  description: z.string().min(10),
  date: z.string(),
  time: z.string().default(''),
  endDate: z.string().optional(),
  endTime: z.string().optional(),
  venue: z.string().default(''),
  address: z.string().default(''),
  city: z.string().default('Lucknow'),
  organizer: z.string().default(''),
  organizerUrl: z.string().url().optional(),
  imageUrl: z.string().url().optional(),
  registrationUrl: z.string().url().optional(),
  maxAttendees: z.number().int().positive().optional(),
  status: z.enum(['upcoming', 'ongoing', 'completed']).default('upcoming'),
  isFeatured: z.boolean().default(false),
  tags: z.string().default(''),
  categoryId: z.number().int().positive().optional(),
});

export type Event = z.infer<typeof EventSchema>;
export type CreateEventDto = z.infer<typeof CreateEventSchema>;
