import { InstitutesTable } from '@/app/admin-old/dictionaries/institutes/institutes-table';
import { CreateInstituteButton } from '@/app/admin-old/dictionaries/institutes/create-institute-button';

export default async function Institutes() {

  return (
    <div>
      <div className='flex justify-between items-center py-10'>
        <div className='md:ml-6 lg:ml-10'>
          <h1>Список образовательных учреждений</h1>
          <p className='text-sm text-muted-foreground'>Список образовательных учреждений для интерактивных подсказок.</p>
        </div>
        <CreateInstituteButton />
      </div>
      <InstitutesTable/>
    </div>
  );
}
