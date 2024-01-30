'use client';

import {useForm} from 'react-hook-form';
import {zodResolver} from '@hookform/resolvers/zod';
import {updateStudentProfileSchema} from '@/server/schema/user';
import type {z} from 'zod';
import {signOut} from 'next-auth/react';
import {Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage} from '@/components/ui/form';
import {Button} from '@/components/ui/button';
import {Input} from '@/components/ui/input';
import {api} from '@/trpc/react';
import {useToast} from '@/components/ui/use-toast';

interface Props {
  initData: {
    userId: string;
    email?: string | undefined;
    fullname?: string | undefined;
    phone?: string | undefined;
  };
  hasProfile: boolean | undefined;
}

const EditProfile = ({ initData, hasProfile }: Props) => {
  const form = useForm<z.infer<typeof updateStudentProfileSchema>>({
    resolver: zodResolver(updateStudentProfileSchema),
    defaultValues: {
      ...initData,
    },
    reValidateMode: 'onChange',
  });

  const { toast } = useToast();

  const {mutate: updateFn} = api.student.createOrUpdateStudentProfile.useMutation({
    onSuccess: () => {
      toast({
        title: 'Изменения сохранены',
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

  async function onSubmit(values: z.infer<typeof updateStudentProfileSchema>) {
    updateFn(values);
    if (!hasProfile) {
      await signOut({ callbackUrl: '/' });
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="fullname"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Полное имя</FormLabel>
              <FormControl>
                <Input placeholder="Введите ваше ФИО" {...field} />
              </FormControl>
              <FormDescription>
								Укажите фамилию, имя и отчество.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="phone"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Номер телефона</FormLabel>
              <FormControl>
                <Input placeholder="+7 000 000 00 00" {...field} />
              </FormControl>
              <FormDescription>
								Укажите мобильный номер.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Электронная почта</FormLabel>
              <FormControl>
                <Input placeholder="mail@example.org" {...field} />
              </FormControl>
              <FormDescription>
								Укажите адрес электронной почты.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type='submit'>Сохранить</Button>
      </form>
    </Form>
  );
};

export { EditProfile };
