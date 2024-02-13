import { type Metadata } from 'next';
import { api } from '@/trpc/server';
import { PageHeading } from '@/components/page-headings/default-page-heading';
import { type Prisma } from '@prisma/client';
import { getStatusByValue } from '@/lib/status';
import { FileCard } from '@/components/uploads/file-card';
import { Button } from '@/components/ui/button';
import { ChevronsUpDown, Pencil } from 'lucide-react';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';
import { format } from 'date-fns';
import { ru } from 'date-fns/locale';
import React from 'react';
import { DeletePracticeButton } from '@/components/practice/delete-practice-button';

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

function DetailItem({ title, children }: { title: string, children: React.ReactNode }) {
  return (
    <div className='sm:grid sm:grid-cols-3 sm:gap-4 px-6 py-5 odd:bg-muted'>
      <dt className='text-sm font-medium text-muted-foreground'>
        {title}
      </dt>
      <dd className='mt-1 text-sm sm:col-span-2 sm:mt-0'>
        {children}
      </dd>
    </div>
  );
}

export default async function PracticeViewPage({ params }: PracticeViewPageProps) {
  const practice: PracticePayload = await api.practice.getPracticeById.query({ id: Number(params.id) });
  return (
    <>
      <PageHeading title={`${practice.type.value} практика #${practice.id}`}>
        {practice.status !== 'COMPLETED' && (
          <Button variant='outline'>
            <Pencil className='mr-2 h-4 w-4' />
            Редактировать
          </Button>
        )}
        {practice.status === 'UNVERIFIED' && (
          <DeletePracticeButton practiceId={practice.id} redirectUrl={'/student/practices'} />
        )}
      </PageHeading>
      <div>
        <div className='px-4 py-5 sm:p-0'>
          <dl className='sm:divide-y sm:divide-border'>
            <div className='py-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6 sm:py-5'>
              <dt className='text-sm font-medium text-muted-foreground'>
                Статус
              </dt>
              <dd className='mt-1 text-sm sm:col-span-2 sm:mt-0'>
                {getStatusByValue(practice.status)?.label}
                <span className='text-muted-foreground block mt-2'>
                  Последнее обновление: {format(practice.updatedAt, 'PPPp', { locale: ru })}
                </span>
              </dd>
            </div>
            {practice.rejectionMessage && (
              <div className='py-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6 sm:py-5'>
                <dt className='text-sm font-medium text-muted-foreground'>
                  Причина отказа
                </dt>
                <dd className='mt-1 text-sm sm:col-span-2 sm:mt-0'>
                  {practice.rejectionMessage}
                </dd>
              </div>
            )}
            <div className='py-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6 sm:py-5'>
              <dt className='text-sm font-medium text-muted-foreground'>
                Период практики
              </dt>
              <dd className='mt-1 text-sm sm:col-span-2 sm:mt-0'>
                <time dateTime={practice.startDate.toISOString()}>
                  {format(practice.startDate, 'PPP', { locale: ru })}
                </time>
                {' '}&mdash;{' '}
                <time dateTime={practice.endDate.toISOString()}>
                  {format(practice.endDate, 'PPP', { locale: ru })}
                </time>
              </dd>
            </div>
            <div className='py-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6 sm:py-5'>
              <dt className='text-sm font-medium text-muted-foreground'>
                Детали заявки
              </dt>
              <dd className='mt-1 text-sm sm:col-span-2 sm:mt-0'>
                <Collapsible>
                  <CollapsibleTrigger>
                    <span className='flex items-center border-b border-dashed text-sm text-muted-foreground hover:text-foreground'>
                      Подробная информация
                      <ChevronsUpDown className='ml-2 h-4 w-4' />
                    </span>
                  </CollapsibleTrigger>
                  <CollapsibleContent>
                    <dl className='mt-4 w-full'>
                      <DetailItem title='Тип практики'>
                        {practice.type.value}
                      </DetailItem>
                      <DetailItem title='Учебное заведение'>
                        {practice.institute?.value ?? 'Не указано'}
                      </DetailItem>
                      <DetailItem title='Специальность'>
                        {practice.speciality?.value ?? 'Не указано'}
                      </DetailItem>
                      <DetailItem title='Курс'>{practice.year}</DetailItem>
                    </dl>
                  </CollapsibleContent>
                </Collapsible>
              </dd>
            </div>
            <div className='py-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6 sm:py-5'>
              <dt className='text-sm font-medium text-muted-foreground'>
                Файлы
              </dt>
              <dd className='mt-1 flex flex-col gap-2 text-sm sm:col-span-2 sm:mt-0'>
                <span className='text-muted-foreground'>Направление</span>
                {practice.assignmentFile && (
                  <FileCard file={practice.assignmentFile} editable={false} />
                )}
                <span className='mt-2 text-muted-foreground'>Отчет</span>
                {practice.reportFile && (
                  <FileCard file={practice.reportFile} editable={false} />
                )}
              </dd>
            </div>
          </dl>
        </div>
      </div>
    </>
  );
}
