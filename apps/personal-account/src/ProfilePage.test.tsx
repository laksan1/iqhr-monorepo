import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { act, render, screen, waitFor } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { ThemeProvider } from 'ui-kit';
import { ProfilePage } from './pages/ProfilePage';

describe('ProfilePage', () => {
  it('loads combined profile data', async () => {
    const client = new QueryClient({ defaultOptions: { queries: { retry: false } } });
    render(
      <ThemeProvider>
        <QueryClientProvider client={client}>
          <MemoryRouter>
            <ProfilePage />
          </MemoryRouter>
        </QueryClientProvider>
      </ThemeProvider>,
    );

    await waitFor(() => {
      expect(screen.getByDisplayValue('Анна Соколова')).toBeInTheDocument();
    });

    await act(async () => {
      await new Promise((resolve) => setTimeout(resolve, 80));
    });
  });
});
