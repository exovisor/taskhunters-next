import { BadgeCheck, GraduationCap, ShieldAlert, ShieldCheck } from 'lucide-react';
import { type Role } from '@prisma/client';

type IconReturnType = typeof BadgeCheck;

export type RoleDictionary = {
  value: Role;
  label: string;
  icon: IconReturnType;
  homepath: string;
}[];

export const roles: RoleDictionary = [
  {
    value: 'SUPERADMIN',
    label: 'Руководитель',
    icon: ShieldAlert,
    homepath: '/admin',
  },
  {
    value: 'ADMIN',
    label: 'Администратор',
    icon: ShieldCheck,
    homepath: '/admin',
  },
  {
    value: 'MENTOR',
    label: 'Куратор',
    icon: BadgeCheck,
    homepath: '/mentor',
  },
  {
    value: 'STUDENT',
    label: 'Студент',
    icon: GraduationCap,
    homepath: '/student',
  },
];

export function getRoleByValue(value?: string) {
  return roles.find((role) => role.value === value);
}
