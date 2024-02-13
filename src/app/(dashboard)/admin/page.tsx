import { PageHeading } from '@/components/page-headings/default-page-heading';
import { NotImplementedAlert } from '@/components/placeholders/not-implemented-alert';
import { type Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Панель администратора',
  description: 'Панель управления приложением',
};

export default function AdminHomePage() {
  return (
    <>
      <PageHeading title={'Добро пожаловать'} />
      <div className='p-4'>
        <NotImplementedAlert />
      </div>
    </>
  );
}
