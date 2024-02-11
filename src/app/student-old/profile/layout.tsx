import { getServerAuthSession } from '@/server/auth';
import type { PropsWithChildren } from 'react';
import dynamic from 'next/dynamic';
import { ProfileBadge } from '@/components/shared/profile-badge';

// Workaround for rehydration
const FillProfileAlert = dynamic(()=>import('./_components/fill-profile-alert'), { ssr: false });

export default async function StudentProfileLayout({ children }: PropsWithChildren) {
  const session = await getServerAuthSession();
  return (
    <div className="py-4 mx-auto flex flex-col max-w-screen-lg">
      <FillProfileAlert initState={session?.user && session.user.role === 'STUDENT' && !session.user.studentProfileId} />
      { session?.user && <ProfileBadge user={session.user} /> }
      {children}
    </div>
  );
}
