import { PageHeading } from '@/components/page-headings/default-page-heading';
import { UsersDataView } from './data-view';
import type { Metadata } from 'next';
import { CreateUserForm } from '@/components/user/create-user-form';

export const metadata: Metadata = {
  title: 'Пользователи',
};

export default async function Users() {
  return (
    <>
      <PageHeading title='Пользователи'>
        <CreateUserForm />
      </PageHeading>
      <div className='mt-4 px-2'>
        <UsersDataView />
      </div>
    </>
  );
}
