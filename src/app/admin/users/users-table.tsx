'use client';

import {api} from "@/trpc/react";
import {DataTable} from "@/components/table/data-table";
import {columns} from "@/app/admin/users/columns";
import {useState} from "react";
import type {queryOptionsSchema} from "@/server/schema/query";
import type {z} from "zod";

export function UsersTable() {
	const [queryOptions, setQueryOptions] = useState<z.infer<typeof queryOptionsSchema>>({})
	const { data } = api.user.getUsers.useQuery(queryOptions);
	return <DataTable columns={columns} setQueryOptions={setQueryOptions} payload={data} />
}
