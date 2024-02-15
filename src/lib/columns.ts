export const columns: Record<string, string> = {
  'id': '№',
  'value': 'Значение',
  'username': 'Telegram',
  'displayName': 'Отображаемое имя',
  'email': 'Почта',
  'role': 'Роль',
  'createdAt': 'Создано',
  'updatedAt': 'Изменено',
};

export function getColumnLabelByName(name: string): string | undefined {
  return columns[name];
}
