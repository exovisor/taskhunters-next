import { BadgeCheck, GraduationCap, ShieldAlert, ShieldCheck } from 'lucide-react';

export const roles = [
  {
    value: 'SUPERADMIN',
    label: 'Руководитель',
    icon: ShieldAlert,
  },
  {
    value: 'ADMIN',
    label: 'Администратор',
    icon: ShieldCheck,
  },
  {
    value: 'SUPERVISOR',
    label: 'Куратор',
    icon: BadgeCheck,
  },
  {
    value: 'STUDENT',
    label: 'Студент',
    icon: GraduationCap,
  },
];
