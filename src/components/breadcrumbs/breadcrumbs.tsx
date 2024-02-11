'use client';

import { ChevronLeft, ChevronRight, Home } from 'lucide-react';
import { usePathname } from 'next/navigation';
import { type Role } from '@prisma/client';
import { getRoleByValue } from '@/lib/roles';
import Link from 'next/link';
import { getNavigationItem } from '@/lib/navigation';

export type BreadcrumbsProps = {
  sessionRole?: Role;
};

export function Breadcrumbs({ sessionRole }: BreadcrumbsProps) {
  const path = usePathname();
  const pathNames = path.split('/').filter(Boolean).slice(1);
  const role = getRoleByValue(sessionRole);

  if (path === role?.homepath) return <></>;

  return (
    <>
      <nav className='sm:hidden' aria-label='Back'>
        <Link href={role?.homepath ?? '/not-found'} className='flex items-center text-sm font-medium'>
          <ChevronLeft className='flex-shrink-0 -ml-1 mr-1 h-5 w-5' aria-hidden='true'/>
          Назад
        </Link>
      </nav>
      <nav className='hidden sm:flex' aria-label='Breadcrumb'>
        <ol role='list' className='flex items-center space-x-4'>
          <li>
            <div className='flex'>
              <Link href={role?.homepath ?? '/not-found'}
                className='text-sm font-medium text-gray-500 hover:text-gray-700'>
                <Home className='h-5 w-5' aria-hidden='true'/>
                <span className='sr-only'>Главная</span>
              </Link>
            </div>
          </li>
          {
            pathNames.map((name, index) => {
              const href = role?.homepath + `/${pathNames.slice(0, index + 1).join('/')}`;
              return (
                <li key={name}>
                  <div className='flex items-center'>
                    <ChevronRight className='flex-shrink-0 h-5 w-5 text-gray-400' aria-hidden='true'/>
                    <Link href={href} className='ml-4 text-sm font-medium text-gray-500 hover:text-gray-700'>
                      {getNavigationItem(name) ?? name}
                    </Link>
                  </div>
                </li>
              );
            })
          }
        </ol>
      </nav>
    </>
  );
}
