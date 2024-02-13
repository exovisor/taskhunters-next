import { useRoleAuth } from '@/components/auth/useRoleAuth';
import { type PropsWithChildren } from 'react';

export default async function AdminLayout({ children }: PropsWithChildren) {
  await useRoleAuth([ 'SUPERADMIN', 'ADMIN' ]);
  return <>{children}</>;
}
