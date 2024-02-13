import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { type z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { useEffect } from 'react';
import { dictionaryUpdateSchema } from '@/server/schema/dictionary';

type Row = {
  id: number | undefined;
  value: string | undefined;
};

type Props = {
  isOpen: boolean;
  row: Row;
  onSave: (props: z.infer<typeof dictionaryUpdateSchema>) => void;
  onClose: () => void;
};

export function DictionaryUpdateFormDialog({
  isOpen,
  row,
  onSave,
  onClose,
}: Props) {

  const form = useForm<z.infer<typeof dictionaryUpdateSchema>>({
    resolver: zodResolver(dictionaryUpdateSchema),
    defaultValues: row,
  });
  const { reset } = form;

  useEffect(() => {
    reset(row);
  }, [ row,reset ]);

  function handleSubmit(data: z.infer<typeof dictionaryUpdateSchema>) {
    onSave(data);
    onClose();
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className='sm:max-w-[425px]'>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(handleSubmit)}>
            <DialogHeader>
              <DialogTitle>
								Редактирование записи #{row.id}
              </DialogTitle>
              <DialogDescription>
								Внесите необходимые изменения
              </DialogDescription>
            </DialogHeader>
            <div className='grid gap-4 py-4'>
              <FormField
                control={form.control}
                name='value'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Значение</FormLabel>
                    <FormControl>
                      <Input placeholder='Введите значение...' {...field} />
                    </FormControl>
                    <FormDescription>
											Значение словаря
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <DialogFooter>
              <Button type='submit'>Сохранить изменения</Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
