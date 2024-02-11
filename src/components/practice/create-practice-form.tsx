'use client';

import { useForm } from 'react-hook-form';
import { type z } from 'zod';
import { createPracticeSchema } from '@/server/schema/practice';
import { zodResolver } from '@hookform/resolvers/zod';
import { useToast } from '@/components/ui/use-toast';
import { api } from '@/trpc/react';
import { ru } from 'date-fns/locale';

import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { cn } from '@/lib/utils';
import { CalendarDays, Check, ChevronsUpDown } from 'lucide-react';
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem } from '@/components/ui/command';
import { type Institute, type PracticeType, type Specialty, type File } from '@prisma/client';
import * as React from 'react';
import { Calendar } from '@/components/ui/calendar';
import { addMonths, format } from 'date-fns';
import { FileUploadButton } from '@/components/uploads/file-upload-button';

export type CreatePracticeFormProps = {
  studentProfileId: number;
};

export function CreatePracticeForm({ studentProfileId }: CreatePracticeFormProps) {
  const form = useForm<z.infer<typeof createPracticeSchema>>({
    resolver: zodResolver(createPracticeSchema),
    defaultValues: {
      studentProfileId: studentProfileId,
    },
    reValidateMode: 'onChange',
  });

  const { toast } = useToast();

  const { data: instituteData } = api.dictionaries.getInstitutes.useQuery({});
  const institutes = (instituteData?.rows ?? []) as Institute[];
  const { data: practiceTypeData } = api.dictionaries.getPracticeTypes.useQuery({});
  const practiceTypes = (practiceTypeData?.rows ?? []) as PracticeType[];
  const { data: specialityData } = api.dictionaries.getSpecialties.useQuery({});
  const specialties = (specialityData?.rows ?? []) as Specialty[];

  const { mutate: createPractice } = api.practice.createPractice.useMutation({
    onSuccess: () => {
      toast({
        title: 'Практика создана',
      });
    },
    onError: (err) => {
      toast({
        variant: 'destructive',
        title: 'Что-то пошло не так',
        description: JSON.stringify(err),
      });
    },
  });

  function handleFileUpload(file: File) {
    form.setValue('assignmentFileId', file.id);
  }

  async function onSubmit(values: z.infer<typeof createPracticeSchema>) {
    createPractice(values);
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-8'>
        <FormField
          control={form.control}
          name='typeId'
          render={({ field }) => (
            <FormItem className='flex flex-col'>
              <FormLabel>Тип практики</FormLabel>
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
                        )?.name
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
                          value={type.id}
                          key={type.id}
                          onSelect={() => {
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
                          {type.name}
                        </CommandItem>
                      ))}
                    </CommandGroup>
                  </Command>
                </PopoverContent>
              </Popover>
              <FormDescription>
                Выберите тип практики
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name='instituteId'
          render={({ field }) => (
            <FormItem className='flex flex-col'>
              <FormLabel>Учебное заведение</FormLabel>
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
                        )?.name
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
                          value={institute.id}
                          key={institute.id}
                          onSelect={() => {
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
                          {institute.name}
                        </CommandItem>
                      ))}
                      <CommandItem value={''} onSelect={() => {
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
              <FormDescription>
                Укажите институт, в котором вы учитесь
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name='specialityId'
          render={({ field }) => (
            <FormItem className='flex flex-col'>
              <FormLabel>Специализация</FormLabel>
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
                        )?.name
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
                          value={type.id}
                          key={type.id}
                          onSelect={() => {
                            form.setValue('specialityId', type.id);
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
                          {type.name}
                        </CommandItem>
                      ))}
                      <CommandItem value={''} onSelect={() => {
                        form.setValue('specialityId', undefined);
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
              <FormDescription>
                Выберите тип практики
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name='year'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Курс</FormLabel>
              <Input
                type='number'
                placeholder='Введите номер курса'
                onChange={(e) => {
                  const value = e.target.value;
                  if (value === '') {
                    field.onChange(undefined);
                    return;
                  }
                  field.onChange(parseInt(value));
                }}
              />
              <FormDescription>
                Укажите курс, на котором вы учитесь
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name='start_date'
          render={({ field }) => (
            <FormItem className='flex flex-col'>
              <FormLabel>Дата начала практики</FormLabel>
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
                    disabled={(date) =>
                      date > addMonths(new Date(), 6) || date < addMonths(new Date(), -6) || date > form.getValues('end_date')
                    }
                    initialFocus
                    locale={ru}
                  />
                </PopoverContent>
              </Popover>
              <FormDescription>
                Укажите дату начала практики
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name='end_date'
          render={({ field }) => (
            <FormItem className='flex flex-col'>
              <FormLabel>Дата окончания практики</FormLabel>
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
                    disabled={(date) =>
                      date > addMonths(new Date(), 6) || date < form.getValues('start_date')
                    }
                    initialFocus
                    locale={ru}
                  />
                </PopoverContent>
              </Popover>
              <FormDescription>
                Укажите дату окончания практики
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name='assignmentFileId'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Направление на практику</FormLabel>
              <FileUploadButton
                reason='practice-assignment'
                onUpload={handleFileUpload}
              />
              <FormDescription>
                Поддерживаются файлы форматов: .pdf, .jpg, .png
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type='submit'>Зарегистрировать</Button>
      </form>
    </Form>
  );
}
