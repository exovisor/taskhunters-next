import {PropsWithChildren} from "react";
import Nav from "@/components/student/nav";
import {useRoleAuth} from "@/components/auth/useRoleAuth";

export default async function StudentLayout({children}: PropsWithChildren) {
	await useRoleAuth(["STUDENT"]);
	return (
		<div className="p-1 sm:p-2">
			<Nav />
			<main className="page overflow-hidden">{children}</main>
		</div>
	)
}
