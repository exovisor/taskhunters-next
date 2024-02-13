import { PageHeading } from '@/components/page-headings/default-page-heading';
import { CreateSpecialtyButton } from '@/components/dictionaries/create-specialty-button';
import { SpecialitiesDataView } from './data-view';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Словарь специальностей',
};

export default async function Specialities() {

  return (
    <>
      <PageHeading title={'Словарь специальностей'}>
        <CreateSpecialtyButton />
      </PageHeading>
      <div className='mt-4 px-2'>
        <SpecialitiesDataView />
      </div>
    </>
  );
}
