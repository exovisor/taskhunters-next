import { z } from 'zod';

export const dictionaryIdSchema = z.object({
  id: z.number(),
});

export const dictionaryCreateSchema = z.object({
  value: z.string(),
});

export const dictionaryUpdateSchema = z.object({
  id: z.number(),
  value: z.string(),
});
