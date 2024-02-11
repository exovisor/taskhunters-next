'use client';

import type { Institute } from '@prisma/client';
import type { z } from 'zod';
import type { queryOptionsSchema } from '@/server/schema/query';
import { useState } from 'react';
import { api } from '@/trpc/react';
import { toast } from '@/components/ui/use-toast';
import { DataTable } from '@/components/table/data-table';
import { DictionaryUpdateFormDialog } from '../_components/dictionary-update-form-dialog';
import { getDictionaryColumns } from '../_components/dictionary-columns';

export function InstitutesTable() {
  const [ dialogOpen, setDialogOpen ] = useState(false);
  const [ dialogData, setDialogData ] = useState<{ id: number | undefined; name: string | undefined }>({
    id: undefined,
    name: undefined,
  });
  const [ queryOptions, setQueryOptions ] = useState<z.infer<typeof queryOptionsSchema>>({
    paginationOptions: {
      pageIndex: 0,
      pageSize: 10,
    },
  });
  const { data, refetch } = api.dictionaries.getInstitutes.useQuery(queryOptions);
  const { mutate: deleteFn } = api.dictionaries.deleteInstitute.useMutation({
    onSuccess: async () => {
      toast({
        title: 'Запись удалена',
      });
      await refetch();
    },
    onError: (err) => {
      toast({
        variant: 'destructive',
        title: 'Что-то пошло не так',
        description: JSON.stringify(err),
      });
    },
  });
  const { mutate: updateFn } = api.dictionaries.updateInstitute.useMutation({
    onSuccess: async () => {
      toast({
        title: 'Запись обновлена',
      });
      await refetch();
    },
    onError: (err) => {
      toast({
        variant: 'destructive',
        title: 'Что-то пошло не так',
        description: JSON.stringify(err),
      });
    },
  });

  function openDialog(id: number, name: string) {
    setDialogData({
      id, name,
    });
    setDialogOpen(true);
  }

  function closeDialog() {
    setDialogData({
      id: undefined,
      name: undefined,
    });
    setDialogOpen(false);
  }

  function submitChanges(data: { id?: number | undefined; name: string }) {
    if (!data.id) return;
    updateFn({
      id: data.id,
      name: data.name,
    });
  }

  const columns = getDictionaryColumns<Institute>(deleteFn, openDialog);
  return (
    <>
      <DataTable columns={columns} payload={data} setQueryOptions={setQueryOptions} />
      <DictionaryUpdateFormDialog
        isOpen={dialogOpen}
        row={dialogData}
        onSave={submitChanges}
        onClose={closeDialog}
      />
    </>
  );
}
