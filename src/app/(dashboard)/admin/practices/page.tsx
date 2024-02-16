import { PageHeading } from '@/components/page-headings/default-page-heading';
import { type Metadata } from 'next';
import { PracticeDataView } from './data-view';

export const metadata: Metadata = {
  title: 'Список практик',
};

export default function PracticesPage() {
  return (
    <>
      <PageHeading title='Список практик'></PageHeading>
      <div className='p-2'>
        <PracticeDataView />
      </div>
    </>
  );
}
