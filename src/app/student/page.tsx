import {getServerAuthSession} from '@/server/auth';
import {useStudentProfile} from '@/components/auth/useStudentProfile';

export default async function Students() {
  await useStudentProfile();
  const session = await getServerAuthSession();

  return (
    <div>
      <p>{JSON.stringify(session)}</p>
    </div>
  );
}
