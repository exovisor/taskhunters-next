'use client';

import React from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import {
  CalendarDays,
  GraduationCap,
  HelpCircle,
  Home,
  LayoutGrid,
  School2,
  Users2,
} from 'lucide-react';
import { Separator } from '@/components/ui/separator';

const navigation = [
  { name: 'Главная', href: '/admin', icon: Home },
  { name: 'Пользователи', href: '/admin/users', icon: Users2 },
  { name: 'Практики', href: '/admin/practices', icon: CalendarDays },
];

const dictionaries = [
  {
    name: 'Типы практики',
    href: '/admin/dictionaries/practice-types',
    icon: LayoutGrid,
  },
  {
    name: 'Учебные заведения',
    href: '/admin/dictionaries/institutes',
    icon: School2,
  },
  {
    name: 'Специализации',
    href: '/admin/dictionaries/specialities',
    icon: GraduationCap,
  },
];

export function AdminNavigation() {
  return (
    <div className='mt-5 flex-1 overflow-y-auto px-3'>
      <nav>
        <div className='space-y-1'>
          {navigation.map((item) => (
            <Link href={item.href} key={item.name} passHref legacyBehavior>
              <Button variant='ghost' className='w-full justify-start'>
                <item.icon className='mr-2 h-4 w-4' />
                {item.name}
              </Button>
            </Link>
          ))}
          <Separator />
          {dictionaries.map((item) => (
            <Link href={item.href} key={item.name} passHref legacyBehavior>
              <Button variant='ghost' className='w-full justify-start'>
                <item.icon className='mr-2 h-4 w-4' />
                {item.name}
              </Button>
            </Link>
          ))}
          <Separator />
          <Link href='/admin/help' passHref legacyBehavior>
            <Button variant='ghost' className='w-full justify-start'>
              <HelpCircle className='mr-2 h-4 w-4' />
              Помощь
            </Button>
          </Link>
        </div>
      </nav>
    </div>
  );
}
