import { db } from '@/server/db';
import { createTRPCRouter, adminProcedure } from '@/server/api/trpc';
import { userIdSchema, userRoleSchema } from '@/server/schema/user';
import { buildQueryFromOptions, queryOptionsSchema } from '@/server/schema/query';
import { TRPCError } from '@trpc/server';
import { Prisma } from '@prisma/client';
import UserWhereInput = Prisma.UserWhereInput;

export const userRouter = createTRPCRouter({
  getUsers: adminProcedure
    .input(queryOptionsSchema)
    .query(async ({ input: options }) => {
      const { where, ...query } = buildQueryFromOptions(options);
      const [ users, totalUsers ] = await db.$transaction([
        db.user.findMany({
          ...query,
          where: where as UserWhereInput,
        }),
        db.user.count({
          where: where as UserWhereInput,
        }),
      ]);
      return {
        rows: users,
        meta: {
          totalCount: totalUsers,
        },
      };
    }),

  getUserWithProfilesById: adminProcedure
    .input(userIdSchema)
    .query(async ({ input: { id } }) => {
      return db.user.findFirst({
        where: {
          id: id,
        },
        include: {
          studentProfile: true,
        },
      });
    }),

  deleteUser: adminProcedure
    .input(userIdSchema)
    .mutation(async ({ input: { id } }) => {
      const user = await db.user.findFirst({
        where: {
          id: id,
        },
      });
      if (user?.role === 'SUPERADMIN') {
        throw new TRPCError({
          code: 'FORBIDDEN',
          message: 'Cannot delete user with ROOT privileges',
        });
      }
      return db.user.delete({
        where: {
          id: id,
        },
      });
    }),

  changeUserRole: adminProcedure
    .input(userRoleSchema)
    .mutation(async ({ input: { id, role } }) => {
      if (role === 'SUPERADMIN') {
        throw new TRPCError({
          code: 'FORBIDDEN',
          message: 'Only one user with ROOT privileges can exist in application',
        });
      }
      return db.user.update({
        where: {
          id: id,
        },
        data: {
          role: role,
        },
      });
    }),
});
