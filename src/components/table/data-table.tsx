'use client';

import {
	type ColumnDef,
	type PaginationState,
	flexRender,
	getCoreRowModel,
	useReactTable,
} from "@tanstack/react-table";

import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from "@/components/ui/table";
import {DataTablePagination} from "@/components/table/pagination";
import {DataTableViewOptions} from "@/components/table/column-toggle";
import {useEffect, useMemo, useState} from "react";
import type {z} from "zod";
import type {queryOptionsSchema} from "@/server/schema/query";

interface DataTableProps<TValue, TData> {
	columns: ColumnDef<TData, TValue>[];
	payload: {
		rows: TData[];
		meta: {
			totalCount: number;
		}
	} | undefined;
	setQueryOptions: (opts: z.infer<typeof queryOptionsSchema>) => void;
}

export function DataTable<TValue, TData>({
	columns,
 	payload,
 	setQueryOptions,
}: DataTableProps<TValue, TData>) {
	const [{ pageIndex, pageSize }, setPagination] = useState<PaginationState>({
		pageIndex: 0,
		pageSize: 10,
	})
	const pagination = useMemo(
		() => ({
			pageIndex,
			pageSize,
		}),
		[pageIndex, pageSize]
	);

	useEffect(() => {
		setQueryOptions({
			paginationOptions: pagination
		})
	}, [setQueryOptions, pagination]);

	const table = useReactTable({
		data: payload?.rows ?? [],
		columns,
		pageCount: payload?.meta?.totalCount ? Math.ceil(payload.meta.totalCount / pageSize) : -1,
		state: {
			pagination,
		},
		onPaginationChange: setPagination,
		getCoreRowModel: getCoreRowModel(),
		manualPagination: true,
		debugTable: true,
	});

	return (
		<div className="space-y-4">
			{JSON.stringify(table.getState().sorting)}
			{JSON.stringify(table.getState().pagination)}
			{JSON.stringify(table.getState().columnFilters)}
			<DataTableViewOptions table={table} />
			<div className="rounded-md border">
				<Table>
					<TableHeader>
						{table.getHeaderGroups().map((headerGroup) => (
							<TableRow key={headerGroup.id}>
								{headerGroup.headers.map((header) => {
									return (
										<TableHead key={header.id}>
											{header.isPlaceholder
												? null
												: flexRender(
													header.column.columnDef.header,
													header.getContext()
												)}
										</TableHead>
									)
								})}
							</TableRow>
						))}
					</TableHeader>
					<TableBody>
						{table.getRowModel().rows?.length ? (
							table.getRowModel().rows.map((row) => (
								<TableRow
									key={row.id}
									data-state={row.getIsSelected() && "selected"}
								>
									{row.getVisibleCells().map((cell) => (
										<TableCell key={cell.id}>
											{flexRender(cell.column.columnDef.cell, cell.getContext())}
										</TableCell>
									))}
								</TableRow>
							))
						) : (
							<TableRow>
								<TableCell colSpan={columns.length} className="h-24 text-center">
									Нет результатов
								</TableCell>
							</TableRow>
						)}
					</TableBody>
				</Table>
			</div>
			<DataTablePagination table={table} />
		</div>
	)
}
