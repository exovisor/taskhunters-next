import { PageHeading } from '@/components/page-headings/default-page-heading';
import { type Metadata } from 'next';
import { EditPracticeForm } from '@/components/practice/edit-practice-form';
import { getServerAuthSession } from '@/server/auth';
import { api } from '@/trpc/server';

export const metadata: Metadata = {
  title: 'Редактирование практики',
  description: 'Редактирование практики',
};

export type StudentEditPracticeProps = {
  params: {
    id: string;
  }
};

export default async function StudentEditPractice({ params }: StudentEditPracticeProps) {
  const session = await getServerAuthSession();
  const practiceId = Number(params.id);
  const practice = await api.practice.getPracticeById.query({ id: practiceId });
  if (!practice) {
    return {
      notFound: true,
    };
  }
  return (
    <>
      <PageHeading title={'Редактирование практики #' + practice.id} />
      <div className='p-4'>
        <EditPracticeForm studentProfileId={session!.user.studentProfileId!} redirectUrl='/student/practices' existingPractice={practice} />
      </div>
    </>
  );
}
