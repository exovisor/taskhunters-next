import { PrismaClient } from '@prisma/client';
import { Cron } from 'cron-async';
import fs from 'fs';

const prisma = new PrismaClient();

export function createCron() {
  const cron = new Cron();

  /*
    * Clear unused files
    * Every day at 00:00
    *
    * Delete files that are not assigned to any report or assignment and are older than 1 day
   */
  cron.createJob('Clear unused files', {
    cron: '0 0 * * *',
    onTick: async () => {
      const files = await prisma.file.findMany({
        where: {
          AND: [
            {
              assignments: {
                none: {},
              },
            },
            {
              reports: {
                none: {},
              },
            },
            {
              createdAt: {
                lte: new Date(Date.now() - 1000 * 60 * 60 * 24), // 1 day
              },
            },
          ],
        },
      });

      await Promise.all(files.map(async (/** @type {{ id: number; }} */ file) => {
        const res = await prisma.file.delete({
          where: {
            id: file.id,
          },
        });
        if (!res?.uploadedById || !res.path) return;
        fs.unlink(`uploads/${res.uploadedById}/${res.path}`, (err) => {
          if (err) console.error(`> Error deleting file ${res.id}: ${err.message}`);
        });
        console.info(`> File ${res.id}:${res.path} deleted`);
      }));
    },
  });

  console.info('> Cron started');
}
