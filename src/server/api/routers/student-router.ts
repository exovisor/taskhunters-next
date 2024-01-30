import { db } from '@/server/db';
import {createTRPCRouter, studentProcedure} from '@/server/api/trpc';
import {studentProfileIdSchema, updateStudentProfileSchema} from '@/server/schema/user';
import {TRPCError} from '@trpc/server';

export const studentRouter = createTRPCRouter({
  getProfileByUserId: studentProcedure
    .input(studentProfileIdSchema)
    .query(async ({ input: { id }}) => {
      return db.studentProfile.findFirst({
        where: {
          id: id,
        },
      });
    }),
  createOrUpdateStudentProfile: studentProcedure
    .input(updateStudentProfileSchema)
    .mutation(async ({ ctx, input: profile}) => {
      if (ctx.session.user.role === 'STUDENT' && ctx.session.user.id !== profile.userId) {
        throw new TRPCError({
          code: 'FORBIDDEN',
          message: 'User Ids don\'t match',
        });
      }
      return db.user.update({
        where: { id: profile.userId },
        data: {
          email: profile.email,
          studentProfile: {
            upsert: {
              create: { fullname: profile.fullname, phone: profile.phone },
              update: { fullname: profile.fullname, phone: profile.phone},
            },
          },
        },
      });
    }),
});
