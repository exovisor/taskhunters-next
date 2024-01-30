import { unstable_noStore as noStore } from 'next/cache';
import Link from 'next/link';

import { getServerAuthSession } from '@/server/auth';
import {env} from '@/env';

import SignIn from '@/components/auth/sign-in';
import {Button} from '@/components/ui/button';
import {useNoAuth} from '@/components/auth/useNoAuth';

export default async function Home() {
  noStore();
  await useNoAuth();

  const session = await getServerAuthSession();

  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-tr from-[#A0BA57] to-[#3E91AB] dark:from-[#74863f] dark:to-[#2b6577]">
      <div className="w-full max-w-md rounded-md shadow-sm flex flex-col items-center justify-center gap-12 px-4 py-16 bg-background text-foreground">
        <div className="flex flex-col justify-center items-center gap-8">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-24 text-primary dark:text-foreground" fill="currentColor" version="1.1" viewBox="0 0 70 40">
            <polygon
              points="60.5,25.7 60.5,0 40.3,0 20.2,32 20.2,0 0,0 0,40 20.2,40 40.3,8 40.3,25.7 34.4,25.7 31.8,29.9   40.3,29.9 40.3,40 60.5,40 69.6,25.7 "/>
          </svg>
          <h1 className="text-2xl dark:text-foreground">Система учета студентов</h1>
        </div>
        <div>
          {
            session
              ?
              <Link href='/student' passHref legacyBehavior><Button variant='link'>Перейти на домашнюю страницу</Button></Link>
              :
              <SignIn botUsername={env.TELEGRAM_BOT_NAME} />
          }
        </div>
      </div>
    </main>
  );
}
