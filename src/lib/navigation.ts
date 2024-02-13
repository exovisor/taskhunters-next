export const navigation: Record<string, string> = {
  'practices': 'Практики',
  'create': 'Создать',

  'tasks': 'Задания',

  'help': 'Помощь',

  'edit': 'Редактировать',
};

export function getNavigationItem(key: string): string | undefined {
  return navigation[key];
}
