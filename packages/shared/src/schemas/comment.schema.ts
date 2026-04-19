import { z } from 'zod';

export const CommentSchema = z.object({
  id: z.number().int(),
  text: z.string(),
  author: z.string(),
  eventId: z.number().int(),
  createdAt: z.coerce.date(),
});

export const CreateCommentSchema = z.object({
  text: z.string().min(1).max(1000),
  author: z.string().min(2).max(100),
  eventId: z.number().int().positive(),
});

export type Comment = z.infer<typeof CommentSchema>;
export type CreateCommentDto = z.infer<typeof CreateCommentSchema>;
