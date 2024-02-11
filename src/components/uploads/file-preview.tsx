import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { type File } from '@prisma/client';
import { Eye } from 'lucide-react';

export function FilePreview({ file }: { file: File }) {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant='outline' size='icon'><Eye className='h-4 w-4'/></Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{file.name}</DialogTitle>
        </DialogHeader>
        <div className='grid gap-4 py-4'>
          <img src={`/api/uploads/${file.id}`} alt={file.name} className='w-full h-auto' />
        </div>
      </DialogContent>
    </Dialog>
  );
}


