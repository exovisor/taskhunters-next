import { BadgeCheck, GraduationCap, ShieldAlert, ShieldCheck } from 'lucide-react';

export const roles = [
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
    value: 'SUPERVISOR',
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
