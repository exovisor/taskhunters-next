import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { FormControl } from '@/components/ui/form';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { format } from 'date-fns';
import { ru } from 'date-fns/locale';
import { CalendarDays } from 'lucide-react';
import { Calendar } from '@/components/ui/calendar';
import * as React from 'react';
import type { ControllerRenderProps, FieldValues, Path } from 'react-hook-form';

export type CalendarInputProps<TFieldValues extends FieldValues, TName extends Path<TFieldValues>> = {
  field: ControllerRenderProps<TFieldValues, TName>;
  disabled?: (date: Date) => boolean;
};

export function CalendarInput<TFieldValues extends FieldValues, TName extends Path<TFieldValues>>({ field, disabled }: CalendarInputProps<TFieldValues, TName>) {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <FormControl>
          <Button
            variant={'outline'}
            className={cn(
              'pl-3 text-left font-normal',
              !field.value && 'text-muted-foreground'
            )}
          >
            {field.value ? (
              format(field.value, 'PPP', { locale: ru })
            ) : (
              <span>Выберите дату</span>
            )}
            <CalendarDays className='ml-auto h-4 w-4 opacity-50' />
          </Button>
        </FormControl>
      </PopoverTrigger>
      <PopoverContent className='w-auto p-0' align='start'>
        <Calendar
          mode='single'
          selected={field.value}
          onSelect={field.onChange}
          disabled={disabled ?? (() => false)}
          initialFocus
          locale={ru}
        />
      </PopoverContent>
    </Popover>
  );
}
