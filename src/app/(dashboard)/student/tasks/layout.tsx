import { type PropsWithChildren } from 'react';
import { useStudentProfile } from '@/components/auth/useStudentProfile';

export default async function StudentPracticeLayout({ children }: PropsWithChildren) {
  await useStudentProfile();
  return (
    <>
      {children}
    </>
  );
}
