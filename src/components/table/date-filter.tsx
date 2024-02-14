import { type Column } from '@tanstack/react-table';
import { format } from 'date-fns';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { Calendar as CalendarIcon } from 'lucide-react';
import { ru } from 'date-fns/locale';
import { Calendar } from '../ui/calendar';

interface DataTableDateFilterProps<TData, TValue> {
  column?: Column<TData, TValue>;
  title: string;
}

export function DataTableDateFilter<TData, TValue>({
  column,
  title
}: DataTableDateFilterProps<TData, TValue>) {
  const rawFilter = (column?.getFilterValue() as string[]);
  const date = {
    from: rawFilter?.[0] ? new Date(rawFilter[0]) : undefined,
    to: rawFilter?.[1] ? new Date(rawFilter[1]) : undefined,
  };

  return (
    <div className='grid gap-2'>
      <Popover>
        <PopoverTrigger asChild>
          <Button
            id='date'
            variant={'outline'}
            size={'sm'}
            className={cn(
              'justify-start text-left font-normal h-8 border-dashed',
              !date && 'text-muted-foreground',
            )}
          >
            <CalendarIcon className='mr-2 h-4 w-4' />
            <span className='capitalize mr-2'>{title}</span>
            {date?.from &&
              (date.to ? (
                <>
                  {format(date.from, 'LLL dd, y', { locale: ru })} -{' '}
                  {format(date.to, 'LLL dd, y', { locale: ru })}
                </>
              ) : (
                format(date.from, 'LLL dd, y', { locale: ru })
              ))}
          </Button>
        </PopoverTrigger>
        <PopoverContent className='w-auto p-0' align='start'>
          <Calendar
            initialFocus
            mode='range'
            defaultMonth={date?.from}
            selected={date}
            locale={ru}
            onSelect={(date) => {
              column?.setFilterValue([ date?.from?.toISOString(), date?.to?.toISOString() ]);
            }}
            numberOfMonths={2}
          />
        </PopoverContent>
      </Popover>
    </div>
  );
}
