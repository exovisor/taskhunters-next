import {useRoleAuth} from "@/components/auth/useRoleAuth";

export default async function AdminTest() {
	await useRoleAuth(["SUPERADMIN"]);
	return <h1>TEST</h1>
}
