import {z} from 'zod';
import {Role} from '@prisma/client';

// Student profile
export const studentProfileIdSchema = z.object({
  id: z.number(),
});
export const updateStudentProfileSchema = z.object({
  userId: z.string(),
  fullname: z.string().min(2).max(255),
  phone: z.string().min(11).max(50),
  email: z.string().email(),
});

export const userIdSchema = z.object({
  id: z.string(),
});

export const userRoleSchema = z.object({
  id: z.string(),
  role: z.nativeEnum(Role),
});

