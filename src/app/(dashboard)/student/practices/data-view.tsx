'use client';

import { useMemo, useState } from 'react';
import type { z } from 'zod';
import type { queryOptionsSchema } from '@/server/schema/query';
import { api } from '@/trpc/react';
import type { Prisma } from '@prisma/client';
import { Badge } from '@/components/ui/badge';
import { getStatusByValue } from '@/lib/status';
import {
  CalendarClock,
  ChevronLeft,
  ChevronRight,
  ChevronsLeft,
  ChevronsRight,
  GraduationCap,
  School2
} from 'lucide-react';
import { format } from 'date-fns';
import { ru } from 'date-fns/locale';
import Link from 'next/link';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Button } from '@/components/ui/button';

export type StudentPracticeListProps = {
  studentProfileId: number;
};

type PracticesPayload = Prisma.PracticeGetPayload<{
  include: {
    type: true,
    institute: true,
    speciality: true,
  }
}>;

export default function StudentPracticeList({ studentProfileId }: StudentPracticeListProps) {
  const [ queryOptions, setQueryOptions ] = useState<z.infer<typeof queryOptionsSchema>>({
    paginationOptions: {
      pageIndex: 0,
      pageSize: 10,
    },
    sortingOptions: {
      id: 'id',
      desc: true,
    }
  });
  const { data } = api.practice.getStudentPractices.useQuery({ ...queryOptions, studentProfileId });
  const totalPages = useMemo(() => (
    (data) ?
      Math.ceil(data.meta.totalCount / queryOptions.paginationOptions!.pageSize!)
      : 1
  ), [ data, queryOptions ]);
  function setPage(index: number) {
    const newOptions = {
      ...queryOptions,
      paginationOptions: {
        ...queryOptions.paginationOptions,
        pageIndex: index
      }
    };
    setQueryOptions({
      ...newOptions
    });
  }
  return (
    <>
      <ul role='list' className='divide-y divide-border'>
        {data?.rows.map((practice: PracticesPayload) => (
          <li key={practice.id}>
            <Link href={'/student/practices/' + practice.id} className='block hover:bg-muted'>
              <div className='px-4 py-4 sm:px-6'>
                <div className='flex items-center justify-between'>
                  <p className='text-sm font-medium text-foreground truncate'>{practice.type.value} практика
                    #{practice.id}</p>
                  <div className='ml-2 flex-shrink-0 flex'>
                    <Badge variant='outline'>
                      {getStatusByValue(practice.status)?.label}
                    </Badge>
                  </div>
                </div>
                <div className='mt-2 sm:flex sm:justify-between'>
                  <div className='sm:flex text-accent-foreground'>
                    <p className='flex items-center text-sm'>
                      <School2 className='flex-shrink-0 mr-1.5 h-5 w-5' aria-hidden='true'/>
                      {practice.institute ? practice.institute.value : 'Не указано'}
                    </p>
                    <p className='mt-2 flex items-center text-sm sm:mt-0 sm:ml-6'>
                      <GraduationCap className='flex-shrink-0 mr-1.5 h-5 w-5' aria-hidden='true'/>
                      {practice.speciality ? practice.speciality.value : 'Не указано'}
                    </p>
                  </div>
                  <div className='mt-2 flex items-center text-sm text-muted-foreground sm:mt-0'>
                    <CalendarClock className='flex-shrink-0 mr-1.5 h-5 w-5' aria-hidden='true'/>
                    <p>
                      <time dateTime={practice.startDate.toISOString()}>{format(practice.startDate, 'PPP', { locale: ru })}</time>
                      {' '}&mdash;{' '}
                      <time dateTime={practice.endDate.toISOString()}>{format(practice.endDate, 'PPP', { locale: ru })}</time>
                    </p>
                  </div>
                </div>
              </div>
            </Link>
          </li>
        ))}
      </ul>
      {data && data.meta.totalCount > 0 &&
        <div className='flex items-center justify-end px-2 pb-4 mt-4'>
          <div className='flex items-center space-x-6 lg:space-x-8 flex-wrap justify-center gap-y-4'>
            <div className='flex items-center space-x-2'>
              <p className='text-sm font-medium'>Строк на странице</p>
              <Select
                value={`${queryOptions.paginationOptions?.pageSize}`}
                onValueChange={(value) => {
                  setQueryOptions({
                    ...queryOptions,
                    paginationOptions: {
                      ...queryOptions.paginationOptions,
                      pageSize: Number(value),
                    }
                  });
                }}
              >
                <SelectTrigger className='h-8 w-[70px]'>
                  <SelectValue placeholder={queryOptions.paginationOptions?.pageSize}/>
                </SelectTrigger>
                <SelectContent side='top'>
                  {[ 10, 20, 30, 40, 50 ].map((pageSize) => (
                    <SelectItem key={pageSize} value={`${pageSize}`}>
                      {pageSize}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className='flex w-[120px] items-center justify-center text-sm font-medium'>
              Страница {queryOptions.paginationOptions!.pageIndex! + 1} из{' '}
              {totalPages}
            </div>
            <div className='flex items-center space-x-2'>
              <Button
                variant='outline'
                className='hidden h-8 w-8 p-0 lg:flex'
                onClick={() => setPage(0)}
                disabled={queryOptions.paginationOptions?.pageIndex === 0}
              >
                <span className='sr-only'>Перейти к первой странице</span>
                <ChevronsLeft className='h-4 w-4'/>
              </Button>
              <Button
                variant='outline'
                className='h-8 w-8 p-0'
                onClick={() => setPage(queryOptions.paginationOptions!.pageIndex! - 1)}
                disabled={queryOptions.paginationOptions?.pageIndex === 0}
              >
                <span className='sr-only'>Перейти к предыдущей странице</span>
                <ChevronLeft className='h-4 w-4'/>
              </Button>
              <Button
                variant='outline'
                className='h-8 w-8 p-0'
                onClick={() => setPage(queryOptions.paginationOptions!.pageIndex! + 1)}
                disabled={queryOptions.paginationOptions?.pageIndex === totalPages - 1}
              >
                <span className='sr-only'>Перейти к следующей странице</span>
                <ChevronRight className='h-4 w-4'/>
              </Button>
              <Button
                variant='outline'
                className='hidden h-8 w-8 p-0 lg:flex'
                onClick={() => setPage(totalPages - 1)}
                disabled={queryOptions.paginationOptions?.pageIndex === totalPages - 1}
              >
                <span className='sr-only'>Перейти к последней странице</span>
                <ChevronsRight className='h-4 w-4' />
              </Button>
            </div>
          </div>
        </div>
      }
    </>
  );
}
