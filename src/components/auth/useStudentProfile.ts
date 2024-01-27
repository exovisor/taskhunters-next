'use server';

import {getServerAuthSession} from "@/server/auth";
import {redirect} from "next/navigation";

export async function useStudentProfile() {
	const session = await getServerAuthSession();

	if (session?.user && session.user.role === "STUDENT" && session.user.studentProfileId) {
		return;
	}
	redirect('/student/profile');
}
