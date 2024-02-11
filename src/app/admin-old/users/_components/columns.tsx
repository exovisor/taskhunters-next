'use client';

import type { ColumnDef } from '@tanstack/react-table';
import type { User } from '@prisma/client';
import { roleToString } from '@/lib/utils';
import { TableActionsDropdown } from './table-actions-dropdown';
import { DataTableColumnHeader } from '@/components/table/column-header';
import { format } from 'date-fns';
import { roles } from '@/lib/enums-data';
export const getColumns: (
  refetch: () => Promise<unknown>
) => ColumnDef<User>[] = (
  refetch
) => ([
  {
    accessorKey: 'id',
    header: ({ column }) =>
      (<DataTableColumnHeader column={column} title="Id" />),
    meta: {
      filterType: 'value',
    },
  },
  {
    accessorKey: 'username',
    header: ({ column }) =>
      (<DataTableColumnHeader column={column} title="Имя Telegram" />),
    meta: {
      filterType: 'value',
    },
  },
  {
    accessorKey: 'display_name',
    header: ({ column }) =>
      (<DataTableColumnHeader column={column} title="Отображаемое имя" />),
    meta: {
      filterType: 'value',
    },
  },
  {
    accessorKey: 'email',
    header: ({ column }) =>
      (<DataTableColumnHeader column={column} title="Электронная почта" />),
    meta: {
      filterType: 'value',
    },
  },
  {
    accessorKey: 'role',
    header: ({ column }) =>
      (<DataTableColumnHeader column={column} title="Роль" />),
    cell: ({ row }) =>
      (roleToString(row.getValue('role'))),
    meta: {
      filterType: 'enum',
      enumSource: roles,
    },
  },
  {
    accessorKey: 'created_at',
    header: ({ column }) =>
      (<DataTableColumnHeader column={column} title="Дата создания" />),
    cell: ({ row }) => format(new Date(row.getValue('created_at')), 'HH:mm dd.MM.yyyy'),
    meta: {
      filterType: 'date',
    },
  },
  {
    accessorKey: 'updated_at',
    header: ({ column }) =>
      (<DataTableColumnHeader column={column} title="Дата обновления" />),
    cell: ({ row }) => format(new Date(row.getValue('updated_at')), 'HH:mm dd.MM.yyyy'),
    meta: {
      filterType: 'date',
    },
  },
  {
    id: 'actions',
    cell: ({ row }) => {
      const user = row.original;
      return <TableActionsDropdown user={user} refetch={refetch} />;
    },
  },
]);
