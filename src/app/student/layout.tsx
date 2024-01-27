import type {PropsWithChildren} from "react";
import Nav from "@/components/student/nav";
import {useRoleAuth} from "@/components/auth/useRoleAuth";
import {getServerAuthSession} from "@/server/auth";

export default async function StudentLayout({children}: PropsWithChildren) {
	await useRoleAuth(["STUDENT"]);
	const session = await getServerAuthSession();
	return (
		<div className="p-1 sm:p-2">
			<Nav session={session} />
			<main className="page overflow-hidden">{children}</main>
		</div>
	)
}
