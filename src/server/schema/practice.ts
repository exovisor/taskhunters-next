import { z } from 'zod';

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
