'use client';

import { createUserSchema } from '@/server/schema/user';
import { api } from '@/trpc/react';
import { useForm } from 'react-hook-form';
import { useToast } from '../ui/use-toast';
import { type z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
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
import { HelpCircle, Plus } from 'lucide-react';
import Link from 'next/link';

export function CreateUserForm() {
  const router = useRouter();
  const { toast } = useToast();
  const { mutate } = api.user.createUser.useMutation({
    onSuccess() {
      toast({
        title: 'Пользователь создан',
      });
      router.refresh();
    },
    onError(error) {
      toast({
        title: 'Ошибка',
        description: error.message,
      });
    },
  });
  const form = useForm<z.infer<typeof createUserSchema>>({
    resolver: zodResolver(createUserSchema),
  });

  const [ isOpen, setIsOpen ] = useState(false);

  function handleSubmit(data: z.infer<typeof createUserSchema>) {
    mutate(data);
    setIsOpen(false);
    form.reset();
  }

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button variant='secondary'>
          <Plus className='mr-2 h-4 w-4' /> Создать пользователя
        </Button>
      </DialogTrigger>
      <DialogContent className='sm:max-w-[425px]'>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(handleSubmit)}>
            <DialogHeader>
              <DialogTitle>Создание пользователя</DialogTitle>
              <DialogDescription>
                Заполните форму для создания нового пользователя.
              </DialogDescription>
            </DialogHeader>
            <div className='grid gap-4 py-4'>
              <FormField
                control={form.control}
                name='telegramId'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Идентификатор Telegram</FormLabel>
                    <FormControl>
                      <Input placeholder='Введите значение...' {...field} />
                    </FormControl>
                    <Link href='/admin/help#telegram-id' target='_blank'>
                      <FormDescription className='mt-2 flex items-center border-b border-dashed'>
                        Как узнать идентификатор Telegram?
                        <HelpCircle className='ml-1 h-4 w-4' />
                      </FormDescription>
                    </Link>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name='email'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Почта (не обязательно)</FormLabel>
                    <FormControl>
                      <Input placeholder='user@example.org' {...field} />
                    </FormControl>
                    <FormDescription>
                      Укажите почту пользователя если она известна.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <DialogFooter>
              <Button variant='secondary' type='submit'>
                Создать пользователя
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
