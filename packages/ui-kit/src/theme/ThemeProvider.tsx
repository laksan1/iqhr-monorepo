import { theme as antdTheme, ConfigProvider } from 'antd';
import { type ReactNode, useCallback, useEffect, useMemo, useState } from 'react';
import { darkAntdTheme, lightAntdTheme } from './antdTheme';
import { ThemeContext, type ThemeMode } from './ThemeContext';
import '../styles/tokens.css';

const STORAGE_KEY = 'iqhr-theme';

function readInitialMode(): ThemeMode {
  if (typeof window === 'undefined') return 'light';
  const stored = window.localStorage.getItem(STORAGE_KEY);
  if (stored === 'dark' || stored === 'light') return stored;
  return window.matchMedia?.('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
}

type ThemeProviderProps = {
  children: ReactNode;
};

export function ThemeProvider({ children }: ThemeProviderProps) {
  const [mode, setModeState] = useState<ThemeMode>(readInitialMode);

  useEffect(() => {
    document.documentElement.dataset.theme = mode;
    window.localStorage.setItem(STORAGE_KEY, mode);
  }, [mode]);

  const setMode = useCallback((next: ThemeMode) => {
    setModeState(next);
  }, []);

  const toggleTheme = useCallback(() => {
    setModeState((current) => (current === 'light' ? 'dark' : 'light'));
  }, []);

  const value = useMemo(() => ({ mode, toggleTheme, setMode }), [mode, toggleTheme, setMode]);

  return (
    <ThemeContext.Provider value={value}>
      <ConfigProvider
        theme={{
          ...(mode === 'dark' ? darkAntdTheme : lightAntdTheme),
          algorithm: mode === 'dark' ? antdTheme.darkAlgorithm : antdTheme.defaultAlgorithm,
        }}
      >
        {children}
      </ConfigProvider>
    </ThemeContext.Provider>
  );
}
