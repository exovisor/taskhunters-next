'use server';

import type {Role} from "@prisma/client";
import {getServerAuthSession} from "@/server/auth";
import {redirect} from "next/navigation";
import {getRoleHomepath} from "@/lib/utils";

export async function useRoleAuth(allowedRoles: Role[] = []) {
	const session = await getServerAuthSession();

	if (!session) redirect('/');
	if (session?.user && allowedRoles.includes(session.user.role)) {
		return;
	}
	redirect(getRoleHomepath(session?.user.role));
}
