import type { Role } from "@prisma/client"

export interface User {
	id: string;
	username: string;
	display_name: string;
	role: Role;
	image: string;
	email?: string | null;
	telegram_id?: string | null;

	studentProfileId?: number | null;
}
