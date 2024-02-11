import {
  type ColumnDef,
  type PaginationState,
  type SortingState,
  type ColumnFiltersState,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from '@tanstack/react-table';

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { DataTablePagination } from '@/components/table/pagination';
import { useEffect, useMemo, useState } from 'react';
import type { z } from 'zod';
import type { filterTypes, queryOptionsSchema } from '@/server/schema/query';
import { DataTableToolbar } from '@/components/table/toolbar';
import type { RowData } from '@tanstack/table-core';
import * as React from 'react';

declare module '@tanstack/react-table' {
  interface ColumnMeta<TData extends RowData, TValue> {
    filterType?: typeof filterTypes[number] | undefined;
    enumSource?: {
      label: string
      value: string
      icon?: React.ComponentType<{ className?: string }>
    }[];
  }
}

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
  const [ { pageIndex, pageSize }, setPagination ] = useState<PaginationState>({
    pageIndex: 0,
    pageSize: 10,
  });
  const pagination = useMemo(
    () => ({
      pageIndex,
      pageSize,
    }),
    [ pageIndex, pageSize ]
  );

  const defaultSort = {
    id: 'id',
    desc: true,
  };
  const [ sortingState, setSorting ] = useState<SortingState>([ defaultSort ]);
  const sorting = useMemo(() => (sortingState), [ sortingState ]);

  const [ filtersState, setFitlersState ] = useState<ColumnFiltersState>([]);
  const columnFilters = useMemo(() => filtersState, [ filtersState ]);

  const table = useReactTable({
    data: payload?.rows ?? [],
    columns,
    pageCount: payload?.meta?.totalCount ? Math.ceil(payload.meta.totalCount / pageSize) : -1,
    state: {
      pagination: pagination,
      sorting: sorting,
      columnFilters: columnFilters,
    },
    onPaginationChange: setPagination,
    onSortingChange: setSorting,
    onColumnFiltersChange: setFitlersState,
    getCoreRowModel: getCoreRowModel(),
    manualPagination: true,
    manualSorting: true,
    manualFiltering: true,
    debugTable: true,
  });

  useEffect(() => {
    setQueryOptions({
      paginationOptions: pagination,
      sortingOptions: sorting.length > 0 ? sorting[0] : undefined,
      filterOptions: columnFilters.length > 0 ? columnFilters.map((cf) => ({
        id: cf.id,
        value: cf.value as string[],
        type: table.getColumn(cf.id ?? '')?.columnDef?.meta?.filterType,
      })) : undefined,
    });
  }, [ table, setQueryOptions, pagination, sorting, columnFilters ]);

  return (
    <div className='space-y-4'>
      <DataTableToolbar table={table} />
      <div className='rounded-md border'>
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
                  );
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && 'selected'}
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
                <TableCell colSpan={columns.length} className='h-24 text-center'>
									Нет результатов
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      <DataTablePagination table={table} />
    </div>
  );
}
