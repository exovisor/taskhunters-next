import { type PropsWithChildren } from 'react';
import { Sheet, SheetContent, SheetHeader, SheetTrigger } from '@/components/ui/sheet';
import { Button } from '@/components/ui/button';
import { ProfileDropdownInline } from '@/components/profile/profile-dropdown-inline';
import { ProfileDropdown } from '@/components/profile/profile-dropdown';
import { getServerAuthSession } from '@/server/auth';
import { ThemeToggleInline } from '@/components/theme/theme-toggle-inline';
import { ThemeToggle } from '@/components/theme/theme-toggle';
import Logo from '@/assets/logo-site.svg';
import type { Role } from '@prisma/client';
import { StudentNavigation } from '@/components/student/student-navigation';
import { AdminNavigation } from '@/components/admin/admin-navigation';

function getNavigationByRole(role: Role | undefined) {
  switch (role) {
    case 'ADMIN':
    case 'SUPERADMIN':
      return AdminNavigation;
    case 'STUDENT':
      return StudentNavigation;
    default:
      return null;
  }
}

export default async function DashboardLayout({ children }: PropsWithChildren) {
  const session = await getServerAuthSession();
  const Navigation = getNavigationByRole(session?.user?.role);
  return (
    <>
      <div className='min-h-full'>
        {/* Static sidebar for desktop */}
        <div className='hidden bg-muted lg:fixed lg:inset-y-0 lg:flex lg:w-64 lg:flex-col lg:border-r lg:pb-4 lg:pt-5'>
          <div className='flex flex-shrink-0 items-center px-6'>
            <img src='/logo-wide.png' alt='Логотип ИАЦ' />
          </div>
          <div className='mt-6 flex flex-col overflow-y-auto px-3'>
            {session?.user && (
              <ProfileDropdown
                user={session.user}
              />
            )}
          </div>
          {Navigation && <Navigation />}
          <div className='mt-auto overflow-y-auto px-3'>
            <ThemeToggle />
          </div>
        </div>

        {/* Main column */}
        <div className='flex flex-col lg:ml-64'>
          {/* Mobile navigation */}
          <div className='sticky top-0 z-10 flex h-14 flex-shrink-0 items-center border-b bg-background/60 backdrop-blur lg:hidden'>
            <Sheet>
              <SheetTrigger asChild>
                <Button variant='ghost'>
                  <span className='sr-only'>Открыть боковое меню</span>
                  <Logo className='h-full w-auto text-primary' />
                </Button>
              </SheetTrigger>
              <SheetContent side='left' className='h-full flex flex-col'>
                <SheetHeader>
                  <img src='/logo-wide.png' alt='Логотип ИАЦ' />
                </SheetHeader>
                <div className='flex-grow'>
                  {Navigation && <Navigation />}
                </div>
                <div className='px-3'>
                  <ThemeToggle />
                </div>
              </SheetContent>
            </Sheet>
            <div className='flex flex-1 justify-between px-4 sm:px-6 lg:px-8'>
              <div className='ml-auto flex items-center gap-2'>
                <ThemeToggleInline />
                {session?.user && <ProfileDropdownInline user={session.user} />}
              </div>
            </div>
          </div>

          {/* Page content */}
          <main className='flex-1'>
            {children}
          </main>
        </div>
      </div>
    </>
  );
}
