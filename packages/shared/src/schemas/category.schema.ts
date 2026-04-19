import { z } from 'zod';

export const CategorySchema = z.object({
  id: z.number().int(),
  name: z.string(),
  slug: z.string(),
  color: z.string(),
});

export type Category = z.infer<typeof CategorySchema>;
