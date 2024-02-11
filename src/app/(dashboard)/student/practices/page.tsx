import { PageHeading } from '@/components/page-headings/default-page-heading';
import { type Metadata } from 'next';
import { Button } from '@/components/ui/button';
import { Plus } from 'lucide-react';
import Link from 'next/link';
import { getServerAuthSession } from '@/server/auth';
import StudentPracticeList from '@/app/(dashboard)/student/practices/data-view';

export const metadata: Metadata = {
  title: 'Список практик',
  description: 'Список моих практик',
};

export default async function StudentPracticePage() {
  const session = await getServerAuthSession();
  return (
    <>
      <PageHeading title={'Список практик'}>
        <Link href={'/student/practices/create'} passHref legacyBehavior>
          <Button variant='secondary'><Plus className='mr-2 h-4 w-4'/>Добавить практику</Button>
        </Link>
      </PageHeading>
      <StudentPracticeList studentProfileId={session!.user.studentProfileId! } />
    </>
  );
}
