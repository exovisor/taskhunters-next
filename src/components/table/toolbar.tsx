'use client';

import {X} from 'lucide-react';
import type { Table } from '@tanstack/react-table';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { DataTableViewOptions } from './column-toggle';

import { DataTableFacetedFilter } from './faceted-filter';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {useEffect, useState} from 'react';

interface DataTableToolbarProps<TData> {
  table: Table<TData>
}

export function DataTableToolbar<TData>({
  table,
}: DataTableToolbarProps<TData>) {
  const isFiltered = table.getState().columnFilters.length > 0;

  const allColumns = table.getAllColumns();
  const enumColumns = allColumns.filter((col) => (
    col.columnDef.meta?.filterType === 'enum' && col.columnDef.meta.enumSource
  ));
  const dateColumns = allColumns.filter((col) => (
    col.columnDef.meta?.filterType === 'date'
  ));
  const valueColumns = allColumns.filter((col) =>
    col.columnDef.meta?.filterType === 'value');

  const [valueFilterColumn, setValueFilterColumn] = useState<string>('');
  const [valueFilterText, setValueFilterText] = useState<string>('');

  function reset() {
    setValueFilterColumn(() => '');
    setValueFilterText(() => '');
    table.resetColumnFilters();
  }

  useEffect(() => {
    if (valueFilterColumn && valueFilterText && valueFilterText.length > 2) {
      table.getColumn(valueFilterColumn)?.setFilterValue([valueFilterText]);
    }
  }, [table, valueFilterColumn, valueFilterText]);

  return (
    <div className="flex items-center justify-between">
      <div className="flex flex-1 items-center space-x-2">
        <Select onValueChange={(v) => {
          table.getColumn(valueFilterColumn)?.setFilterValue(undefined);
          setValueFilterColumn(v);
        }} value={valueFilterColumn}>
          <SelectTrigger className="w-[120px] h-8 capitalize">
            <SelectValue placeholder="Столбец"/>
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              {
                valueColumns.map((col) => (
                  <SelectItem key={col.id} value={col.id} className="capitalize">{col.id}</SelectItem>
                ))
              }
            </SelectGroup>
          </SelectContent>
        </Select>
        <Input
          placeholder="Поиск..."
          value={valueFilterText ?? ''}
          onChange={(e) => setValueFilterText(e.target.value)}
          className="h-8 w-[150px]"
        />
        {enumColumns.map((col) => (
          <DataTableFacetedFilter
            key={col.id}
            column={col}
            title="Роли"
            options={col.columnDef.meta!.enumSource!}
          />
        ))}
        {(isFiltered || valueFilterColumn || valueFilterText) && (
          <Button
            variant="ghost"
            onClick={() => reset()}
            className="h-8 px-2 lg:px-3"
          >
						Сбросить
            <X className="ml-2 h-4 w-4" />
          </Button>
        )}
      </div>
      <DataTableViewOptions table={table} />
    </div>
  );
}
