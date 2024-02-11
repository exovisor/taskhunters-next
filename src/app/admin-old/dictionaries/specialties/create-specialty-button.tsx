'use client';

import {DictionaryCreateFormDialog} from '@/app/admin-old/dictionaries/_components/dictionary-create-form-dialog';
import {toast} from '@/components/ui/use-toast';
import {api} from '@/trpc/react';

export function CreateSpecialtyButton() {
  const {mutate: createFn} = api.dictionaries.createSpecialty.useMutation({
    onSuccess: () => {
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
