import {getServerAuthSession} from "@/server/auth";

export default async function Students() {
	const session = await getServerAuthSession();
	return (
		<div>
			<p>{JSON.stringify(session)}</p>
		</div>
	)
}
