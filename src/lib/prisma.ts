import type { TelegramUserData } from "@telegram-auth/server";
import { PrismaClient } from "@prisma/client";

export const prisma = new PrismaClient();

export async function createUserOrUpdate(user: TelegramUserData) {
	return prisma.user.upsert({
		where: {
			id: user.id.toString(),
		},
		create: {
			id: user.id.toString(),
			username: user.username,
			display_name: [user.first_name, user.last_name ?? ""].filter(Boolean).join(" "),
			image: user.photo_url,
		},
		update: {
			username: user.username,
			display_name: [user.first_name, user.last_name ?? ""].filter(Boolean).join(" "),
			image: user.photo_url
		}
	})
}
