import { type PropsWithChildren } from 'react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { getRoleByValue } from '@/lib/roles';
import { type SessionUser } from '@/server/types';

export type ProfilePageHeadingProps = PropsWithChildren<{
  user: SessionUser;
}>;

export async function ProfilePageHeading({ children, user }: ProfilePageHeadingProps) {
  const role = getRoleByValue(user.role);
  return (
    <div>
      <div>
        <div className='h-16 w-full bg-muted/40 lg:h-24' />
      </div>
      <div className='max-w-5xl px-4'>
        <div className='-mt-12 sm:-mt-16 sm:flex sm:items-end sm:space-x-5'>
          <div className='flex'>
            <Avatar className='h-24 w-24 text-4xl font-semibold ring-4 ring-background'>
              <AvatarImage src={user.image ?? undefined} />
              <AvatarFallback>
                {user.displayName
                  .split(' ')
                  .map((str) => str.charAt(0))
                  .join('')}
              </AvatarFallback>
            </Avatar>
          </div>
          <div className='mt-6 sm:mt-12 sm:flex sm:min-w-0 sm:flex-1 sm:items-center sm:justify-end sm:space-x-6 sm:pb-1'>
            <div className='mt-6 flex min-w-0 flex-1 gap-4 sm:hidden md:block'>
              <div className='flex items-baseline gap-2'>
                <h1 className='truncate text-2xl font-bold'>
                  {user.displayName}
                </h1>
                {user.telegramId &&
                user.username &&
                user.username !== '[hidden]' ? (
                    <a
                      href={'https://t.me/' + user.username}
                      target='_blank'
                      className='text-sm text-muted-foreground hover:underline'
                    >
                    @{user.username}
                    </a>
                  ) : (
                    <span>Id: {user.telegramId ?? '[hidden]'}</span>
                  )}
              </div>
              {role && (
                <span className='flex items-center text-muted-foreground'>
                  <role.icon className='mr-2 h-4 w-4' /> {role.label}
                </span>
              )}
            </div>
            <div className='mt-6 flex flex-col justify-stretch space-y-3 sm:flex-row sm:space-x-4 sm:space-y-0'>
              {children}
            </div>
          </div>
        </div>
        <div className='mt-6 hidden min-w-0 flex-1 sm:block md:hidden'>
          <h1 className='truncate text-2xl font-bold'>
            {user.displayName}
          </h1>
        </div>
      </div>
    </div>
  );
}
