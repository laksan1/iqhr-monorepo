# IQHR Monorepo

Модульный монолит для HR-платформы: Turborepo, pnpm workspaces, Vite и React 19. Страницы модулей подгружаются лениво из `shell` (без runtime Module Federation).

## Стек

- React 19, React Router v6, Ant Design, CSS Modules
- `@tanstack/react-query` для API
- Biome (линтер, форматтер, сортировка импортов)
- Vitest + React Testing Library
- Общий UI Kit и Axios-клиент, сгенерированный из OpenAPI

## Установка

Требуется Node.js 20+ и [pnpm](https://pnpm.io/).

```bash
pnpm install
```

pnpm 10 по умолчанию не запускает postinstall сторонних пакетов. Если Vite ругается на `esbuild`, один раз выполните:

```bash
node node_modules/esbuild/install.js
```

При первом запуске клиент API уже можно сгенерировать из моков в `mocks/`:

```bash
pnpm generate:api:dev
```

## Разработка

Достаточно запустить хост. Код `candidates`, `vacancies`, `personal-account`, `ui-kit` и `api-client` подключается через Vite-алиасы — HMR работает по всему монолиту.

```bash
pnpm dev
```

Приложение: [http://localhost:5173](http://localhost:5173)

Демо-логин: любой логин и пароль от 4 символов, например `admin` / `admin`.

Запуск всех пакетов параллельно:

```bash
pnpm dev:all
```

## Обновление UI Kit

Одна команда поднимает версию, собирает `ui-kit` и пересобирает все зависящие приложения:

```bash
pnpm update-ui-kit --version=1.0.1
```

Turborepo по `dependsOn: ["^build"]` пересобирает потребителей при изменении `ui-kit`.

## Генерация API-клиента

Спецификации лежат в `mocks/`. Конфиг генераторов — `packages/configs/openapitools-axios.json`.

```bash
pnpm generate:api:dev
```

Только сервисы нужного приложения:

```bash
pnpm generate:api:dev --app=candidates
```

Допустимые значения `--app`: `candidates`, `vacancies`, `shell`, `personal-account`.

Генерация кешируется Turborepo (`inputs`: swagger-файлы, `outputs`: `src/generated/**`) и выполняется только при изменении спеков. Если в окружении нет Java, используется встроенный Node-генератор с тем же конфигом.

## Тесты

```bash
pnpm test
pnpm test:affected
```

`test:affected` запускает Vitest только в пакетах, затронутых текущими изменениями.

## Сборка

```bash
pnpm build
pnpm build:affected
```

Прод-сборка хоста: `apps/shell/dist`.

## Линт и формат

```bash
pnpm lint
pnpm format
```

Husky + lint-staged прогоняют Biome на staged-файлах перед коммитом.

## Структура

```
apps/shell              # хост: роутинг, авторизация, Layout
apps/candidates         # модуль «Кандидаты»
apps/vacancies          # модуль «Вакансии»
apps/personal-account   # личный кабинет
packages/ui-kit         # Ant Design + кастомные компоненты
packages/api-client     # Axios-клиент и мок-адаптер
packages/configs        # biome, tsconfig, vite, openapi
mocks/                  # фиктивные OpenAPI-спеки
```

## Окружения

Переменные Vite живут в `apps/shell/.env.development`, `.env.staging` и `.env.production`.

| Переменная | Назначение |
| --- | --- |
| `VITE_APP_TITLE` | Название в шапке |
| `VITE_API_BASE_URL` | Базовый URL бэкенда |
| `VITE_USE_MOCKS` | `true` — ответы из in-memory моков |
