import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { FormControl } from '@/components/ui/form';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { Check, ChevronsUpDown } from 'lucide-react';
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem } from '@/components/ui/command';
import * as React from 'react';
import { type ControllerRenderProps, type FieldValues, type UseFormReturn } from 'react-hook-form';
import { api } from '@/trpc/react';

type WithInstituteFieldValues<TFieldValues extends FieldValues> = {
  instituteId?: number | undefined;
} & TFieldValues;

export type InstituteSelectProps<TFieldValues extends FieldValues> = {
  form: UseFormReturn<WithInstituteFieldValues<TFieldValues>>;
  // @ts-expect-error TODO: Find workaround
  field: ControllerRenderProps<WithInstituteFieldValues<TFieldValues>, 'instituteId'>;
};

export function InstituteSelect<TFieldValues extends FieldValues>({ field, form }: InstituteSelectProps<TFieldValues>) {
  const { data: instituteData } = api.dictionaries.getInstitutes.useQuery({});
  const institutes = (instituteData?.rows ?? []);

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
              ? institutes.find(
                (institute) => institute.id === field.value
              )?.value
              : 'Другое'}
            <ChevronsUpDown className='ml-2 h-4 w-4 shrink-0 opacity-50' />
          </Button>
        </FormControl>
      </PopoverTrigger>
      <PopoverContent className='p-0' align='start'>
        <Command>
          <CommandInput placeholder='Поиск по институтам...' />
          <CommandEmpty>Институт не найден...</CommandEmpty>
          <CommandGroup>
            {institutes.map((institute) => (
              <CommandItem
                value={institute.id.toString()}
                key={institute.id}
                onSelect={() => {
                  // @ts-expect-error TODO: Check #17
                  form.setValue('instituteId', institute.id);
                }}
              >
                <Check
                  className={cn(
                    'mr-2 h-4 w-4',
                    institute.id === field.value
                      ? 'opacity-100'
                      : 'opacity-0'
                  )}
                />
                {institute.value}
              </CommandItem>
            ))}
            <CommandItem value={''} onSelect={() => {
              // @ts-expect-error TODO: Check #17
              form.setValue('instituteId', undefined);
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
