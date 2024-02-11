import {ProfileBadge} from '@/components/shared/profile-badge';
import {EditProfile} from '@/components/student/edit-profile';
import {api} from '@/trpc/server';
import {Separator} from '@/components/ui/separator';
import {ChangeRoleButton} from '@/app/admin-old/users/_components/change-role-button';
import {DeleteUserButton} from '@/app/admin-old/users/_components/delete-user-button';

export default async function UserProfilePage({ params }: { params: { userId: string }}) {
  const user = await api.user.getUserWithProfilesById.query({ id: params.userId });

  return (
    <div className="py-4 mx-auto flex flex-col max-w-screen-lg space-y-4">
      { user ?
        <>
          <ProfileBadge user={user}/>
          {user.role === 'STUDENT' &&
						<section className="p-4 border rounded-lg space-y-6">
						  <div className="space-y-1">
						    <h2>Профиль студента</h2>
						    <p className="text-muted-foreground text-sm">Если студент заполнил профиль, то здесь будут отображены
									его данные.</p>
						  </div>
						  <EditProfile hasProfile={true}
						    initData={{userId: user.id, email: user.email ?? undefined, ...user.studentProfile}}
						  />
						</section>
          }
          <section className="p-4 border border-destructive rounded-lg space-y-6">
            <div className="space-y-1">
              <h2>Управление аккаунтом</h2>
            </div>
            { user.role !== 'SUPERADMIN'
              ?
              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <h3>Изменить роль</h3>
                  <ChangeRoleButton id={user.id} initRole={user.role} />
                </div>
                <Separator />
                <div className="flex justify-between items-center">
                  <h3>Удаление учетной записи</h3>
                  <DeleteUserButton id={user.id} />
                </div>
              </div>
              :
              <span>Нельзя изменить роль руководителя</span>
            }
          </section>
        </>
        :
        <span>Пользователь не найден</span>
      }
    </div>
  );
}
