'use client';

import { DictionaryCreateFormDialog } from './dictionary-create-form-dialog';
import { useToast } from '@/components/ui/use-toast';
import { api } from '@/trpc/react';

export function CreateInstituteButton() {
  const { toast } = useToast();
  const { mutate: createFn } = api.dictionaries.createInstitute.useMutation({
    onSuccess: async () => {
      toast({
        title: 'Запись создана',
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
  return (
    <DictionaryCreateFormDialog onSave={createFn} />
  );
}
