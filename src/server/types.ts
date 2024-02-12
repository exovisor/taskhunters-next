import type { Role } from '@prisma/client';

export interface SessionUser {
  id: string;
  role: Role;
  displayName: string;
  username?: string | null;
  image?: string | null;
  email?: string | null;
  telegramId?: string | null;

  studentProfileId?: number | null;
}
