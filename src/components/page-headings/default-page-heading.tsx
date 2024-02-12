import { type PropsWithChildren } from 'react';
import { Breadcrumbs } from '@/components/breadcrumbs/breadcrumbs';
import { getServerAuthSession } from '@/server/auth';

export type PageHeadingProps = PropsWithChildren<{
  title: string;
}>;

export async function PageHeading({ title, children }: PageHeadingProps) {
  const session = await getServerAuthSession();
  return (
    <div className='border-b px-4 py-4 sm:px-6'>
      <div>
        <Breadcrumbs sessionRole={session?.user.role} />
      </div>
      <div className='mt-2 md:flex md:items-center md:justify-between'>
        <div className='flex-1 min-w-0'>
          <h1 className='text-2xl font-bold leading-7 sm:text-3xl sm:truncate'>{title}</h1>
        </div>
        <div className='mt-4 flex-shrink-0 flex md:mt-0 md:ml-4 gap-2'>
          {children}
        </div>
      </div>
    </div>
  );
}
