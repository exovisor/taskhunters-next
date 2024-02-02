'use client';

import React, {useState} from 'react';
import {Input} from '@/components/ui/input';
import {Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage} from '@/components/ui/form';
import {useForm} from 'react-hook-form';
import {z} from 'zod';
import {zodResolver} from '@hookform/resolvers/zod';
import {Button} from '@/components/ui/button';
import {Save} from 'lucide-react';
import {type File as FileInfo} from '@prisma/client';
import {FileCard} from '@/components/uploads/file-card';

export enum FileUploadState {
  New,
  Existing,
}

const MAX_FILE_SIZE = 1024 * 1024 * 5; // 5 MB
const SUPPORTED_FILE_TYPES = ['image/jpg', 'image/jpeg', 'image/png', 'application/pdf'];

const fileSchema = z.object({
  files: z
    .custom<FileList>()
    .refine((files) => files?.length === 1, 'Файл не выбран')
    .refine((files) => files[0]?.size! <= MAX_FILE_SIZE, `Файл не должен превышать ${MAX_FILE_SIZE / 1024 / 1024} MB`)
    .refine((files) => SUPPORTED_FILE_TYPES.includes(files[0]?.type!), 'Файл должен быть одного из следующих типов: .jpg, .jpeg, .png, .pdf'),
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
  label?: string;
  description?: string;
}

export function FileUploadButton({
  reason,
  initFile,
  label,
  description,
}: FileUploadButtonProps) {
  const [status, setStatus] = useState(initFile ? FileUploadState.Existing : FileUploadState.New);
  const [file, setFile] = useState<FileInfo | undefined>(initFile);

  const form = useForm<z.infer<typeof fileSchema>>({
    resolver: zodResolver(fileSchema),
    defaultValues: {
      files: undefined,
    },
    mode: 'onChange',
  });
  const fileRef = form.register('files', { required: true });

  async function onSubmit(values: z.infer<typeof fileSchema>) {
    const [file] = values.files;
    if (!file) return;

    const res = await uploadFile(file, reason);
    if (!res) return;

    setFile(res);
    setStatus(FileUploadState.Existing);
  }

  function onDelete() {
    setFile(undefined);
    setStatus(FileUploadState.New);
  }

  return (
    <>
      {
        status === FileUploadState.New &&
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-8 space-x-2 flex"
          >
            <FormField
              control={form.control}
              name="files"
              render={() => (
                <FormItem>
                  <FormLabel>{label ?? 'Выберите файл'}</FormLabel>
                  <FormControl>
                    <Input type='file' {...fileRef} />
                  </FormControl>
                  <FormDescription>
                    { description ?? 'Поддерживаемые форматы: .jpg, .jpeg, .png, .pdf' }
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit" size='icon' variant='outline'><Save className='w-4 h-4' /></Button>
          </form>
        </Form>
      }
      {
        status === FileUploadState.Existing &&
          <FileCard file={file} onDelete={onDelete} editable />
      }
    </>
  );
}
