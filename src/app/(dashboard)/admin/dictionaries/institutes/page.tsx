import { PageHeading } from '@/components/page-headings/default-page-heading';
import { CreateInstituteButton } from '@/components/dictionaries/create-institute-button';
import { InstituteDataView } from './data-view';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Словарь учебных заведений',
};

export default async function Institutes() {

  return (
    <>
      <PageHeading title='Словарь учебных заведений'>
        <CreateInstituteButton />
      </PageHeading>
      <div className='mt-4 px-2'>
        <InstituteDataView />
      </div>
    </>
  );
}
