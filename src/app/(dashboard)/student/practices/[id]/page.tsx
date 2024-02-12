import { type Metadata } from 'next';
import { api } from '@/trpc/server';
import { PageHeading } from '@/components/page-headings/default-page-heading';
import { type Prisma } from '@prisma/client';
import { getStatusByValue } from '@/lib/status';
import { FileCard } from '@/components/uploads/file-card';
import { Button } from '@/components/ui/button';
import { Pencil, Trash2 } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Информация о практике',
  description: 'Информация о практике'
};

export type PracticeViewPageProps = {
  params: {
    id: string;
  }
};

type PracticePayload = Prisma.PracticeGetPayload<{
  include: {
    type: true,
    institute: true,
    speciality: true,
    assignmentFile: true,
    reportFile: true,
  }
}>;

export default async function PracticeViewPage({ params }: PracticeViewPageProps) {
  const practice: PracticePayload = await api.practice.getPracticeById.query({ id: Number(params.id) });
  return (
    <>
      <PageHeading title={`${practice.type.value} практика #${practice.id}`}>
        {
          practice.status !== 'COMPLETED' &&
          <Button variant='outline'>
            <Pencil className='mr-2 h-4 w-4'/>
            Редактировать
          </Button>
        }
        {
          practice.status === 'UNVERIFIED' &&
          <Button variant='destructive'>
            <Trash2 className='mr-2 h-4 w-4' />
            Удалить
          </Button>
        }
      </PageHeading>
      <div>
        <div className='px-4 py-5 sm:p-0'>
          <dl className='sm:divide-y sm:divide-border'>
            <div className='py-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6 sm:py-5'>
              <dt className='text-sm font-medium text-muted-foreground'>Статус</dt>
              <dd className='mt-1 text-sm sm:col-span-2 sm:mt-0'>
                {getStatusByValue(practice.status)?.label}
              </dd>
            </div>
            {practice.rejectionMessage && (
              <div className='py-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6 sm:py-5'>
                <dt className='text-sm font-medium text-muted-foreground'>Причина отказа</dt>
                <dd className='mt-1 text-sm sm:col-span-2 sm:mt-0'>
                  {practice.rejectionMessage}
                </dd>
              </div>
            )}
            <div className='py-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6 sm:py-5'>
              <dt className='text-sm font-medium text-muted-foreground'>Детали заявки</dt>
              <dd className='mt-1 text-sm sm:col-span-2 sm:mt-0'>
                {JSON.stringify(practice)}
              </dd>
            </div>
            <div className='py-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6 sm:py-5'>
              <dt className='text-sm font-medium text-muted-foreground'>Файлы</dt>
              <dd className='mt-1 text-sm sm:col-span-2 sm:mt-0 flex flex-col gap-2'>
                <span>Направление</span>
                { practice.assignmentFile && <FileCard file={practice.assignmentFile} editable={false} /> }
                <span className='mt-2'>Отчет</span>
                { practice.reportFile && <FileCard file={practice.reportFile} editable={false} /> }
              </dd>
            </div>
          </dl>
        </div>
      </div>
    </>
  );
}
