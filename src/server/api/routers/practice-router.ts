import { createTRPCRouter, studentProcedure } from '@/server/api/trpc';
import { createPracticeSchema, studentPracticesQuerySchema } from '@/server/schema/practice';
import { db } from '@/server/db';
import { buildQueryFromOptions } from '@/server/schema/query';
import { type Prisma } from '@prisma/client';

export const practiceRouter = createTRPCRouter({
  getStudentPractices: studentProcedure
    .input(studentPracticesQuerySchema)
    .query(async ({ input }) => {
      const { where, ...query } = buildQueryFromOptions(input);
      const [ practices, count ] = await db.$transaction([
        db.practice.findMany({
          where: {
            ...where as Prisma.PracticeWhereInput,
            studentProfileId: input.studentProfileId,
          },
          ...query,
          include: {
            type: true,
            institute: true,
            speciality: true,
            assignmentFile: true,
          },
        }),
        db.practice.count({
          where: {
            ...where as Prisma.PracticeWhereInput,
            studentProfileId: input.studentProfileId,
          },
        }),
      ]);
      return {
        rows: practices,
        meta: {
          totalCount: count,
        },
      };
    }),

  createPractice: studentProcedure
    .input(createPracticeSchema)
    .mutation(async ({ input }) => {
      return db.practice.create({
        data: {
          ...input,
        },
      });
    }),
});
