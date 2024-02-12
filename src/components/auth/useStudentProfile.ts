'use server';

import { getServerAuthSession } from '@/server/auth';
import { redirect } from 'next/navigation';

/**
 * Redirects the user to the student profile page if they are a student and do not have a student profile.
 */
export async function useStudentProfile() {
  const session = await getServerAuthSession();

  if (session?.user && session.user.role === 'STUDENT' && session.user.studentProfileId) {
    return;
  }
  redirect('/student/profile');
}
