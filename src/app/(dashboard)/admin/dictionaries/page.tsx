import { type Metadata } from 'next';
import { PageHeading } from '@/components/page-headings/default-page-heading';

export const metadata: Metadata = {
  title: 'Управление словарями',
};

export default async function AdminDictionaries() {
  return (
    <>
      <PageHeading title='Управление словарями' />
    </>
  );
}
