import { type Metadata } from 'next';
import { ProfilePageHeading } from '@/components/profile/profile-page-heading';

export const metadata: Metadata = {
  title: 'Профиль',
  description: 'Профиль пользователя',
};

export default async function AdminProfile() {
  return (
    <>
      <ProfilePageHeading />
    </>
  );
}
