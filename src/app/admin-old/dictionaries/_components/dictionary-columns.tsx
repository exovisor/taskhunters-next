'use client';

import type { ColumnDef } from '@tanstack/react-table';
import { DataTableColumnHeader } from '@/components/table/column-header';
import { DictionaryDropdown } from '@/app/admin-old/dictionaries/_components/dictionary-dropdown';

export function getDictionaryColumns<T extends { id: number; name: string }>(
  deleteMutation: ({ id }: { id: number }) => void,
  openDialog: (id: number, value: string) => void
): ColumnDef<T>[] {
  return [
    {
      accessorKey: 'id',
      header: ({ column }) =>
        (<DataTableColumnHeader column={column} title="Id" />),
      meta: {
        filterType: 'value',
      },
    },
    {
      accessorKey: 'name',
      header: ({ column }) =>
        (<DataTableColumnHeader column={column} title="Значение" />),
      meta: {
        filterType: 'value',
      },
    },
    {
      id: 'actions',
      cell: ({ row }) => {
        const data = row.original;
        return <DictionaryDropdown deleteMutation={() => deleteMutation({ id: data.id })} openDialog={() => openDialog(data.id, data.name)} />;
      },
    },
  ];
}
