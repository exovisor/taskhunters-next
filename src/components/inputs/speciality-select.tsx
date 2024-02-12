import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { FormControl } from '@/components/ui/form';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { Check, ChevronsUpDown } from 'lucide-react';
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem } from '@/components/ui/command';
import * as React from 'react';
import type { ControllerRenderProps, FieldValues, Path } from 'react-hook-form';
import { api } from '@/trpc/react';

export type SpecialitySelectProps<TFieldValues extends FieldValues, TName extends Path<TFieldValues>> = {
  field: ControllerRenderProps<TFieldValues, TName>;
};

export function SpecialitySelect<TFieldValues extends FieldValues, TName extends Path<TFieldValues>>({ field }: SpecialitySelectProps<TFieldValues, TName>) {
  const { data: specialityData } = api.dictionaries.getSpecialties.useQuery({});
  const specialties = (specialityData?.rows ?? []);

  return (
    <Popover>
      <PopoverTrigger asChild>
        <FormControl>
          <Button
            variant='outline'
            role='combobox'
            className={cn(
              'justify-between',
              !field.value && 'text-muted-foreground'
            )}
          >
            {field.value
              ? specialties.find(
                (type) => type.id === field.value
              )?.value
              : 'Другое'}
            <ChevronsUpDown className='ml-2 h-4 w-4 shrink-0 opacity-50' />
          </Button>
        </FormControl>
      </PopoverTrigger>
      <PopoverContent className='p-0' align='start'>
        <Command>
          <CommandInput placeholder='Поиск по типам...' />
          <CommandEmpty>Тип не найден...</CommandEmpty>
          <CommandGroup>
            {specialties.map((type) => (
              <CommandItem
                value={type.id.toString()}
                key={type.id}
                onSelect={() => {
                  field.onChange(type.id);
                }}
              >
                <Check
                  className={cn(
                    'mr-2 h-4 w-4',
                    type.id === field.value
                      ? 'opacity-100'
                      : 'opacity-0'
                  )}
                />
                {type.value}
              </CommandItem>
            ))}
            <CommandItem value={''} onSelect={() => {
              field.onChange(undefined);
            }}>
              <Check
                className={cn(
                  'mr-2 h-4 w-4',
                  field.value === undefined ? 'opacity-100' : 'opacity-0'
                )}
              />
              Другое
            </CommandItem>
          </CommandGroup>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
