import type { Role } from "@prisma/client"

export interface SessionUser {
	id: string;
	role: Role;
	display_name: string;
	username?: string | null;
	image?: string | null;
	email?: string | null;
	telegram_id?: string | null;

	studentProfileId?: number | null;
}
