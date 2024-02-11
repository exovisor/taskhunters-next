import { CreatePracticeForm } from '@/components/student/create-practice-form';

export default function NewPractice() {
  return (
    <div className="py-4 mx-auto flex flex-col max-w-screen-lg">
      <div className="py-6">
        <h1>Регистрация на практику</h1>
        <p className="text-sm text-muted-foreground">Зарегистрируйтесь на практику для учета и отслеживания статуса документов</p>
      </div>
      <div className='p-4 border rounded-lg'>
        <CreatePracticeForm/>
      </div>
    </div>
  );
}
