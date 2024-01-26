import type { TelegramUserData } from "@telegram-auth/server";
import { db } from "@/server/db";

export async function createUserOrUpdate(user: TelegramUserData) {
	return db.user.upsert({
		where: {
			telegram_id: user.id.toString(),
		},
		create: {
			telegram_id: user.id.toString(),
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
