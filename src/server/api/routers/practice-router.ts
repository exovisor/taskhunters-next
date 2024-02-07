import {createTRPCRouter, studentProcedure} from '@/server/api/trpc';
import {createPracticeSchema} from '@/server/schema/practice';
import {db} from '@/server/db';

export const practiceRouter = createTRPCRouter({

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
