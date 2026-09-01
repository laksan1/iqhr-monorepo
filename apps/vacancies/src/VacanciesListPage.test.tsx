import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { render, screen, waitFor } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { ThemeProvider } from 'ui-kit';
import { VacanciesListPage } from './pages/VacanciesListPage';

describe('VacanciesListPage', () => {
  it('renders vacancy cards from the API client', async () => {
    const client = new QueryClient({ defaultOptions: { queries: { retry: false } } });
    render(
      <ThemeProvider>
        <QueryClientProvider client={client}>
          <MemoryRouter>
            <VacanciesListPage />
          </MemoryRouter>
        </QueryClientProvider>
      </ThemeProvider>,
    );

    await waitFor(() => {
      expect(screen.getByText('Senior React Engineer')).toBeInTheDocument();
    });
  });
});
