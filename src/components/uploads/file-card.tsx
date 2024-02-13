'use client';

import { type File as FileInfo } from '@prisma/client';
import { Eye, FileBox, FileImage, Trash2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { api } from '@/trpc/react';
import { toast } from '@/components/ui/use-toast';
import { FilePreview } from '@/components/uploads/file-preview';
import { useRef } from 'react';

type FileCardProps = {
  file: FileInfo;
  editable?: boolean;
  deletable?: boolean;
  onDelete?: () => void;
};

export function FileCard({ file, editable, onDelete, deletable }: FileCardProps) {
  const ref = useRef<HTMLAnchorElement>(null);
  const { mutate: deleteFile } = api.file.deleteFileById.useMutation({
    onSuccess: () => {
      toast({
        title: 'Файл удален',
      });
      onDelete && onDelete();
    },
    onError: (err) => {
      toast({
        title: 'Ошибка при удалении файла',
        description: err.message,
      });
    },
  });

  function handleDelete() {
    if (!deletable) {
      onDelete && onDelete();
      return;
    }
    deleteFile({ id: file.id });
  }

  return (
    <div className=' flex items-center space-x-4 rounded-md border p-4'>
      {
        file.type === 'application/pdf' &&
        <FileBox />
      }
      {
        file.type === 'image/jpeg' &&
        <FileImage />
      }
      {
        file.type === 'image/png' &&
        <FileImage />
      }
      <div className='flex-1 space-y-1'>
        <p className='text-sm font-medium leading-none'>
          {file.name}
        </p>
        <p className='text-sm text-muted-foreground'>
          { (file.size / 1024 / 1024).toPrecision(2) } МБ
        </p>
      </div>
      <div className='flex space-x-2'>
        { file.type !== 'application/pdf' &&
          <FilePreview file={file} />
        }
        {
          file.type === 'application/pdf' &&
          <a href={`/api/uploads/${file.id}`} target='_blank' rel='noopener noreferrer' ref={ref}>
            <Button variant='outline' size='icon' onClick={(e) => {
              e.preventDefault();
              ref.current?.click();
            }}><Eye className='w-4 h-4' /></Button>
          </a>
        }
        { editable &&
          <Button variant='outline' size='icon' onClick={(e) => {
            e.preventDefault();
            handleDelete();
          }}><Trash2 className='w-4 h-4' /></Button>
        }
      </div>
    </div>
  );
}
