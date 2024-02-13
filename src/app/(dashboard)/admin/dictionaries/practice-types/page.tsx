import { PageHeading } from '@/components/page-headings/default-page-heading';
import { CreatePracticeTypeButton } from '@/components/dictionaries/create-practice-type-button';
import { PracticeTypeDataView } from './data-view';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Словарь типов практик',
};

export default async function PracticeTypes() {

  return (
    <>
      <PageHeading title={'Словарь типов практик'}>
        <CreatePracticeTypeButton />
      </PageHeading>
      <div className='mt-4 px-2'>
        <PracticeTypeDataView />
      </div>
    </>
  );
}
