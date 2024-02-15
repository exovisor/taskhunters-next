import { type Metadata } from 'next';
import { ProfilePageHeading } from '@/components/profile/profile-page-heading';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import StudentProfileTab from '@/components/student/student-profile-tab';
import { NotImplementedAlert } from '@/components/placeholders/not-implemented-alert';
import { getServerAuthSession } from '@/server/auth';
import dynamic from 'next/dynamic';

const FillProfileAlert = dynamic(()=>import('@/components/student/fill-profile-alert'), { ssr: false });

export const metadata: Metadata = {
  title: 'Профиль',
  description: 'Профиль пользователя',
};

export default async function StudentProfilePage() {
  const session = await getServerAuthSession();
  const profileFilled = session?.user && session.user.role === 'STUDENT' && session.user.studentProfileId;
  return (
    <>
      <FillProfileAlert defaultOpen={!profileFilled} />
      <ProfilePageHeading user={session!.user} />
      <Tabs defaultValue='studentProfile' className='px-4'>
        <TabsList className='mt-4 md-2'>
          <TabsTrigger value='studentProfile'>
            Профиль
          </TabsTrigger>
          <TabsTrigger value='studentFiles'>
            Файлы
          </TabsTrigger>
          <TabsTrigger value='notifications'>
            Уведомления
          </TabsTrigger>
        </TabsList>
        <TabsContent value='studentProfile'>
          <StudentProfileTab />
        </TabsContent>
        <TabsContent value='studentFiles'>
          <NotImplementedAlert />
        </TabsContent>
        <TabsContent value='notifications'>
          <NotImplementedAlert />
        </TabsContent>
      </Tabs>
    </>
  );
}
