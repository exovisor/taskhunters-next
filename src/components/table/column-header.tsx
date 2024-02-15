import {
  ArrowDownWideNarrow,
  ArrowUpNarrowWide,
  ChevronsUpDown,
  EyeOff,
} from 'lucide-react';
import type { Column } from '@tanstack/react-table';

import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import React from 'react';
import { getColumnLabelByName } from '@/lib/columns';

interface DataTableColumnHeaderProps<TData, TValue>
  extends React.HTMLAttributes<HTMLDivElement> {
  column: Column<TData, TValue>;
}

export function DataTableColumnHeader<TData, TValue>({
  column,
  className,
}: DataTableColumnHeaderProps<TData, TValue>) {
  if (!column.getCanSort()) {
    return (
      <div
        className={cn(
          column.getIsPinned() ? 'bg-background sticky right-0' : '',
          className,
        )}
      >
        {getColumnLabelByName(column.id) ?? column.id}
      </div>
    );
  }

  return (
    <div
      className={cn(
        'flex items-center space-x-2',
        column.getIsPinned() ? 'sticky' : '',
        className,
      )}
    >
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            variant='ghost'
            size='sm'
            className='data-[state=open]:bg-accent -ml-3 h-8'
          >
            <span>{getColumnLabelByName(column.id) ?? column.id}</span>
            {column.getIsSorted() === 'desc' ? (
              <ArrowDownWideNarrow className='ml-2 h-4 w-4' />
            ) : column.getIsSorted() === 'asc' ? (
              <ArrowUpNarrowWide className='ml-2 h-4 w-4' />
            ) : (
              <ChevronsUpDown className='ml-2 h-4 w-4' />
            )}
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align='start'>
          <DropdownMenuItem onClick={() => column.toggleSorting(false)}>
            <ArrowUpNarrowWide className='text-muted-foreground/70 mr-2 h-3.5 w-3.5' />
            По возрастанию
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => column.toggleSorting(true)}>
            <ArrowDownWideNarrow className='text-muted-foreground/70 mr-2 h-3.5 w-3.5' />
            По убыванию
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem onClick={() => column.toggleVisibility(false)}>
            <EyeOff className='text-muted-foreground/70 mr-2 h-3.5 w-3.5' />
            Скрыть
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}
