'use client';

import { useForm } from 'react-hook-form';
import { type z } from 'zod';
import { createPracticeSchema } from '@/server/schema/practice';
import { zodResolver } from '@hookform/resolvers/zod';
import { useToast } from '@/components/ui/use-toast';
import { api } from '@/trpc/react';

import { Button } from '@/components/ui/button';
import {
  Form,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { type File } from '@prisma/client';
import * as React from 'react';
import { addMonths } from 'date-fns';
import { FileUploadButton } from '@/components/uploads/file-upload-button';
import { useRouter } from 'next/navigation';
import { PracticeTypeSelect } from '@/components/inputs/practice-type-select';
import { InstituteSelect } from '@/components/inputs/institute-select';
import { SpecialitySelect } from '@/components/inputs/speciality-select';
import { CalendarInput } from '@/components/inputs/calendar-input';

export type CreatePracticeFormProps = {
  studentProfileId: number;
  redirectUrl?: string;
};

export function CreatePracticeForm({ studentProfileId, redirectUrl }: CreatePracticeFormProps) {
  const form = useForm<z.infer<typeof createPracticeSchema>>({
    resolver: zodResolver(createPracticeSchema),
    defaultValues: {
      studentProfileId: studentProfileId,
    },
    reValidateMode: 'onChange',
  });

  const { toast } = useToast();
  const router = useRouter();

  const { mutate: createPractice } = api.practice.createPractice.useMutation({
    onSuccess: async ({ id }) => {
      toast({
        title: 'Практика создана',
      });
      if (redirectUrl) {
        router.push(redirectUrl + '/' + id);
      }
    },
    onError: (err) => {
      toast({
        variant: 'destructive',
        title: 'Что-то пошло не так',
        description: JSON.stringify(err),
      });
    },
  });

  function handleFileUpload(file: File | undefined) {
    if (!file) return;
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
              <PracticeTypeSelect form={form} field={field} />
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
              <InstituteSelect form={form} field={field} />
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
              <SpecialitySelect form={form} field={field} />
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
          name='startDate'
          render={({ field }) => (
            <FormItem className='flex flex-col'>
              <FormLabel>Дата начала практики</FormLabel>
              <CalendarInput
                field={field}
                disabled={(date) =>
                  date > addMonths(new Date(), 6) || date < addMonths(new Date(), -6) || date > form.getValues('endDate')}
              />
              <FormDescription>
                Укажите дату начала практики
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name='endDate'
          render={({ field }) => (
            <FormItem className='flex flex-col'>
              <FormLabel>Дата окончания практики</FormLabel>
              <CalendarInput
                field={field}
                disabled={(date) =>
                  date > addMonths(new Date(), 6) || date < form.getValues('startDate')}
              />
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
          render={() => (
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
