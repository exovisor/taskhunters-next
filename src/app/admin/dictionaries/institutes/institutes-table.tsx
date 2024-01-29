'use client'

import {DataTable} from "@/components/table/data-table";
import {getDictionaryColumns} from "@/app/admin/dictionaries/dictionary-columns";
import type {Institute} from "@prisma/client";
import {useEffect, useState} from "react";
import type {z} from "zod";
import type {queryOptionsSchema} from "@/server/schema/query";
import {api} from "@/trpc/react";
import {toast} from "@/components/ui/use-toast";
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogFooter,
	DialogHeader,
	DialogTitle,
} from "@/components/ui/dialog"
import {Button} from "@/components/ui/button";
import {Label} from "@/components/ui/label";
import {Input} from "@/components/ui/input";

export function InstitutesTable() {
	const [dialogOpen, setDialogOpen] = useState(false);
	const [dialogData, setDialogData] = useState<{ id: number | undefined; name: string | undefined}>({
		id: undefined,
		name: undefined
	});
	const [queryOptions, setQueryOptions] = useState<z.infer<typeof queryOptionsSchema>>({
		paginationOptions: {
			pageIndex: 0,
			pageSize: 10
		}
	})
	const { data, refetch } = api.dictionaries.getInstitutes.useQuery(queryOptions);
	const {mutate: deleteFn} = api.dictionaries.deleteInstitute.useMutation({
		onSuccess: async () => {
			toast({
				title: 'Запись удалена',
			})
			await refetch();
		},
		onError: (err) => {
			toast({
				variant: 'destructive',
				title: 'Что-то пошло не так',
				description: JSON.stringify(err)
			})
		}
	});

	function openDialog(id: number, name: string) {
		setDialogData({
			id, name
		})
		setDialogOpen(true);
	}

	function submitChanges() {}

	useEffect(() => {
		if (!dialogOpen) {
			setDialogData({
				id: undefined,
				name: undefined
			});
		}
	}, [dialogOpen])

	const columns = getDictionaryColumns<Institute>(deleteFn, openDialog);
	return (
		<>
			<DataTable columns={columns} payload={data} setQueryOptions={setQueryOptions} />
			<Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
				<DialogContent className="sm:max-w-[425px]">
					<DialogHeader>
						<DialogTitle>Редактирование записи</DialogTitle>
						<DialogDescription>
							Внесите необходимые изменения
						</DialogDescription>
					</DialogHeader>
					<div className="grid gap-4 py-4">
						<div className="grid grid-cols-4 items-center gap-4">
							<Label htmlFor="id" className="text-right">
								Id
							</Label>
							<Input
								id="id"
								className="col-span-3"
								value={dialogData.id}
								disabled
							/>
						</div>
						<div className="grid grid-cols-4 items-center gap-4">
							<Label htmlFor="name" className="text-right">
								Значение
							</Label>
							<Input
								id="name"
								className="col-span-3 overflow-"
								value={dialogData.name}
								autoComplete="new-password"
							/>
						</div>
					</div>
					<DialogFooter>
						<Button type="submit" onClick={submitChanges}>Сохранить изменения</Button>
					</DialogFooter>
				</DialogContent>
			</Dialog>
		</>
	)
}
