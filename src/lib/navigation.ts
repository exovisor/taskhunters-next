export const navigation: Record<string, string> = {
  'practices': 'Практики',
  'create': 'Создать',

  'tasks': 'Задания',

  'help': 'Помощь'
};

export function getNavigationItem(key: string): string | undefined {
  return navigation[key];
}
