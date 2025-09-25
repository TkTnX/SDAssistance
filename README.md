SDAssistance — аукцион авто-лотов (Next.js 15, Prisma, NextAuth)

### Описание
Веб‑приложение для размещения и участия в торгах по автомобильным лотам. Продавцы создают лоты с подробной информацией и фотографиями, участники делают ставки, а продавец завершает торги и получает средства на баланс.

### Технологии
- **Next.js 15 (App Router)**: серверные и клиентские компоненты, маршрутизация, `route handlers` в `src/app/api/*`
- **React 19**: UI‑слой и компоненты
- **TypeScript**: статическая типизация
- **NextAuth (Credentials)**: аутентификация по email/телефону + пароль, JWT‑сессии
- **Prisma** (PostgreSQL): ORM, миграции и схема в `prisma/schema.prisma`
- **Zod + react-hook-form**: схемы валидации и формы
- **Axios**: HTTP‑клиент, экземпляр в `src/shared/lib/axiosInstance.ts`
- **Zustand**: управление локальным состоянием
- **Radix UI + shadcn‑подобные компоненты**: модальные окна, селекты, диалоги
- **Tailwind CSS v4**: стилизация, конфиг `postcss.config.mjs`
- **Supabase Storage**: хранение загруженных изображений лотов

### Данные и доменная модель (Prisma)
- `User`: id, name, email, phone, password (bcrypt), role (`seller` | `auctioneer`), avatar?, birthday?, balance
- `Lot`: техническая и описательная информация об авто, `photos[]`, `status` (`available` | `finished`), `currentPrice?`, `endsAt`, связь с `seller`
- `Bet`: ставка (`bet`), связь с пользователем и лотом, `createdAt`

### Доступ и ограничения (middleware)
Маршруты требуют авторизации или роли продавца:
- Только без авторизации: `/auth/register`, `/auth/login`
- С авторизацией: `/profile`, `/lots/create`
- Только для продавца: `/profile/lots`, `/lots/create`, `/profile/balance`

### Маршруты и страницы
- `/` — главная: хиро‑блок, CTA регистрации, список активных лотов, блок «Как это работает».
- `/lots` — список активных лотов с сортировкой/поиском и пагинацией.
- `/lots/[id]` — страница конкретного лота: фото‑галерея, характеристики, ставки, кнопки действий для продавца.
- `/lots/create` — создание лота (только авторизованный продавец): многошаговая форма, загрузка фото на Supabase.
- `/auth/login` — авторизация (email/телефон + пароль).
- `/auth/register` — регистрация (роль, контактные данные, пароль).
- `/profile` — профиль пользователя: редактирование данных.
- `/profile/lots` — лоты продавца (только роль `seller`).
- `/profile/bets` — мои ставки (история и текущие участия).
- `/profile/balance` — финансы продавца (только роль `seller`).
- `/docs` — служебная страница документации (контент проекта).
- `404` — `src/app/not-found.tsx`.

### API (route handlers)
- `GET /api/lots` — список лотов с фильтрами: `page`, `limit`, `sortBy` (`createdAt|price|mileage` + `-asc|desc`), `search`, и доп. параметры по полям модели. Возвращает `{ data, page, totalPages }`.
- `POST /api/lots/create` — создание лота (FormData, авторизация обязательна). Поля соответствуют `prisma/schema.prisma`. Изображения загружаются через `uploadFile` (Supabase) и сохраняются как массив URL.
- `GET /api/lots/[id]` — данные лота, включает продавца (без пароля), доступен только для активных лотов.
- `PATCH /api/lots/[id]/finish` — завершение лота (только продавец): помечает `finished`, устанавливает `winnerId`, увеличивает баланс продавца на `currentPrice`.
- `DELETE /api/lots/[id]/finish` — удаление лота (только продавец).
- `GET /api/bets/[lotId]` — список ставок по лоту, в порядке убывания `bet`.
- `POST /api/bets/[lotId]` — сделать ставку (авторизация обязательна): обновляет `lot.currentPrice` и создает запись в `Bet`.
- `POST /api/auth/register` — регистрация (bcrypt), проверка уникальности email/телефона.
- `GET|POST /api/auth/[...nextauth]` — NextAuth (Credentials), JWT‑колбеки добавляют `userId`, `role` в токен/сессию.
- `GET /api/users` — служебный маршрут (если используется в проекте; см. `src/app/api/users/route.ts`).

### Функционал
- Регистрация и вход по email/телефону и паролю; сессии на JWT.
- Роли пользователей: `seller` (продавец) и `auctioneer` (участник торгов). Доступы ограничены `middleware`.
- Создание лота продавцом: подробная карточка, загрузка нескольких изображений, автоматический срок окончания (по умолчанию +7 дней).
- Просмотр всех активных лотов, сортировка, поиск, пагинация.
- Страница лота: просмотр характеристик, истории ставок, ставка пользователя, инструменты продавца (остановить/удалить).
- Завершение торгов: установка победителя и зачисление средств на баланс продавца.
- Профиль: редактирование данных, список собственных лотов, мои ставки, финансы.

### Переменные окружения (.env)
Обязательно создайте `.env` в корне проекта со значениями:
```env
DATABASE_URL=postgresql://USER:PASSWORD@HOST:PORT/DB
DIRECT_URL=postgresql://USER:PASSWORD@HOST:PORT/DB
NEXTAUTH_SECRET=your_strong_secret
NEXT_PUBLIC_API_URL=http://localhost:3000/api
SUPABASE_URL=https://your-project.supabase.co
SUPABASE_ANON_KEY=your_anon_key
SUPABASE_BUCKET=your_bucket_name
```

### Установка и запуск
1) Установите зависимости:
```bash
npm install
```
2) Сгенерируйте Prisma клиент и примените миграции:
```bash
npx prisma generate
npx prisma migrate deploy
```
3) Запустите dev‑сервер:
```bash
npm run dev
```
Приложение поднимется на `http://localhost:3000`.

### Сборка и продакшен
```bash
npm run build
npm start
```

### Загрузка изображений
Происходит в `POST /api/lots/create` через `uploadFile` (Supabase). Для работы укажите `SUPABASE_URL`, `SUPABASE_ANON_KEY`, `SUPABASE_BUCKET`. Домен для изображений разрешён в `next.config.ts` (`images.remotePatterns`).

### Полезные скрипты
- `npm run dev` — запуск в режиме разработки (Turbopack)
- `npm run build` — сборка (Turbopack)
- `npm start` — запуск собранного приложения
- `npm run lint` — линтинг

### Структура проекта (основное)
- `src/app/*` — страницы и API‑маршруты
- `src/shared/*` — общие компоненты, UI, либы, типы, сторы
- `src/features/*` — функциональные блоки (формы, сортировки и т.п.)
- `src/widgets/*` — составные UI‑виджеты (списки, карточки, хедер, футер)
- `prisma/schema.prisma` — схема БД
- `src/generated/prisma/*` — сгенерированный Prisma клиент

### Примечания
- Для работы авторизации задайте `NEXTAUTH_SECRET` и проверьте `pages` в `authOptions` (роуты `/auth/login`, `/auth/register`).
- Экземпляр Axios использует `NEXT_PUBLIC_API_URL` и `withCredentials: true`.
- Некоторые возможности (например, доп. фильтры в `GET /api/lots`) зависят от полей схемы и наличия данных.

