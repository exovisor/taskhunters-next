import type { Role } from "@prisma/client"

export interface User {
	id: string;
	username: string;
	display_name: string;
	role: Role;
	image: string;
	email?: string;
	telegram_id?: string;

	studentProfileId?: number | null;
}
