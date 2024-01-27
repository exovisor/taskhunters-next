'use server';

import {Avatar, AvatarFallback, AvatarImage} from "@/components/ui/avatar";
import Link from "next/link";
import {BadgeCheck, GraduationCap, ShieldCheck} from "lucide-react";
import {getServerAuthSession} from "@/server/auth";
import type {Role} from "@prisma/client";

export async function ProfileBadge() {
	const session = await getServerAuthSession();

	return (
		<section className="p-4 border rounded-lg flex flex-col md:flex-row gap-4">
			<Avatar className="w-28 h-28 text-4xl font-semibold">
				<AvatarImage src={session?.user.image}/>
				<AvatarFallback>{session?.user.display_name.split(' ').map(str => str.charAt(0)).join('')}</AvatarFallback>
			</Avatar>
			<div className="flex flex-col justify-center">
				<h1>{session?.user.display_name ?? '[имя скрыто]'}</h1>
				{
					session?.user.telegram_id && session.user.telegram_id !== '[hidden]'
						?
						<a href={'https://t.me/' + session.user.username} target="_blank"
									className="text-sm text-muted-foreground hover:underline">
							@{session.user.username} (Id: {session.user.telegram_id})
						</a>
						:
						<span>Id: {session?.user.telegram_id ?? '[hidden]'}</span>
				}
				<div className="flex gap-1 items-center mt-1">
					{getRoleBadge(session?.user.role)}
				</div>
			</div>
		</section>
	)
}

function getRoleBadge(role: Role | undefined) {
	if (role === "STUDENT") {
		return <><GraduationCap className="w-4 h-4 inline"/><span>Студент</span></>
	}
	if (role === "ADMIN" || role === "SUPERADMIN") {
		return <><ShieldCheck className="w-4 h-4 inline"/><span>Администратор</span></>
	}
	if (role === "SUPERVISOR") {
		return <><BadgeCheck className="w-4 h-4 inline"/><span>Руководитель</span></>
	}

	return <span>Гость</span>
}
