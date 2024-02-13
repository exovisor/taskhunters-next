'use client';

import type { Institute } from '@prisma/client';
import type { z } from 'zod';
import type { queryOptionsSchema } from '@/server/schema/query';
import { useState } from 'react';
import { api } from '@/trpc/react';
import { useToast } from '@/components/ui/use-toast';
import { DataTable } from '@/components/table/data-table';
import { DictionaryUpdateFormDialog } from '@/components/dictionaries/dictionary-update-form-dialog';
import { getDictionaryColumns } from '@/components/dictionaries/dictionary-columns';

export function InstituteDataView() {
  const [ dialogOpen, setDialogOpen ] = useState(false);
  const [ dialogData, setDialogData ] = useState<{ id: number | undefined; value: string | undefined }>({
    id: undefined,
    value: undefined,
  });
  const [ queryOptions, setQueryOptions ] = useState<z.infer<typeof queryOptionsSchema>>({
    paginationOptions: {
      pageIndex: 0,
      pageSize: 10,
    },
  });
  const { toast } = useToast();
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

  function openDialog(id: number, value: string) {
    setDialogData({
      id, value,
    });
    setDialogOpen(true);
  }

  function closeDialog() {
    setDialogData({
      id: undefined,
      value: undefined,
    });
    setDialogOpen(false);
  }

  function submitChanges(data: { id?: number | undefined; value: string }) {
    if (!data.id) return;
    updateFn({
      id: data.id,
      value: data.value,
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
