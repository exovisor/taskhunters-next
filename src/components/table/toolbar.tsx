'use client';

import { Filter, X } from 'lucide-react';
import type { Table } from '@tanstack/react-table';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { DataTableViewOptions } from './column-toggle';

import { DataTableFacetedFilter } from './faceted-filter';
import { useState } from 'react';
import { getColumnLabelByName } from '@/lib/columns';
import { DataTableDateFilter } from '@/components/table/date-filter';
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu';

interface DataTableToolbarProps<TData> {
  table: Table<TData>
}

export function DataTableToolbar<TData>({
  table,
}: DataTableToolbarProps<TData>) {
  const isFiltered = table.getState().columnFilters.length > 0;
  const columns = table.getAllColumns();
  const [ activeFilters, setActiveFilters ] = useState<string[]>([]);

  return (
    <div className='flex items-center justify-between flex-col lg:flex-row gap-2'>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            variant='outline'
            size='sm'
            className='h-8 flex'
          >
            <Filter className='mr-2 h-4 w-4' />
            Фильтры
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align='end' className='w-[160px]'>
          <DropdownMenuLabel>Показать фильтры</DropdownMenuLabel>
          <DropdownMenuSeparator />
          {columns
            .filter((column) => column.columnDef?.meta?.filterType)
            .map((column) => {
              return (
                <DropdownMenuCheckboxItem
                  key={column.id}
                  checked={activeFilters.includes(column.id)}
                  onCheckedChange={(value) => setActiveFilters((prev) => value ? [ ...prev, column.id ] : prev.filter((id) => id !== column.id))}
                >
                  {getColumnLabelByName(column.id) ?? column.id}
                </DropdownMenuCheckboxItem>
              );
            })}
        </DropdownMenuContent>
      </DropdownMenu>
      <div className='flex flex-wrap flex-1 items-center gap-2'>
        {activeFilters.map((id) => {
          const column = columns.find((col) => col.id === id);
          if (!column?.columnDef.meta?.filterType) return null;
          if (column.columnDef.meta.filterType === 'enum') {
            return (
              <DataTableFacetedFilter
                key={column.id}
                column={column}
                title={getColumnLabelByName(column.id) ?? column.id}
                options={column.columnDef.meta.enumSource!}
              />
            );
          }
          if (column.columnDef.meta.filterType === 'date') {
            return (
              <DataTableDateFilter
                key={column.id}
                column={column}
                title={getColumnLabelByName(column.id) ?? column.id}
              />
            );
          }
          return (
            <Input
              key={column.id}
              placeholder={getColumnLabelByName(column.id) ?? column.id}
              value={
                (column.getFilterValue() as string[] | undefined)?.[0] ?? ''
              }
              onChange={(e) => column.setFilterValue([ e.target.value ])}
              className='h-8 w-[150px] border-dashed'
            />
          );
        })}
        {(isFiltered) && (
          <Button
            variant='ghost'
            onClick={() => table.resetColumnFilters()}
            className='h-8 px-2 lg:px-3'
          >
						Сбросить
            <X className='ml-2 h-4 w-4' />
          </Button>
        )}
      </div>
      <DataTableViewOptions table={table} />
    </div>
  );
}
