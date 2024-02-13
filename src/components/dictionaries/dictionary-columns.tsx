'use client';

import type { ColumnDef } from '@tanstack/react-table';
import { DataTableColumnHeader } from '@/components/table/column-header';
import { DictionaryDropdown } from '@/components/dictionaries/dictionary-dropdown';

export function getDictionaryColumns<T extends { id: number; value: string }>(
  deleteMutation: ({ id }: { id: number }) => void,
  openDialog: (id: number, value: string) => void
): ColumnDef<T>[] {
  return [
    {
      accessorKey: 'id',
      header: ({ column }) =>
        (<DataTableColumnHeader column={column} title='Id' />),
      meta: {
        filterType: 'value',
      },
    },
    {
      accessorKey: 'value',
      header: ({ column }) =>
        (<DataTableColumnHeader column={column} title='Значение' />),
      meta: {
        filterType: 'value',
      },
    },
    {
      id: 'actions',
      cell: ({ row }) => {
        const data = row.original;
        return <DictionaryDropdown deleteMutation={() => deleteMutation({ id: data.id })} openDialog={() => openDialog(data.id, data.value)} />;
      },
    },
  ];
}
