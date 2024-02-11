'use server';

import { api } from '@/trpc/server';
import { getServerAuthSession } from '@/server/auth';
import { EditProfile } from '@/components/student/edit-profile';

export default async function StudentProfileTab() {
  const session = await getServerAuthSession();
  const hasProfile = !!session?.user.studentProfileId;
  const profile = hasProfile ? await api.student.getProfileByUserId.query({ id: session.user.studentProfileId! }) : {};
  return (
    <section>
      {!hasProfile &&
				<p className='mb-4'>
				  <b>Внимание!</b> При первом заполнении профиля вам необходимо будет перезайти в учетную запись.<br/>
					После сохранения вы будете перенаправлены на страницу входа.
				</p>
      }
      <EditProfile hasProfile={hasProfile} initData={{ userId: session!.user.id, email: session!.user.email ?? undefined, ...profile }} />
    </section>
  );
}
