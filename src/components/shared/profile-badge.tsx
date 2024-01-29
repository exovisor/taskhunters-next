'use client';

import {Avatar, AvatarFallback, AvatarImage} from "@/components/ui/avatar";
import type {Role} from "@prisma/client";
import type {SessionUser} from "@/server/types";
import {roles} from "@/lib/enums-data";

export function ProfileBadge({user}: {user: SessionUser}) {
	return (
		<section className="p-4 border rounded-lg flex flex-col md:flex-row gap-4">
			<Avatar className="w-28 h-28 text-4xl font-semibold">
				<AvatarImage src={user.image ?? undefined}/>
				<AvatarFallback>{user.display_name.split(' ').map(str => str.charAt(0)).join('')}</AvatarFallback>
			</Avatar>
			<div className="flex flex-col justify-center">
				<h1>{user.display_name ?? '[имя скрыто]'}</h1>
				{
					user.telegram_id && user.username && user.username !== '[hidden]'
						?
						<a href={'https://t.me/' + user.username} target="_blank"
									className="text-sm text-muted-foreground hover:underline">
							@{user.username} (Id: {user.telegram_id})
						</a>
						:
						<span>Id: {user.telegram_id ?? '[hidden]'}</span>
				}
				<div className="flex gap-1 items-center mt-1">
					{getRoleBadge(user.role)}
				</div>
			</div>
		</section>
	)
}

function getRoleBadge(role: Role | undefined) {
	const roleInfo = roles.find((r) => r.value === role);
	if (!roleInfo) return <span>Ошибка роли</span>
	return (
		<>
			<roleInfo.icon className="w-4 h-4 inline"/><span>{roleInfo.label}</span>
		</>
	)
}
