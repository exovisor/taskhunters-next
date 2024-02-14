export const columns: Record<string, string> = {
  'id': '№',
  'value': 'значение',
  'username': 'Telegram',
  'displayName': 'отображаемое имя',
  'email': 'Почта',
  'role': 'роль',
  'createdAt': 'создано',
  'updatedAt': 'изменено',
};

export function getColumnLabelByName(name: string): string | undefined {
  return columns[name];
}
