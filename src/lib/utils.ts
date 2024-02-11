import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';
import type { Role } from '@prisma/client';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function roleToString(role: Role | undefined) {
  switch (role) {
    case 'SUPERADMIN':
      return 'Руководитель';
    case 'ADMIN':
      return 'Администратор';
    case 'STUDENT':
      return 'Студент';
    case 'SUPERVISOR':
      return 'Куратор';
    default:
      return '/';
  }
}
