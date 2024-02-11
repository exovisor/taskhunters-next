import type { PropsWithChildren } from 'react';
import Nav from '@/components/shared/nav';
import { useRoleAuth } from '@/components/auth/useRoleAuth';
import { getServerAuthSession } from '@/server/auth';
import { StudentNavMenu } from '@/components/student/student-nav-menu';

export default async function StudentLayout({ children }: PropsWithChildren) {
  await useRoleAuth([ 'STUDENT' ]);
  const session = await getServerAuthSession();
  return (
    <div className="p-1 sm:p-2">
      <Nav session={session}>
        <StudentNavMenu />
      </Nav>
      <main className="page overflow-hidden">{children}</main>
    </div>
  );
}
