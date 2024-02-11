import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Button } from '@/components/ui/button';
import { MessageSquareShare, MoreHorizontal, Trash2, User as UserIcon } from 'lucide-react';
import {
  AlertDialog, AlertDialogAction, AlertDialogCancel,
  AlertDialogContent, AlertDialogDescription, AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog';
import type { User } from '@prisma/client';
import { useToast } from '@/components/ui/use-toast';
import { api } from '@/trpc/react';
import Link from 'next/link';

type Props = {
  user: User
  refetch: () => Promise<unknown>;
};

export function TableActionsDropdown({ user, refetch }: Props) {
  const { toast } = useToast();
  const utils = api.useUtils();
  const { mutate: deleteFn } = api.user.deleteUser.useMutation({
    onSuccess: () => {
      toast({
        title: 'Пользователь удален',
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

  async function deleteUser() {
    deleteFn({ id: user.id });
    await utils.user.invalidate();
    await refetch();
  }

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" className="h-8 w-8 p-0">
            <span className="sr-only">Открыть меню</span>
            <MoreHorizontal className="h-4 w-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <Link href={'/admin-old/users/' + user.id} passHref legacyBehavior>
            <DropdownMenuItem><UserIcon className="mr-2 w-4 h-4"/><span>Открыть профиль</span></DropdownMenuItem>
          </Link>
          <DropdownMenuSeparator />
          <a href={'https://t.me/' + user.username} target="_blank">
            <DropdownMenuItem><MessageSquareShare className="mr-2 w-4 h-4"/><span>Открыть чат Telegram</span></DropdownMenuItem>
          </a>
          { user.role !== 'SUPERADMIN' && (
            <>
              <DropdownMenuSeparator />
              <AlertDialog>
                <AlertDialogTrigger asChild>
                  <DropdownMenuItem onSelect={(e) => e.preventDefault()}><Trash2 className="mr-2 w-4 h-4"/><span>Удалить</span></DropdownMenuItem>
                </AlertDialogTrigger>
                <AlertDialogContent>
                  <AlertDialogHeader>
                    <AlertDialogTitle>Вы уверены?</AlertDialogTitle>
                    <AlertDialogDescription>
                      Данное действие не может быть отменено. Это навсегда удалит пользователя и связанные с ним действия.
                    </AlertDialogDescription>
                  </AlertDialogHeader>
                  <AlertDialogFooter>
                    <AlertDialogCancel>Отмена</AlertDialogCancel>
                    <AlertDialogAction onClick={() => deleteUser()}>Подтвердить</AlertDialogAction>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>
            </>
          )}
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  );
}
