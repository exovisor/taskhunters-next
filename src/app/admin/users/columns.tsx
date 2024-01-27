'use client';

import type { ColumnDef } from "@tanstack/react-table";
import type { User } from "@prisma/client";
import {roleToString} from "@/lib/utils";
import {TableActionsDropdown} from "./table-actions-dropdown";
import {DataTableColumnHeader} from "@/components/table/column-header";

export const columns: ColumnDef<User>[] = [
	{
		accessorKey: "id",
		header: ({ column }) =>
			(<DataTableColumnHeader column={column} title="Id" />),
	},
	{
		accessorKey: "email",
		header: ({ column }) =>
			(<DataTableColumnHeader column={column} title="Электронная почта" />),
	},
	{
		accessorKey: "username",
		header: ({ column }) =>
			(<DataTableColumnHeader column={column} title="Имя пользователя" />),
	},
	{
		accessorKey: "role",
		header: ({ column }) =>
			(<DataTableColumnHeader column={column} title="Роль" />),
		cell: ({ row }) =>
			(roleToString(row.getValue("role")))
	},
	{
		id: "actions",
		cell: ({ row }) => {
			const user = row.original
			return <TableActionsDropdown user={user} />
		},
	},
]
