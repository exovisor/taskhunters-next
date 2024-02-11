'use client';

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { signOut } from 'next-auth/react';
import Link from 'next/link';
import type { SessionUser } from '@/server/types';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { getRoleByValue } from '@/lib/roles';

export type ProfileDropdownProps = {
  user: SessionUser;
  className?: string;
};

export function ProfileDropdown({ user, className }: ProfileDropdownProps) {
  const role = getRoleByValue(user.role);
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant='ghost' className={cn('justify-start h-auto', className)}>
          <Avatar className='mr-2 w-10 h-10 border dark:shadow-none'>
            <AvatarImage src={user.image ?? undefined} alt='Фото профиля' />
            <AvatarFallback className='bg-background text-foreground'>{user.display_name.split(' ').map(str => str.charAt(0)).join('')}</AvatarFallback>
          </Avatar>
          <div className='flex flex-col gap-1 items-start'>
            <span className='text-sm font-medium text-foreground'>{user.display_name}</span>
            <span className='text-xs font-medium text-muted-foreground'>
              {role?.icon && <role.icon className='inline-block w-4 h-4 mr-1' />}
              {role?.label}
            </span>
          </div>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align='end'>
        {
          user.username && user.username != '[hidden]' && <DropdownMenuLabel>@{user.username}</DropdownMenuLabel>
        }
        <DropdownMenuSeparator />
        <Link href={role?.homepath + '/profile'}>
          <DropdownMenuItem>Профиль</DropdownMenuItem>
        </Link>
        <DropdownMenuItem
          onClick={() => signOut()}
        >
          Выйти
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
