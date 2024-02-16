export const columns: Record<string, string> = {
  id: '№',
  value: 'Значение',
  telegramId: 'Telegram Id',
  username: 'Telegram Имя',
  displayName: 'Отображаемое имя',
  email: 'Почта',
  role: 'Роль',
  createdAt: 'Создано',
  updatedAt: 'Изменено',

  status: 'Статус',
  type: 'Тип практики',
  institute: 'Институт',
  speciality: 'Специальность',
  student: 'ФИО',
};

export function getColumnLabelByName(name: string): string | undefined {
  return columns[name];
}
