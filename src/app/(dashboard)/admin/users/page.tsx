import { PageHeading } from '@/components/page-headings/default-page-heading';
import { UsersDataView } from './data-view';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Пользователи',
};

export default async function Users() {

  return (
    <>
      <PageHeading title='Пользователи'>
      </PageHeading>
      <div className='mt-4 px-2'>
        <UsersDataView />
      </div>
    </>
  );
}
