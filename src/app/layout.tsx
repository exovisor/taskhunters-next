import '@/styles/globals.css';

import { Open_Sans } from 'next/font/google';

import React from 'react';
import { TRPCReactProvider } from '@/trpc/react';
import {ThemeProvider} from '@/components/theme/theme-provider';
import { Toaster } from '@/components/ui/toaster';

const openSans = Open_Sans({
  subsets: ['latin', 'cyrillic'],
  variable: '--font-sans',
});

export const metadata = {
  title: 'Система учета студентов СПБ ГУП "СПБ ИАЦ"',
  description: 'Агрегатор заданий для практикантов СПБ ГУП "СПБ ИАЦ"',
  icons: [{ rel: 'icon', url: '/favicon.ico' }],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ru" suppressHydrationWarning>
      <body className={`${openSans.className} min-h-screen flex flex-col`}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <div className='flex-grow'>
          	<TRPCReactProvider>{children}</TRPCReactProvider>
            <Toaster />
          </div>
          <div className='w-full border-t border-accent text-accent-foreground/80 p-2 flex justify-between items-center'>
            <span>&copy; 2024 СПБ ГУП "СПБ ИАЦ"</span>
            <div className='flex space-x-2 text-sm'>
              <a href='/privacy.pdf' target='_blank' className='hover:text-accent-foreground'>Политика конфиденциальности</a>
              <a href='#' className='hover:text-accent-foreground'>Пользовательское соглашение</a>
              <a href='#' className='hover:text-accent-foreground'>Поддержка</a>
            </div>
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
}
