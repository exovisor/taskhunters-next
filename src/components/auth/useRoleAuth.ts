'use server';

import type { Role } from '@prisma/client';
import { getServerAuthSession } from '@/server/auth';
import { redirect } from 'next/navigation';
import { getRoleByValue } from '@/lib/roles';

/**
 * Redirects to the homepath of the user's role if the user is not authenticated or does not have the required role.
 * @param allowedRoles
 */
export async function useRoleAuth(allowedRoles: Role[] = []) {
  const session = await getServerAuthSession();
  const role = getRoleByValue(session?.user.role);

  if (!session) redirect('/');
  if (session?.user && allowedRoles.includes(session.user.role)) {
    return;
  }
  redirect(role?.homepath ?? '/not-found');
}
