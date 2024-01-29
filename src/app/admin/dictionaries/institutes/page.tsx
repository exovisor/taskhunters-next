import {InstitutesTable} from "@/app/admin/dictionaries/institutes/institutes-table";

export default async function Institutes() {
	return (
		<div>
			<div className="p-10">
				<h1>Список образовательных учреждений</h1>
				<p className="text-sm text-muted-foreground">Список образовательных учреждений для интерактивных подсказок.</p>
			</div>
			<InstitutesTable/>
		</div>
	)
}
