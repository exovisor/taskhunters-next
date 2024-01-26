import {getServerAuthSession} from "@/server/auth";
import {redirect} from "next/navigation";
import {getRoleHomepath} from "@/lib/utils";

export async function useNoAuth() {
	const session = await getServerAuthSession();

	if (session?.user && session.user.role) {
		redirect(getRoleHomepath(session?.user.role));
	}
}
