import { getServerAuthSession } from '@/server/auth';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { api } from '@/trpc/server';
import { PracticeCard } from '@/components/practice/practice-card';
import { type Practice } from '@prisma/client';

export default async function StudentDashboard() {
  const session = await getServerAuthSession();

  const practices = await api.practice.getStudentPractices.query({
    studentProfileId: session!.user.studentProfileId!,
  });

  return (
    <div>
      <div className='flex justify-between items-center py-10'>
        <div className='md:ml-6 lg:ml-10'>
          <h1>Добро пожаловать, {session!.user.display_name}!</h1>
          <p className='text-sm text-muted-foreground'>Здесь вы можете просмотреть список практик</p>
        </div>
        <Link href={'/student-old/new-practices'} legacyBehavior passHref>
          <Button variant='secondary'>
            Регистрация на практику
          </Button>
        </Link>
      </div>
      <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8'>
        {practices.rows.map((practice: Practice) => {
          return (
            <PracticeCard practice={practice} key={practice.id} />
          );
        })}
      </div>
    </div>
  );
}
