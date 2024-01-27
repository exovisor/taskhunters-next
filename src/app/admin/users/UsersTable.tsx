'use client';

import {api} from "@/trpc/react";
import {DataTable} from "@/components/table/data-table";
import {columns} from "@/app/admin/users/columns";

export function UsersTable() {
	const { data: users } = api.user.getUsers.useQuery();

	return <DataTable columns={columns} data={users} />
}
