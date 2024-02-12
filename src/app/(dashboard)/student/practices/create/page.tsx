import { PageHeading } from '@/components/page-headings/default-page-heading';
import { type Metadata } from 'next';
import { CreatePracticeForm } from '@/components/practice/create-practice-form';
import { getServerAuthSession } from '@/server/auth';

export const metadata: Metadata = {
  title: 'Создать практику',
  description: 'Создание новой практики',
};

export default async function StudentCreatePractice() {
  const session = await getServerAuthSession();
  return (
    <>
      <PageHeading title={'Создать практику'} />
      <div className='p-4'>
        <CreatePracticeForm studentProfileId={session!.user.studentProfileId!} redirectUrl='/student/practices' />
      </div>
    </>
  );
}
