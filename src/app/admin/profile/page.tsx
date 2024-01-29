import {getServerAuthSession} from "@/server/auth";
import {ProfileBadge} from "@/components/shared/profile-badge";

export default async function AdminProfile() {
	const session = await getServerAuthSession();
	return (
		<div className="py-4 mx-auto flex flex-col max-w-screen-lg">
			{session?.user && <ProfileBadge user={session.user}/>}
		</div>
	)
}
