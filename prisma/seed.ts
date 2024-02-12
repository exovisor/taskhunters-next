import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const practiceTypes = [
  'Учебная',
  'Производственная',
  'Преддипломная',
];

const institutes = [
  'РАНХиГС',
  'ИТМО',
];

const specialties = [
  '09.02.03 Прикладная информатика',
  '09.02.04 Информационные системы и технологии',
  '09.02.05 Программная инженерия',
];

function createDictionary(data: string[]) {
  return data.map((value) => ({ value }));
}

async function main() {
  // Seed dictionaries

  // Practice types
  await prisma.practiceType.createMany({
    data: createDictionary(practiceTypes),
  });

  // Institutes
  await prisma.institute.createMany({
    data: createDictionary(institutes),
  });

  // Educational programs
  await prisma.specialty.createMany({
    data: createDictionary(specialties),
  });
}

main()
  .then(async () => {
    await prisma.$disconnect();
    console.log('> Data seeding finished.');
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
