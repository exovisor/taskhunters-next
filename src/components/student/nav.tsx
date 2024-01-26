import Link from "next/link";
import {Button} from "@/components/ui/button";
import {getServerAuthSession} from "@/server/auth";
import {ThemeToggle} from "@/components/theme-toggle";
import {ProfileDropdown} from "@/components/shared/profile-dropdown";

export default async function StudentNav() {
	const session = await getServerAuthSession();
	return (
		<nav className="nav flex w-full justify-between p-2 border border-input rounded-md">
			<Link href="/" passHref legacyBehavior>
				<Button variant="link" className="flex gap-4">
					<svg xmlns="http://www.w3.org/2000/svg" className="h-6 text-primary dark:text-foreground" fill="currentColor"
							 version="1.1" viewBox="0 0 70 40">
						<polygon
							points="60.5,25.7 60.5,0 40.3,0 20.2,32 20.2,0 0,0 0,40 20.2,40 40.3,8 40.3,25.7 34.4,25.7 31.8,29.9   40.3,29.9 40.3,40 60.5,40 69.6,25.7 "/>
					</svg>
				</Button>
			</Link>
			{session?.user && (
				<div className="flex items-center space-x-2">
					<ProfileDropdown
						user={session.user}
					/>
					<ThemeToggle/>
				</div>
			)}
		</nav>
	)
}
