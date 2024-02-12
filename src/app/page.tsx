import { unstable_noStore as noStore } from 'next/cache';
import Link from 'next/link';

import { getServerAuthSession } from '@/server/auth';
import { env } from '@/env';

import SignIn from '@/components/auth/sign-in';
import { Button } from '@/components/ui/button';
import { useNoAuth } from '@/components/auth/useNoAuth';
import React from 'react';
import Logo from '@/assets/logo-site.svg';

const navigation = [
  { name: 'Политика конфиденциальности', href: '/privacy.pdf' },
  { name: 'Поддержка', href: '/support' },
];

export default async function AuthPage() {
  noStore();
  await useNoAuth();

  const session = await getServerAuthSession();

  return (
    <>
      <div className='flex min-h-screen flex-col items-center justify-center bg-gradient-to-tr bg-gradient-corporate'>
        <main
          className='w-full max-w-md rounded-md shadow-sm flex flex-col items-center justify-center gap-12 px-4 py-16 bg-background text-foreground'>
          <div className='flex flex-col justify-center items-center gap-8'>
            <Logo className='h-24 text-primary dark:text-foreground' />
            <h1 className='text-2xl dark:text-foreground'>Система учета студентов</h1>
          </div>
          <div>
            {
              session
                ?
                <Link href='/student' passHref legacyBehavior><Button variant='link'>Перейти на домашнюю
                  страницу</Button></Link>
                :
                <SignIn botUsername={env.TELEGRAM_BOT_NAME}/>
            }
          </div>
        </main>
        <footer>
          <div className='max-w-7xl mx-auto py-12 px-4 overflow-hidden sm:px-6 lg:px-8'>
            <nav className='-mx-5 -my-2 flex flex-wrap justify-center' aria-label='Footer'>
              {navigation.map((item) => (
                <div key={item.name} className='px-5 py-2'>
                  <a href={item.href} className='text-base text-primary-foreground hover:underline'>
                    {item.name}
                  </a>
                </div>
              ))}
            </nav>
            <p className='mt-6 text-center text-base text-primary-foreground'>&copy; 2024 СПБ ГУП &quot;СПБ ИАЦ&quot;</p>
          </div>
        </footer>
      </div>
    </>
  );
}
