import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';
import type { Role } from '@prisma/client';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function getRoleHomepath(role: Role | undefined) {
  switch (role) {
    case 'SUPERADMIN':
    case 'ADMIN':
      return '/admin-old';
    case 'STUDENT':
      return '/student-old';
    case 'SUPERVISOR':
      return '/';
    default:
      return '/';
  }
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
