import {getServerAuthSession} from '@/server/auth';
import Link from 'next/link';
import {Button} from '@/components/ui/button';

export default async function StudentDashboard() {
  const session = await getServerAuthSession();

  return (
    <div>
      <div className="flex justify-between items-center py-10">
        <div className="md:ml-6 lg:ml-10">
          <h1>Добро пожаловать, {session!.user.display_name}!</h1>
          <p className="text-sm text-muted-foreground">Здесь вы можете просмотреть список практик</p>
        </div>
        <Link href={'/student/new-practice'} legacyBehavior passHref>
          <Button variant='secondary'>
            Регистрация на практику
          </Button>
        </Link>
      </div>
    </div>
  );
}
