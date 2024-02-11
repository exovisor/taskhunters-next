'use client';

import {
  NavigationMenu, NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList, NavigationMenuTrigger, navigationMenuTriggerStyle,
} from '@/components/ui/navigation-menu';
import Link from 'next/link';
import React from 'react';
import { cn } from '@/lib/utils';

export function AdminNavMenu() {
  return (
    <NavigationMenu>
      <NavigationMenuList>
        <NavigationMenuItem>
          <NavigationMenuTrigger>Пользователи</NavigationMenuTrigger>
          <NavigationMenuContent>
            <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px] ">
              <li>
                <Link href='/admin/users' passHref legacyBehavior>
                  <NavigationMenuLink
                    className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground">
                    <div className="text-sm font-medium leading-none">Список пользователей</div>
                    <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
											Список всех пользователей системы
                    </p>
                  </NavigationMenuLink>
                </Link>
              </li>
              <li>
                <Link href='/admin/students' passHref legacyBehavior>
                  <NavigationMenuLink
                    className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground">
                    <div className="text-sm font-medium leading-none">Список студентов</div>
                    <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
											Управление студентами
                    </p>
                  </NavigationMenuLink>
                </Link>
              </li>
            </ul>
          </NavigationMenuContent>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <NavigationMenuTrigger>Словари</NavigationMenuTrigger>
          <NavigationMenuContent>
            <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px] ">
              <li>
                <Link href='/admin/dictionaries/institutes' passHref legacyBehavior>
                  <NavigationMenuLink
                    className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground">
                    <div className="text-sm font-medium leading-none">Образовательные учреждения</div>
                    <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
											Управление словарем образовательных учреждений
                    </p>
                  </NavigationMenuLink>
                </Link>
              </li>
              <li>
                <Link href='/admin/dictionaries/specialties' passHref legacyBehavior>
                  <NavigationMenuLink
                    className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground">
                    <div className="text-sm font-medium leading-none">Специализации</div>
                    <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
											Управление словарем специализаций
                    </p>
                  </NavigationMenuLink>
                </Link>
              </li>
              <li>
                <Link href='/admin/dictionaries/practice-types' passHref legacyBehavior>
                  <NavigationMenuLink
                    className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground">
                    <div className="text-sm font-medium leading-none">Типы практик</div>
                    <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
											Управление словарем типов практик
                    </p>
                  </NavigationMenuLink>
                </Link>
              </li>
            </ul>
          </NavigationMenuContent>
        </NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenu>
  );
}
