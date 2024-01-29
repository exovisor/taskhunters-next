'use client';

import {api} from "@/trpc/react";
import {DataTable} from "@/components/table/data-table";
import {getColumns} from "@/app/admin/users/columns";
import {useState} from "react";
import type {queryOptionsSchema} from "@/server/schema/query";
import type {z} from "zod";

export function UsersTable() {
	const [queryOptions, setQueryOptions] = useState<z.infer<typeof queryOptionsSchema>>({
		paginationOptions: {
			pageIndex: 0,
			pageSize: 10
		}
	})
	const { data, refetch } = api.user.getUsers.useQuery(queryOptions);
	return <DataTable columns={getColumns(refetch)} setQueryOptions={setQueryOptions} payload={data} />
}
