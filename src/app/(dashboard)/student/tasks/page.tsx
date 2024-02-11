import { PageHeading } from '@/components/page-headings/default-page-heading';
import { type Metadata } from 'next';
import { NotImplementedAlert } from '@/components/placeholders/not-implemented-alert';

export const metadata: Metadata = {
  title: 'Список заданий',
  description: 'Список моих заданий',
};

export default function StudentTaskPage() {
  return (
    <>
      <PageHeading title={'Список заданий'} />
      <div className='p-4'>
        <NotImplementedAlert />
      </div>
    </>
  );
}
