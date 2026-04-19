import { z } from 'zod';

export const RsvpSchema = z.object({
  eventId: z.number().int().positive(),
  name: z.string().min(2).max(100),
  email: z.string().email(),
});

export type RsvpDto = z.infer<typeof RsvpSchema>;
