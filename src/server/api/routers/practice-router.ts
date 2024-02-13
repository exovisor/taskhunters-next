import { createTRPCRouter, studentProcedure } from '@/server/api/trpc';
import {
  attachReportSchema,
  createPracticeSchema,
  studentPracticesQuerySchema,
  updatePracticeSchema
} from '@/server/schema/practice';
import { db } from '@/server/db';
import { buildQueryFromOptions } from '@/server/schema/query';
import { type Prisma } from '@prisma/client';
import { dictionaryIdSchema } from '@/server/schema/dictionary';
import { TRPCError } from '@trpc/server';
import { deleteFile } from '@/server/api/routers/file-router';

export const practiceRouter = createTRPCRouter({
  getStudentPractices: studentProcedure
    .input(studentPracticesQuerySchema)
    .query(async ({ input, ctx }) => {
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
    .mutation(async ({ input, ctx }) => {
      if (ctx.session?.user.role === 'STUDENT') {
        input.studentProfileId = ctx.session.user.studentProfileId!;
      }
      return db.practice.create({
        data: {
          ...input,
        },
      });
    }),

  deletePractice: studentProcedure
    .input(dictionaryIdSchema)
    .mutation(async ({ input, ctx }) => {
      const practice = await db.practice.findFirst({
        where: {
          id: input.id,
        },
        include: {
          assignmentFile: true,
          reportFile: true,
        }
      });
      if (!practice) {
        throw new TRPCError({
          code: 'NOT_FOUND',
          message: 'Practice not found',
        });
      }
      // Only admin can delete practices with status other than UNVERIFIED
      if (ctx.session.user.role === 'STUDENT' && practice.status !== 'UNVERIFIED') {
        throw new TRPCError({
          code: 'FORBIDDEN',
          message: 'You are not allowed to delete this practice',
        });
      }
      // Only admin can delete practices of other students
      if (ctx.session.user.role === 'STUDENT' && practice.studentProfileId !== ctx.session.user.studentProfileId) {
        throw new TRPCError({
          code: 'FORBIDDEN',
          message: 'You are not allowed to delete this practice',
        });
      }
      // Delete files
      if (practice.assignmentFile) {
        await deleteFile(practice.assignmentFile);
      }
      if (practice.reportFile) {
        await deleteFile(practice.reportFile);
      }
      return db.practice.delete({
        where: {
          id: input.id,
        },
      });
    }),

  updateUnverifiedPractice: studentProcedure
    .input(updatePracticeSchema)
    .mutation(async ({ input, ctx }) => {
      const practice = await db.practice.findFirst({
        where: {
          id: input.id,
        },
        include: {
          assignmentFile: true,
        },
      });
      if (!practice) {
        throw new TRPCError({
          code: 'NOT_FOUND',
          message: 'Practice not found',
        });
      }
      // Only admin can update practices with status other than UNVERIFIED
      if (ctx.session.user.role === 'STUDENT' && ![ 'UNVERIFIED', 'REJECTED' ].includes(practice.status)) {
        throw new TRPCError({
          code: 'FORBIDDEN',
          message: 'You are not allowed to update this practice',
        });
      }
      // Only admin can update practices of other students
      if (ctx.session.user.role === 'STUDENT' && practice.studentProfileId !== ctx.session.user.studentProfileId) {
        throw new TRPCError({
          code: 'FORBIDDEN',
          message: 'You are not allowed to update this practice',
        });
      }
      // Delete old files if new files are uploaded
      if (input.assignmentFileId !== practice.assignmentFileId && practice.assignmentFile) {
        await deleteFile(practice.assignmentFile);
      }
      return db.practice.update({
        where: {
          id: input.id,
        },
        data: {
          ...input,
          status: 'UNVERIFIED',
        },
      });
    }),

  attachReportFile: studentProcedure
    .input(attachReportSchema)
    .mutation(async ({ input, ctx }) => {
      const practice = await db.practice.findFirst({
        where: {
          id: input.practiceId,
        },
        include: {
          reportFile: true,
        },
      });
      if (!practice) {
        throw new TRPCError({
          code: 'NOT_FOUND',
          message: 'Practice not found',
        });
      }
      // Only admin can attach files to practices with status other than UNVERIFIED
      if (ctx.session.user.role === 'STUDENT' && ![ 'VERIFIED', 'REPORT_PENDING', 'REPORT_REJECTED' ].includes(practice.status)) {
        throw new TRPCError({
          code: 'FORBIDDEN',
          message: 'You are not allowed to attach files to this practice',
        });
      }
      // Only admin can attach files to practices of other students
      if (ctx.session.user.role === 'STUDENT' && practice.studentProfileId !== ctx.session.user.studentProfileId) {
        throw new TRPCError({
          code: 'FORBIDDEN',
          message: 'You are not allowed to attach files to this practice',
        });
      }
      // Delete old file if new file is uploaded
      if (practice.reportFile) {
        await deleteFile(practice.reportFile);
      }
      return db.practice.update({
        where: {
          id: input.practiceId,
        },
        data: {
          status: 'REPORT_PENDING',
          reportFileId: input.reportFileId,
        },
      });
    }),
});
