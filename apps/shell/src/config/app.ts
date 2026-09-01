import type { FutureConfig } from 'react-router-dom';

export const APP_TITLE = import.meta.env.VITE_APP_TITLE ?? 'IQHR';

export const ROUTER_FUTURE: FutureConfig = {
  v7_startTransition: true,
  v7_relativeSplatPath: true,
};
