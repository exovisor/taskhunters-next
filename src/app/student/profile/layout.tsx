import {getServerAuthSession} from "@/server/auth";
import type {PropsWithChildren} from "react";
import dynamic from "next/dynamic";
import {Avatar, AvatarFallback, AvatarImage} from "@/components/ui/avatar";
import Link from "next/link";
import {GraduationCap} from "lucide-react";

// Workaround for rehydration
const FillProfileAlert = dynamic(()=>import("./fill-profile-alert"), {ssr: false})

export default async function StudentProfileLayout({ children }: PropsWithChildren) {
	const session = await getServerAuthSession();
	return (
		<div className="py-4 mx-auto flex flex-col max-w-screen-lg">
			<FillProfileAlert initState={session?.user && session.user.role === "STUDENT" && !session.user.studentProfileId} />

			<section className="p-4 border rounded-lg flex flex-col md:flex-row gap-4">
				<Avatar className="w-28 h-28 text-4xl font-semibold">
					<AvatarImage src={session?.user.image} />
					<AvatarFallback>{session?.user.display_name.split(' ').map(str => str.charAt(0)).join('')}</AvatarFallback>
				</Avatar>
				<div className="flex flex-col justify-center">
					<h1>{session?.user.display_name ?? '[имя скрыто]'}</h1>
					{
						session?.user.telegram_id && session.user.telegram_id !== '[hidden]'
							?
								<Link href={'https://t.me/' + session.user.username} className="text-sm text-muted-foreground hover:underline">
									@{session.user.username} (Id: {session.user.telegram_id})
								</Link>
							:
								<span>Id: {session?.user.telegram_id ?? '[hidden]'}</span>
					}
					<div className="flex gap-1 items-center mt-1">
						<GraduationCap className="w-4 h-4 inline" />
						<span>Студент</span>
					</div>
				</div>
			</section>

			{children}
		</div>
	)
}
