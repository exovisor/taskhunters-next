'use client';

import { api } from '@/trpc/react';
import {
  AlertDialog, AlertDialogAction, AlertDialogCancel,
  AlertDialogContent, AlertDialogDescription, AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger
} from '@/components/ui/alert-dialog';
import { Button } from '@/components/ui/button';
import { Trash2 } from 'lucide-react';
import { useToast } from '@/components/ui/use-toast';
import { useRouter } from 'next/navigation';

export function DeletePracticeButton({ practiceId, redirectUrl }: { practiceId: number, redirectUrl: string }) {
  const router = useRouter();
  const { toast } = useToast();
  const { mutate } = api.practice.deletePractice.useMutation({
    onSuccess: () => {
      toast({
        title: 'Практика удалена',
      });
      router.push(redirectUrl);
    },
    onError: (error) => {
      toast({
        title: 'Ошибка при удалении практики',
        description: error.message,
        variant: 'destructive',
      });
    }
  });
  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button variant='destructive'>
          <Trash2 className='mr-2 h-4 w-4' />
          Удалить
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Вы уверены?</AlertDialogTitle>
          <AlertDialogDescription>
            После удаления практики её невозможно будет восстановить. Это также удалит все файлы, связанные с практикой.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Отмена</AlertDialogCancel>
          <AlertDialogAction variant='destructive' onClick={() => mutate({ id: practiceId })}>
            <Trash2 className='mr-2 h-4 w-4' />
            Удалить
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
