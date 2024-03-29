import { createTRPCRouter, protectedProcedure } from '@/server/api/trpc';
import { dictionaryIdSchema } from '@/server/schema/dictionary';
import { db } from '@/server/db';
import { userIdSchema } from '@/server/schema/user';
import path from 'path';
import fs from 'fs';
import { TRPCError } from '@trpc/server';
import { env } from '@/env';
import { type File } from '@prisma/client';

export async function deleteFile(fileInfo: File) {
  const uploadPath = path.join(env.FILE_UPLOAD_PATH, fileInfo.uploadedById);

  try {
    const fullPath = path.join(uploadPath, fileInfo.path);
    await fs.promises.unlink(fullPath);
    await db.file.delete({
      where: {
        id: fileInfo.id,
      },
    });
    return true;
  } catch (e: unknown) {
    throw new TRPCError({
      code: 'INTERNAL_SERVER_ERROR',
      message: 'Error while deleting file',
    });
  }
}

export const fileRouter = createTRPCRouter({
  getFileInfoById: protectedProcedure
    .input(dictionaryIdSchema)
    .query(async ({ input: { id }, ctx }) => {
      if (!ctx.session?.user) {
        throw new TRPCError({
          code: 'UNAUTHORIZED',
          message: 'You must be logged in to upload files',
        });
      }
      const file = await db.file.findFirst({
        where: {
          id: id,
        },
      });
      if (!file) {
        throw new TRPCError({
          code: 'NOT_FOUND',
          message: 'File not found',
        });
      }
      if (![ 'SUPERADMIN', 'ADMIN' ].includes(ctx.session.user.role) && file.uploadedById !== ctx.session.user.id) {
        throw new TRPCError({
          code: 'FORBIDDEN',
          message: 'You are not allowed to download this file',
        });
      }
      return file;
    }),

  getAllFilesByUserId: protectedProcedure
    .input(userIdSchema)
    .query(async ({ input: { id }, ctx }) => {
      if (!ctx.session?.user) {
        throw new TRPCError({
          code: 'UNAUTHORIZED',
          message: 'You must be logged in to upload files',
        });
      }
      if (![ 'SUPERADMIN', 'ADMIN' ].includes(ctx.session.user.role) && id !== ctx.session.user.id) {
        throw new TRPCError({
          code: 'FORBIDDEN',
          message: 'You are not allowed to download this file',
        });
      }
      return db.file.findMany({
        where: {
          uploadedById: id,
        },
      });
    }),

  deleteFileById: protectedProcedure
    .input(dictionaryIdSchema)
    .mutation(async ({ input: { id }, ctx }) => {
      if (!ctx.session || !ctx.session.user) {
        throw new TRPCError({
          code: 'UNAUTHORIZED',
          message: 'You must be logged in to upload files',
        });
      }
      const fileInfo = await db.file.findFirst({
        where: {
          id: id,
        },
      });

      if (!fileInfo) {
        throw new TRPCError({
          code: 'NOT_FOUND',
          message: 'File not found',
        });
      }

      if (![ 'SUPERADMIN', 'ADMIN' ].includes(ctx.session.user.role) && fileInfo.uploadedById !== ctx.session.user.id) {
        throw new TRPCError({
          code: 'FORBIDDEN',
          message: 'You are not allowed to download this file',
        });
      }

      await deleteFile(fileInfo);
    }),
});
