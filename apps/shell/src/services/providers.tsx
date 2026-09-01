import { QueryClientProvider } from '@tanstack/react-query';
import type { ReactNode } from 'react';
import { Suspense } from 'react';
import { BrowserRouter } from 'react-router-dom';
import { ErrorBoundary, Spinner, ThemeProvider } from 'ui-kit';
import { ROUTER_FUTURE } from '../config/app';
import { AuthProvider } from './auth';
import { queryClient } from './queryClient';

type ProvidersProps = {
  children: ReactNode;
};

export function Providers({ children }: ProvidersProps) {
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider>
        <AuthProvider>
          <BrowserRouter future={ROUTER_FUTURE}>
            <ErrorBoundary>
              <Suspense fallback={<Spinner />}>{children}</Suspense>
            </ErrorBoundary>
          </BrowserRouter>
        </AuthProvider>
      </ThemeProvider>
    </QueryClientProvider>
  );
}
