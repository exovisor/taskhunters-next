import { useRoleAuth } from '@/components/auth/useRoleAuth';
import { type PropsWithChildren } from 'react';

export default async function StudentLayout({ children }: PropsWithChildren) {
  await useRoleAuth([ 'STUDENT' ]);
  return <>{children}</>;
}
