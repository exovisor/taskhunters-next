import React, { useState } from 'react';
import { Input } from '@/components/ui/input';
import { z } from 'zod';
import { FileCheck } from 'lucide-react';
import { type File as FileInfo } from '@prisma/client';
import { FileCard } from '@/components/uploads/file-card';
import { useToast } from '@/components/ui/use-toast';

export enum FileUploadState {
  New,
  Existing,
}

const MAX_FILE_SIZE = 1024 * 1024 * 5; // 5 MB
const SUPPORTED_FILE_TYPES = [ 'image/jpg', 'image/jpeg', 'image/png', 'application/pdf' ];

const fileSchema = z.object({
  files: z
    .custom<FileList>()
    .refine((files) => files?.length === 1, 'Файл не выбран')
    .refine((files) => files[0] && files[0].size <= MAX_FILE_SIZE, `Файл не должен превышать ${MAX_FILE_SIZE / 1024 / 1024} MB`)
    .refine((files) => files[0] && SUPPORTED_FILE_TYPES.includes(files[0].type), 'Файл должен быть одного из следующих типов: .jpg, .jpeg, .png, .pdf'),
});

async function uploadFile(file: globalThis.File, reason: string) {
  const formData = new FormData();

  formData.append('file', file);
  formData.append('reason', reason);
  try {
    const res = await fetch('/api/uploads', {
      method: 'POST',
      body: formData,
    });

    if (!res.ok) {
      console.error('Something went wrong');
      return;
    }

    return await res.json() as Promise<FileInfo>;
  } catch (err) {
    console.error(err);
  }
}

export interface FileUploadButtonProps {
  initFile?: FileInfo;
  reason: string;
  onUpload?: (file: FileInfo | undefined) => void;
  deleteOnChange?: boolean;
}

export function FileUploadButton({
  reason,
  initFile,
  onUpload,
  deleteOnChange,
}: FileUploadButtonProps) {
  const [ status, setStatus ] = useState(initFile ? FileUploadState.Existing : FileUploadState.New);
  const [ file, setFile ] = useState<FileInfo | undefined>(initFile);

  const { toast } = useToast();

  async function onSubmit(values: z.infer<typeof fileSchema>) {
    const [ file ] = values.files;
    if (!file) return;

    const res = await uploadFile(file, reason);
    if (!res) return;

    setFile(res);
    setStatus(FileUploadState.Existing);

    if (onUpload) {
      onUpload(res);
    }
  }

  function onDelete() {
    setFile(undefined);
    setStatus(FileUploadState.New);

    if (onUpload) {
      onUpload(undefined);
    }
  }

  return (
    <>
      {
        status === FileUploadState.New &&
          <Input type='file' onChange={async (e) => {
            const files = e.target.files;
            if (!files) return;

            const result = fileSchema.safeParse({ files });
            if (!result.success) {
              toast({
                title: 'Ошибка',
                description: result.error.errors.join('\n'),
                variant: 'destructive',
              });
              return;
            }

            toast({
              title: 'Успешно',
              description: 'Файл сохранен',
              action: <FileCheck className='h-8 w-8' />,
            });

            await onSubmit(result.data);
          }} />
      }
      {
        file && status === FileUploadState.Existing &&
          <FileCard file={file} onDelete={onDelete} editable deletable={deleteOnChange} />
      }
    </>
  );
}
