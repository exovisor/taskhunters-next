import '@/styles/globals.css';

import { Open_Sans } from 'next/font/google';

import React from 'react';
import { TRPCReactProvider } from '@/trpc/react';
import { ThemeProvider } from '@/components/theme/theme-provider';
import { Toaster } from '@/components/ui/toaster';

const openSans = Open_Sans({
  subsets: [ 'latin', 'cyrillic' ],
  variable: '--font-sans',
});

export const metadata = {
  title: 'Система учета студентов СПБ ГУП "СПБ ИАЦ"',
  description: 'Агрегатор заданий для практикантов СПБ ГУП "СПБ ИАЦ"',
  icons: [ { rel: 'icon', url: '/favicon.ico' } ],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang='ru' suppressHydrationWarning className='h-full'>
      <body className={`${openSans.className} h-full`}>
        <ThemeProvider
          attribute='class'
          defaultTheme='system'
          enableSystem
          disableTransitionOnChange
        >
          <div className='min-h-full'>
            <TRPCReactProvider>{children}</TRPCReactProvider>
            <Toaster/>
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
}
