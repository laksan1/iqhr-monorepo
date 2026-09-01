import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import type { ComponentType, ReactNode } from 'react';
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { ThemeProvider } from '../theme/ThemeProvider';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 1,
      refetchOnWindowFocus: false,
    },
  },
});

type DevProvidersProps = {
  children: ReactNode;
};

function DevProviders({ children }: DevProvidersProps) {
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider>
        <BrowserRouter>{children}</BrowserRouter>
      </ThemeProvider>
    </QueryClientProvider>
  );
}

export function mountModuleApp(App: ComponentType, rootId = 'root') {
  const root = document.getElementById(rootId);
  if (!root) {
    throw new Error(`Root element #${rootId} not found`);
  }

  createRoot(root).render(
    <StrictMode>
      <DevProviders>
        <App />
      </DevProviders>
    </StrictMode>,
  );
}
