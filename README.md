# IQHR Monorepo

Модульный монолит для HR-платформы: Turborepo, pnpm workspaces, Vite и React 19. Страницы модулей подгружаются лениво из `shell` (без runtime Module Federation).

## Стек

- React 19, React Router v6, Ant Design, CSS Modules
- `@tanstack/react-query` для API
- Biome (линтер, форматтер, сортировка импортов)
- Vitest + React Testing Library
- Общий UI Kit и Axios-клиент, сгенерированный из OpenAPI

## Установка

Требуется Node.js 22+ и [pnpm](https://pnpm.io/).

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

Демо-вход: кнопка на `/login` подставляет `admin` / `iqhr-demo-local` (мок принимает любой пароль от 4 символов).

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

## CI (GitHub Actions)

Пайплайн `.github/workflows/ci.yml` выполняет шаги по порядку:

1. `pnpm install --frozen-lockfile`
2. `pnpm generate:api:dev` — генерация Swagger → `packages/api-client/src/generated`
3. `pnpm typecheck:affected` — проверка типов
4. `pnpm lint:ci` — Biome без авто-правок
5. `pnpm build:affected` — сборка

Локально то же самое:

```bash
pnpm ci:affected   # только затронутые пакеты
pnpm ci            # полный прогон
```

### Как работает `--affected`

Turborepo сравнивает текущую ветку с базой (в PR — с `main`) и запускает задачи **только в изменённых пакетах и их зависимых**.

| Что изменили | Что пересоберётся |
| --- | --- |
| `apps/vacancies` | `vacancies` (+ `api-client`/`ui-kit` если они в графе зависимостей и тоже затронуты) |
| `packages/ui-kit` | `ui-kit` → затем **все приложения**, которые от него зависят (`shell`, `candidates`, `vacancies`, `personal-account`) |
| `mocks/*.json` | `api-client` (generate) → все потребители `api-client` |
| `packages/configs` | пакеты, которые от него зависят |

Ключ — `dependsOn: ["^build"]` и `dependsOn: ["^typecheck"]` в `turbo.json`: символ `^` означает «сначала собери/проверь зависимости workspace».

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

Генерация кешируется Turborepo (`inputs`: swagger-файлы, `outputs`: `src/generated/**`) и выполняется только при изменении спеков.

**Рабочая ли генерация?** Да. В CI и локально используется Node-генератор (`FORCE_NODE_GENERATOR=1`), который читает `mocks/*.json` и пишет TypeScript Axios-клиент. Если установлена Java, можно использовать `openapi-generator-cli` — при ошибке скрипт автоматически откатывается на Node-генератор.

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

## Алиасы импортов

| Алиас | Назначение |
| --- | --- |
| `ui-kit` | общий UI Kit |
| `api-client` | API-клиент и HTTP-утилиты |
| `api-client/types` | типы и модели из Swagger (`src/generated`) |
| `candidates/*`, `vacancies/*`, `personal-account/*` | исходники модулей для lazy-load |
| `@configs/*` | TypeScript-пути к файлам конфигов |

Пример:

```ts
import { CandidatesApi } from 'api-client';
import type { Candidate, CandidateStatus } from 'api-client/types';
import { Button, PageHeader } from 'ui-kit';
```
