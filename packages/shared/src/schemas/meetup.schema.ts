import { z } from 'zod';

export const MeetupSchema = z.object({
  id: z.number().int(),
  title: z.string(),
  date: z.string(),
  description: z.string(),
});

export type Meetup = z.infer<typeof MeetupSchema>;
