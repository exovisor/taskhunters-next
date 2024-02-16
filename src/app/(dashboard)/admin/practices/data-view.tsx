'use client';

import { DataTableColumnHeader } from '@/components/table/column-header';
import { DataTable } from '@/components/table/data-table';
import { getStatusByValue, status } from '@/lib/status';
import { type PracticeWithIncludes } from '@/server/schema/practice';
import { type queryOptionsSchema } from '@/server/schema/query';
import { api } from '@/trpc/react';
import { type ColumnDef } from '@tanstack/react-table';
import { format } from 'date-fns';
import { ru } from 'date-fns/locale';
import { useState } from 'react';
import { type z } from 'zod';

export const getColumns: (
  refetch: () => Promise<unknown>
) => ColumnDef<PracticeWithIncludes>[] = (refetch) => [
  {
    accessorKey: 'id',
    header: ({ column }) => <DataTableColumnHeader column={column} />,
    meta: {
      filterType: 'number',
    },
  },
  {
    accessorKey: 'status',
    header: ({ column }) => <DataTableColumnHeader column={column} />,
    cell: ({ row }) =>
      getStatusByValue(row.getValue('status'))?.label ??
      String(row.getValue('status')),
    meta: {
      filterType: 'enum',
      enumSource: status,
    },
  },
  {
    accessorKey: 'student',
    header: ({ column }) => <DataTableColumnHeader column={column} />,
    cell: ({ row }) =>
      row.original.student.fullname,
    meta: {
    },
  },
  {
    accessorKey: 'type',
    header: ({ column }) => <DataTableColumnHeader column={column} />,
    cell: ({ row }) =>
      row.original.type.value,
    meta: {
    },
  },
  {
    accessorKey: 'institute',
    header: ({ column }) => <DataTableColumnHeader column={column} />,
    cell: ({ row }) =>
      row.original.institute?.value ?? 'Не указано',
    meta: {
    },
  },
  {
    accessorKey: 'speciality',
    header: ({ column }) => <DataTableColumnHeader column={column} />,
    cell: ({ row }) =>
      row.original.speciality?.value ?? 'Не указано',
    meta: {
    },
  },
  {
    accessorKey: 'createdAt',
    header: ({ column }) => <DataTableColumnHeader column={column} />,
    cell: ({ row }) =>
      format(new Date(row.getValue('createdAt')), 'HH:mm dd.MM.yyyy', {
        locale: ru,
      }),
    meta: {
      filterType: 'date',
    },
  },
  {
    id: 'actions',
    cell: ({ row }) => {
      return <div>actions</div>;
    }
  }
];

export function PracticeDataView() {
  const [ queryOptions, setQueryOptions ] = useState<
    z.infer<typeof queryOptionsSchema>
  >({
    paginationOptions: {
      pageIndex: 0,
      pageSize: 10,
    },
  });
  const { data, refetch } = api.practice.getPractices.useQuery(queryOptions);
  return (
    <DataTable
      columns={getColumns(refetch)}
      setQueryOptions={setQueryOptions}
      payload={data}
    />
  );
}
