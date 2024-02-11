import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle, DialogTrigger,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { type z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Plus } from 'lucide-react';
import { dictionaryCreateSchema } from '@/server/schema/dictionary';
import { useState } from 'react';

type Props = {
  onSave: (props: z.infer<typeof dictionaryCreateSchema>) => void;
};

export function DictionaryCreateFormDialog({
  onSave,
}: Props) {
  const [ isOpen, setIsOpen ] = useState(false);
  const form = useForm<z.infer<typeof dictionaryCreateSchema>>({
    resolver: zodResolver(dictionaryCreateSchema),
  });

  function handleSave(data: z.infer<typeof dictionaryCreateSchema>) {
    onSave(data);
    setIsOpen(false);
    form.reset();
  }

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button variant="secondary">
          <Plus className="mr-2 h-4 w-4" /> Добавить
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(handleSave)}>
            <DialogHeader>
              <DialogTitle>
								Создание новой записи
              </DialogTitle>
              <DialogDescription>
								Заполните необходимые поля
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Значение</FormLabel>
                    <FormControl>
                      <Input placeholder="Введите значение..." {...field} />
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
              <Button type="submit">Сохранить изменения</Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
