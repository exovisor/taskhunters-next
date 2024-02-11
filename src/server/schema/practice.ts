import { z } from 'zod';
import { queryOptionsSchema } from '@/server/schema/query';

export const studentPracticesQuerySchema = queryOptionsSchema.extend({
  studentProfileId: z.number(),
});

export const createPracticeSchema = z.object({
  studentProfileId: z.number(),

  typeId: z.number(),
  instituteId: z.number().optional(),
  specialityId: z.number().optional(),
  year: z.number().min(1).max(10),

  start_date: z.date(),
  end_date: z.date(),

  assignmentFileId: z.number(),
});
