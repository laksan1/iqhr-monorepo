import { useEffect } from 'react';
import { APP_TITLE } from '../config/app';

export function ReactEffects() {
  useEffect(() => {
    document.title = APP_TITLE;
  }, []);

  return null;
}
