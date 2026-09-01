import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { render, screen, waitFor } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { ThemeProvider } from 'ui-kit';
import { CandidatesListPage } from './pages/CandidatesListPage';

describe('CandidatesListPage', () => {
  it('renders candidate cards from the API client', async () => {
    const client = new QueryClient({ defaultOptions: { queries: { retry: false } } });
    render(
      <ThemeProvider>
        <QueryClientProvider client={client}>
          <MemoryRouter>
            <CandidatesListPage />
          </MemoryRouter>
        </QueryClientProvider>
      </ThemeProvider>,
    );

    await waitFor(() => {
      expect(screen.getByText('Мария Лебедева')).toBeInTheDocument();
    });
  });
});
