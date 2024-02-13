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

  startDate: z.date(),
  endDate: z.date(),

  assignmentFileId: z.number(),
});

export const updatePracticeSchema = createPracticeSchema
  .extend({
    id: z.number(),
  });

export const practicePayloadSchema = createPracticeSchema
  .omit({
    instituteId: true,
    specialityId: true,
    assignmentFileId: true,
  })
  .extend({
    id: z.number(),

    instituteId: z.number().nullable(),
    specialityId: z.number().nullable(),
    assignmentFileId: z.number().nullable(),
  });

export const attachReportSchema = z.object({
  practiceId: z.number(),
  reportFileId: z.number(),
});
