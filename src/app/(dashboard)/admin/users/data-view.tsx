'use client';

import { api } from '@/trpc/react';
import { DataTable } from '@/components/table/data-table';
import { useState } from 'react';
import type { queryOptionsSchema } from '@/server/schema/query';
import type { z } from 'zod';
import { type ColumnDef } from '@tanstack/react-table';
import { type User } from '@prisma/client';
import { DataTableColumnHeader } from '@/components/table/column-header';
import { getRoleByValue, roles } from '@/lib/roles';
import { ru } from 'date-fns/locale';
import { format } from 'date-fns';
import { UserTableDropdown } from '@/components/user/user-table-dropdown';

export const getColumns: (
  refetch: () => Promise<unknown>
) => ColumnDef<User>[] = (
  refetch
) => ([
  {
    accessorKey: 'id',
    header: ({ column }) =>
      (<DataTableColumnHeader column={column} title='Id' />),
    meta: {
      filterType: 'value',
    },
  },
  {
    accessorKey: 'username',
    header: ({ column }) =>
      (<DataTableColumnHeader column={column} title='Имя Telegram' />),
    meta: {
      filterType: 'value',
    },
  },
  {
    accessorKey: 'displayName',
    header: ({ column }) =>
      (<DataTableColumnHeader column={column} title='Отображаемое имя' />),
    meta: {
      filterType: 'value',
    },
  },
  {
    accessorKey: 'email',
    header: ({ column }) =>
      (<DataTableColumnHeader column={column} title='Электронная почта' />),
    meta: {
      filterType: 'value',
    },
  },
  {
    accessorKey: 'role',
    header: ({ column }) =>
      (<DataTableColumnHeader column={column} title='Роль' />),
    cell: ({ row }) =>
      (getRoleByValue(row.getValue('role'))?.label ?? String(row.getValue('role'))),
    meta: {
      filterType: 'enum',
      enumSource: roles,
    },
  },
  {
    accessorKey: 'createdAt',
    header: ({ column }) =>
      (<DataTableColumnHeader column={column} title='Дата создания' />),
    cell: ({ row }) => format(new Date(row.getValue('createdAt')), 'HH:mm dd.MM.yyyy', { locale: ru }),
    meta: {
      filterType: 'date',
    },
  },
  {
    accessorKey: 'updatedAt',
    header: ({ column }) =>
      (<DataTableColumnHeader column={column} title='Дата обновления' />),
    cell: ({ row }) => format(new Date(row.getValue('updatedAt')), 'HH:mm dd.MM.yyyy', { locale: ru }),
    meta: {
      filterType: 'date',
    },
  },
  {
    id: 'actions',
    cell: ({ row }) => {
      const user = row.original;
      return <UserTableDropdown user={user} refetch={refetch} />;
    },
  },
]);

export function UsersDataView() {
  const [ queryOptions, setQueryOptions ] = useState<z.infer<typeof queryOptionsSchema>>({
    paginationOptions: {
      pageIndex: 0,
      pageSize: 10,
    },
  });
  const { data, refetch } = api.user.getUsers.useQuery(queryOptions);
  return <DataTable columns={getColumns(refetch)} setQueryOptions={setQueryOptions} payload={data} />;
}
