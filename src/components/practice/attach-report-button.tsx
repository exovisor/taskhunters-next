'use client';

import { FileUploadButton } from '@/components/uploads/file-upload-button';
import { Label } from '@/components/ui/label';
import {
  Dialog,
  DialogContent,
  DialogDescription, DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { type File, type Practice } from '@prisma/client';
import { useRouter } from 'next/navigation';
import { useToast } from '@/components/ui/use-toast';
import { api } from '@/trpc/react';
import { useState } from 'react';

export type AttachReportButtonProps = {
  practice: Practice;
  existingReport: File | null;
};
export function AttachReportButton({ practice, existingReport }: AttachReportButtonProps) {
  const router = useRouter();
  const { toast } = useToast();
  const [ open, setOpen ] = useState(false);
  const [ fileId, setFileId ] = useState<number | null>(existingReport?.id ?? null);
  const { mutate } = api.practice.attachReportFile.useMutation({
    onSuccess: () => {
      toast({
        title: 'Отчет прикреплен',
      });
      setOpen(false);
      router.refresh();
    },
    onError: (err) => {
      toast({
        title: 'Ошибка прикрепления отчета',
      });
    },
  });

  function handleSubmit() {
    if (!fileId) {
      return;
    }
    mutate({
      practiceId: practice.id,
      reportFileId: fileId,
    });
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant='outline' onClick={() => setOpen(true)}>{
          practice.status === 'VERIFIED' ? 'Прикрепить отчет' : 'Обновить отчет'
        }</Button>
      </DialogTrigger>
      <DialogContent className='sm:max-w-[425px]'>
        <DialogHeader>
          <DialogTitle>Добавление отчета</DialogTitle>
          <DialogDescription>
            Прикрепите отчет, чтобы отправить практику на проверку
          </DialogDescription>
        </DialogHeader>
        <FileUploadButton
          reason={'report'}
          initFile={existingReport ?? undefined}
          onUpload={(file) => {
            setFileId(file ? file.id : null);
          }}
          deleteOnChange={!existingReport}
        />
        <span className='text-sm text-muted-foreground'>
          Отчет должен быть в формате PDF
        </span>
        <DialogFooter>
          <Button type='submit' onClick={handleSubmit}>Отправить на проверку</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
