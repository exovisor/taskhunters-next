import { createTRPCRouter, studentProcedure } from '@/server/api/trpc';
import { createPracticeSchema, studentPracticesQuerySchema } from '@/server/schema/practice';
import { db } from '@/server/db';
import { buildQueryFromOptions } from '@/server/schema/query';
import { type Prisma } from '@prisma/client';
import { dictionaryIdSchema } from '@/server/schema/dictionary';
import { TRPCError } from '@trpc/server';

export const practiceRouter = createTRPCRouter({
  getStudentPractices: studentProcedure
    .input(studentPracticesQuerySchema)
    .query(async ({ input, ctx }) => {
      if (!ctx.session?.user) {
        throw new TRPCError({
          code: 'UNAUTHORIZED',
          message: 'You must be logged in to upload files',
        });
      }
      if (![ 'SUPERADMIN', 'ADMIN' ].includes(ctx.session.user.role) && input.studentProfileId !== ctx.session.user.studentProfileId) {
        throw new TRPCError({
          code: 'FORBIDDEN',
          message: 'You are not allowed to download this file',
        });
      }
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

  getPracticeById: studentProcedure
    .input(dictionaryIdSchema)
    .query(async ({ input, ctx }) => {
      if (!ctx.session?.user) {
        throw new TRPCError({
          code: 'UNAUTHORIZED',
          message: 'You must be logged in to upload files',
        });
      }
      const practice = await db.practice.findFirst({
        where: {
          id: input.id,
        },
        include: {
          type: true,
          institute: true,
          speciality: true,
          assignmentFile: true,
          reportFile: true,
        },
      });
      if (!practice) {
        throw new TRPCError({
          code: 'NOT_FOUND',
          message: 'File not found',
        });
      }
      if (![ 'SUPERADMIN', 'ADMIN' ].includes(ctx.session.user.role) && practice.studentProfileId !== ctx.session.user.studentProfileId) {
        throw new TRPCError({
          code: 'FORBIDDEN',
          message: 'You are not allowed to download this file',
        });
      }
      return practice;
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
