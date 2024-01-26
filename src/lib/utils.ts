import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"
import {Role} from "@prisma/client";

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
