import { z } from 'zod';

export const dictionaryIdSchema = z.object({
  id: z.number(),
});

export const dictionaryCreateSchema = z.object({
  name: z.string(),
});

export const dictionaryUpdateSchema = z.object({
  id: z.number(),
  name: z.string(),
});
