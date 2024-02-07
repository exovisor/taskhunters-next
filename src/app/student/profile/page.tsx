import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {NotImplementedAlert} from '@/components/internal/not-implemented-alert';
import StudentProfileTab from '@/app/student/profile/_components/student-profile-tab';

export default async function StudentProfile() {
  return (
    <Tabs defaultValue='studentProfile'>
      <TabsList className='mt-4 md-2'>
        <TabsTrigger value='studentProfile'>
					Профиль
        </TabsTrigger>
        <TabsTrigger value='studentFiles'>
					Файлы
        </TabsTrigger>
        <TabsTrigger value='settings'>
          Настройки
        </TabsTrigger>
      </TabsList>
      <TabsContent value='studentProfile'>
        <StudentProfileTab />
      </TabsContent>
      <TabsContent value='studentFiles'>
        <NotImplementedAlert />
      </TabsContent>
      <TabsContent value='settings'>
        <NotImplementedAlert />
      </TabsContent>
    </Tabs>
  );
}
