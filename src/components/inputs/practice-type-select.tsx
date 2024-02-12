import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { FormControl } from '@/components/ui/form';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { Check, ChevronsUpDown } from 'lucide-react';
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem } from '@/components/ui/command';
import * as React from 'react';
import { type ControllerRenderProps, type FieldValues, type UseFormReturn } from 'react-hook-form';
import { api } from '@/trpc/react';

type WithTypeFieldValues<TFieldValues extends FieldValues> = {
  typeId: number;
} & TFieldValues;

export type PracticeTypeSelectProps<TFieldValues extends FieldValues> = {
  form: UseFormReturn<WithTypeFieldValues<TFieldValues>>;
  // @ts-expect-error TODO: Find workaround
  field: ControllerRenderProps<WithTypeFieldValues<TFieldValues>, 'typeId'>;
};

export function PracticeTypeSelect<TFieldValues extends FieldValues>({ field, form }: PracticeTypeSelectProps<TFieldValues>) {
  const { data: practiceTypeData } = api.dictionaries.getPracticeTypes.useQuery({});
  const practiceTypes = (practiceTypeData?.rows ?? []);

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
              ? practiceTypes.find(
                (type) => type.id === field.value
              )?.value
              : 'Выберите тип'}
            <ChevronsUpDown className='ml-2 h-4 w-4 shrink-0 opacity-50' />
          </Button>
        </FormControl>
      </PopoverTrigger>
      <PopoverContent className='p-0' align='start'>
        <Command>
          <CommandInput placeholder='Поиск по типам...' />
          <CommandEmpty>Тип не найден...</CommandEmpty>
          <CommandGroup>
            {practiceTypes.map((type) => (
              <CommandItem
                value={type.id.toString()}
                key={type.id}
                onSelect={() => {
                  // @ts-expect-error TODO: Check #17
                  form.setValue('typeId', type.id);
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
          </CommandGroup>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
