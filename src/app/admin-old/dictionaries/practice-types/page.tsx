import { CreatePracticeTypeButton } from './create-practice-type-button';
import { PracticeTypesTable } from './practice-types-table';

export default async function PracticeTypes() {

  return (
    <div>
      <div className="flex justify-between items-center py-10">
        <div className="md:ml-6 lg:ml-10">
          <h1>Список типов практик</h1>
          <p className="text-sm text-muted-foreground">Список типов практик для интерактивных подсказок.</p>
        </div>
        <CreatePracticeTypeButton />
      </div>
      <PracticeTypesTable />
    </div>
  );
}
