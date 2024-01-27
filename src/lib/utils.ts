import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"
import type {Role} from "@prisma/client";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function getRoleHomepath(role: Role | undefined) {
	switch (role) {
		case "SUPERADMIN":
		case "ADMIN":
			return '/admin';
		case "STUDENT":
			return '/student';
		default:
			return '/';
	}
}
export function roleToString(role: Role | undefined) {
	switch (role) {
		case "SUPERADMIN":
		case "ADMIN":
			return 'Администратор';
		case "STUDENT":
			return 'Студент';
		case "SUPERVISOR":
			return "Руководитель";
		default:
			return '/';
	}
}
