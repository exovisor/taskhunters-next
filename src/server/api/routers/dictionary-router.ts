import { adminProcedure, createTRPCRouter, protectedProcedure } from '@/server/api/trpc';
import {
  dictionaryCreateSchema,
  dictionaryIdSchema,
  dictionaryUpdateSchema,
} from '@/server/schema/dictionary';
import { db } from '@/server/db';
import { buildQueryFromOptions, queryOptionsSchema } from '@/server/schema/query';
import type { Prisma } from '@prisma/client';

export const dictionaryRouter = createTRPCRouter({
  // Institute CRUD
  getInstitutes: protectedProcedure
    .input(queryOptionsSchema)
    .query(async ({ input: options }) => {
      const { where, ...query } = buildQueryFromOptions(options);
      const [ institutes, totalInstitutes ] = await db.$transaction([
        db.institute.findMany({
          ...query,
          where: where as Prisma.InstituteWhereInput,
        }),
        db.institute.count({
          where: where as Prisma.InstituteWhereInput,
        }),
      ]);
      return {
        rows: institutes,
        meta: {
          totalCount: totalInstitutes,
        },
      };
    }),
  createInstitute: adminProcedure
    .input(dictionaryCreateSchema)
    .mutation(async ({ input: { value } }) => {
      return db.institute.create({
        data: {
          value: value,
        },
      });
    }),
  updateInstitute: adminProcedure
    .input(dictionaryUpdateSchema)
    .mutation(async ({ input: { id, value } }) => {
      return db.institute.update({
        where: {
          id: id,
        },
        data: {
          value: value,
        },
      });
    }),
  deleteInstitute: adminProcedure
    .input(dictionaryIdSchema)
    .mutation(async ({ input: { id } }) => {
      return db.institute.delete({
        where: {
          id: id,
        },
      });
    }),

  // Specialty CRUD
  getSpecialties: protectedProcedure
    .input(queryOptionsSchema)
    .query(async ({ input: options }) => {
      const { where, ...query } = buildQueryFromOptions(options);
      const [ specialties, totalSpecialties ] = await db.$transaction([
        db.specialty.findMany({
          ...query,
          where: where as Prisma.SpecialtyWhereInput,
        }),
        db.specialty.count({
          where: where as Prisma.SpecialtyWhereInput,
        }),
      ]);
      return {
        rows: specialties,
        meta: {
          totalCount: totalSpecialties,
        },
      };
    }),
  createSpecialty: adminProcedure
    .input(dictionaryCreateSchema)
    .mutation(async ({ input: { value } }) => {
      return db.specialty.create({
        data: {
          value: value,
        },
      });
    }),
  updateSpecialty: adminProcedure
    .input(dictionaryUpdateSchema)
    .mutation(async ({ input: { id, value } }) => {
      return db.specialty.update({
        where: {
          id: id,
        },
        data: {
          value: value,
        },
      });
    }),
  deleteSpecialty: adminProcedure
    .input(dictionaryIdSchema)
    .mutation(async ({ input: { id } }) => {
      return db.specialty.delete({
        where: {
          id: id,
        },
      });
    }),

  // PracticeType CRUD
  getPracticeTypes: protectedProcedure
    .input(queryOptionsSchema)
    .query(async ({ input: options }) => {
      const { where, ...query } = buildQueryFromOptions(options);
      const [ practiceTypes, totalPracticeTypes ] = await db.$transaction([
        db.practiceType.findMany({
          ...query,
          where: where as Prisma.PracticeTypeWhereInput,
        }),
        db.practiceType.count({
          where: where as Prisma.PracticeTypeWhereInput,
        }),
      ]);
      return {
        rows: practiceTypes,
        meta: {
          totalCount: totalPracticeTypes,
        },
      };
    }),
  createPracticeType: adminProcedure
    .input(dictionaryCreateSchema)
    .mutation(async ({ input: { value } }) => {
      return db.practiceType.create({
        data: {
          value: value,
        },
      });
    }),
  updatePracticeType: adminProcedure
    .input(dictionaryUpdateSchema)
    .mutation(async ({ input: { id, value } }) => {
      return db.practiceType.update({
        where: {
          id: id,
        },
        data: {
          value: value,
        },
      });
    }),
  deletePracticeType: adminProcedure
    .input(dictionaryIdSchema)
    .mutation(async ({ input: { id } }) => {
      return db.practiceType.delete({
        where: {
          id: id,
        },
      });
    }),
});
