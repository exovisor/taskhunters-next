'use client';

import {
  AlertDialog, AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription, AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog';

export default function FillProfileAlert({ defaultOpen }: { defaultOpen: boolean | undefined }) {
  return (
    <AlertDialog defaultOpen={defaultOpen}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Необходимо заполнить профиль</AlertDialogTitle>
          <AlertDialogDescription>
						Чтобы пользоваться всеми возможностями вам необходимо заполнить информацию о себе на странице профиля.<br/>
						Вы будете автоматически перенаправлены на нужную страницу.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Ок</AlertDialogCancel>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
