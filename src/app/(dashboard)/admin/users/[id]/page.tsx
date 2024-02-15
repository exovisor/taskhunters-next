import { ProfilePageHeading } from '@/components/profile/profile-page-heading';
import { EditProfile } from '@/components/student/edit-profile';
import { Separator } from '@/components/ui/separator';
import { ChangeRoleButton } from '@/components/user/change-role-button';
import { DeleteUserButton } from '@/components/user/delete-user-button';
import { api } from '@/trpc/server';
import { type Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Профиль пользователя'
};

type UserPageProps = {
  params: {
    id: string;
  };
};

export default async function UserPage({ params }: UserPageProps) {
  const user = await api.user.getUserWithProfileById.query({
    id: params.id
  });

  if (!user) {
    return {
      notFound: true
    };
  }

  return (
    <>
      <ProfilePageHeading user={user} />
      <div className='px-2 py-4 space-y-4'>
        {user.role === 'STUDENT' &&
						<section className='p-4 border rounded-lg space-y-6'>
						  <div className='space-y-1'>
						    <h2>Профиль студента</h2>
						    <p className='text-muted-foreground text-sm'>Если студент заполнил профиль, то здесь будут отображены
									его данные.</p>
						  </div>
						  <EditProfile hasProfile={true}
						    initData={{ userId: user.id, email: user.email ?? undefined, ...user.studentProfile }}
						  />
						</section>
        }
        <section className='p-4 border border-destructive rounded-lg space-y-6'>
          <div className='space-y-1'>
            <h2>Управление аккаунтом</h2>
          </div>
          { user.role !== 'SUPERADMIN'
            ?
            <div className='space-y-2'>
              <div className='flex justify-between items-center'>
                <h3>Изменить роль</h3>
                <ChangeRoleButton id={user.id} initRole={user.role} />
              </div>
              <Separator />
              <div className='flex justify-between items-center'>
                <h3>Удаление учетной записи</h3>
                <DeleteUserButton id={user.id} />
              </div>
            </div>
            :
            <span>Нельзя изменить роль руководителя</span>
          }
        </section>
      </div>
    </>
  );
}
