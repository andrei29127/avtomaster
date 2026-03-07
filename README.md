# АвтоМастер

Сайт техцентра и подбора запчастей на Next.js.

## Что исправлено

- убран запуск через `bun`, чтобы сборка и запуск были одинаковыми локально и на Vercel;
- удалено `typescript.ignoreBuildErrors`, чтобы ошибки типов не прятались во время сборки;
- добавлен скрипт `typecheck`;
- README приведён в понятный вид под проект.

## Установка

```bash
npm install
```

## Локальный запуск

```bash
npm run dev
```

## Проверка типов

```bash
npm run typecheck
```

## Продакшн-сборка

```bash
npm run build
npm run start
```

## Переменные окружения

Создай файл `.env.local` для локальной разработки и добавь такие переменные:

```env
TG_TOKEN=
TG_CHAT_ID=
TG_FEEDBACK_TOKEN=
TG_FEEDBACK_CHAT_ID=
EMAIL_FROM=
EMAIL_PASSWORD=
```

## Что ещё важно сделать в репозитории

1. Удалить `bun.lock`, если проект больше не будет использовать Bun.
2. Оставить один lock-файл — `package-lock.json`.
3. После этого выполнить:
   ```bash
   rm -rf node_modules package-lock.json
   npm install
   npm run typecheck
   npm run build
   ```

## Возможная следующая правка

Главная страница `src/app/page.tsx` слишком большая. Её лучше разнести на компоненты:

- `src/components/home/hero.tsx`
- `src/components/home/services.tsx`
- `src/components/home/faq.tsx`
- `src/components/home/contact-form.tsx`
- `src/components/home/feedback-form.tsx`
