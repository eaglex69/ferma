# Тихая долина — Next.js / PostgreSQL

Полный исходник основной версии игры: App Router, React, PostgreSQL через Drizzle ORM, мобильная ферма, социальные функции, кооперативы, работники, сезонный пропуск, рейтинги и расширенная админка.

## Запуск
```bash
npm install
cp .env.example .env
# Укажите DATABASE_URL в .env
npx drizzle-kit push
npm run build
npm run start
```

Для создания администратора:
```bash
node scripts/create-admin.mjs admin 'смените-этот-пароль'
```

Админка: `/admin`. Вход в игру и админку общий, через httpOnly-сессию.

## Проверка
```bash
npx next typegen
npm exec tsc -- --noEmit --pretty false
npm run build
```

## Графика и контент
Разделы админки «Дизайн», «Контент игры», «Баланс» и «Бонусы» работают с PostgreSQL. Все SVG-иконки имеют ключи `svg:<имя>` и могут быть заменены своей картинкой. Пользовательские изображения хранятся в таблице `assets` и отдаются через `/api/asset/<ключ>`.

## PHP-версия
Отдельный PHP/MySQL/AJAX/Canvas-пакет находится в архиве `valley-php.zip` в разделе «Экспорт» админки. Он использует общий клиентский интерфейс и отдельный PHP API.
