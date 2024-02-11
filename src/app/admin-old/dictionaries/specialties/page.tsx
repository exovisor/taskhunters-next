import {CreateSpecialtyButton} from './create-specialty-button';
import {SpecialtiesTable} from './specialties-table';

export default async function Specialities() {

  return (
    <div>
      <div className="flex justify-between items-center py-10">
        <div className="md:ml-6 lg:ml-10">
          <h1>Список специальностей</h1>
          <p className="text-sm text-muted-foreground">Список образовательных специальностей для интерактивных подсказок.</p>
        </div>
        <CreateSpecialtyButton />
      </div>
      <SpecialtiesTable />
    </div>
  );
}
