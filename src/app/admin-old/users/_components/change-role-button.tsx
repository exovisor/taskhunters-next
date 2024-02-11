'use client';

import {Select, SelectContent, SelectItem, SelectTrigger, SelectValue} from '@/components/ui/select';
import type {Role} from '@prisma/client';
import {roles} from '@/lib/enums-data';
import {useState} from 'react';
import {api} from '@/trpc/react';
import {toast} from '@/components/ui/use-toast';
import {useRouter} from 'next/navigation';

export function ChangeRoleButton({ id, initRole }: { id: string, initRole: Role }) {
  const router = useRouter();
  const roleItems = roles.filter((r) => r.value !== 'SUPERADMIN');
  const [role, setRole] = useState<Role>(initRole);
  const { mutate } = api.user.changeUserRole.useMutation({
    onSuccess: () => {
      toast({
        title: 'Изменения сохранены',
      });
      router.refresh();
    },
    onError: (err) => {
      toast({
        variant: 'destructive',
        title: 'Что-то пошло не так',
        description: JSON.stringify(err),
      });
    },
  });

  function changeRole(val: string) {
    mutate({
      id: id,
      role: val as Role,
    });
    setRole(val as Role);
  }

  if (initRole === 'SUPERADMIN') {
    return <span>Роль руководителя не может быть изменена</span>;
  }

  return (
    <>
      <Select value={role} onValueChange={changeRole}>
        <SelectTrigger className="w-[180px]">
          <SelectValue placeholder="Выберите роль" />
        </SelectTrigger>
        <SelectContent>
          {
            roleItems.map((r) => (
              <SelectItem key={r.value} value={r.value} className="">{r.label}</SelectItem>
            ))
          }
        </SelectContent>
      </Select>
    </>
  );
}
