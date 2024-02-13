export const navigation: Record<string, string> = {
  'practices': 'Практики',
  'create': 'Создать',

  'tasks': 'Задания',

  'help': 'Помощь',

  'edit': 'Редактировать',

  'admin': 'Администрирование',
  'dictionaries': 'Словари',
  'users': 'Пользователи',

  'practice-types': 'Типы практик',
  'institutes': 'Учебные заведения',
  'specialities': 'Специальности',
};

export function getNavigationItem(key: string): string | undefined {
  return navigation[key];
}
