import type { FutureConfig } from 'react-router-dom';

export const APP_TITLE = import.meta.env.VITE_APP_TITLE ?? 'IQHR';

/** Пустая строка для локального `/`, иначе `/iqhr-monorepo` на GitHub Pages. */
export const ROUTER_BASENAME = import.meta.env.BASE_URL.replace(/\/$/, '');

export const ROUTER_FUTURE: FutureConfig = {
  v7_startTransition: true,
  v7_relativeSplatPath: true,
};
