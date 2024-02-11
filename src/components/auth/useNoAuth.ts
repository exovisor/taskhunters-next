import { getServerAuthSession } from '@/server/auth';
import { redirect } from 'next/navigation';
import { getRoleByValue } from '@/lib/roles';

export async function useNoAuth() {
  const session = await getServerAuthSession();
  const role = getRoleByValue(session?.user?.role);

  if (session?.user && session.user.role) {
    redirect(role?.homepath ?? '/not-found');
  }
}
