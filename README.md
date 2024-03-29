# Система учета студентов
Данная система предназначена для ведения учета студентов во время практики. 

Оригинальный проект можно найти по ссылке 
[https://github.com/embersee/scholar](https://github.com/embersee/scholar).

## Стек

Приложение создано с помощью ```create t3-app``` и использует следующие технологии:

* PostgreSQL + Prisma
* Next.js (App router) + TRPC + NextAuth
* Tailwind + Shadcn/ui

# Установка
## Локальное тестирование
Для запуска приложения в локальной среде потребуется PostgreSQL v16+ и Node.js v20+

После клонирования репозитория необходимо создать ```.env``` файл и указать строку подключения к базе данных, 
а также данные Telegram бота. Пример окружения находится в ```.env.example```

Telegram боту в качестве домена необходимо установить ```127.0.0.1```

Для запуска приложения:

```bash
# Установка зависимостей
npm i

# Настройка базы данных
npm run db:push

# Запуск по адресу 127.0.0.1:80
npm run dev
```

**Важное примечание:** Виджет авторизации Telegram в локальной среде работает ТОЛЬКО по адресу 127.0.0.1:80.
Это ограничение самого API Telegram.
