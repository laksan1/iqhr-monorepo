import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { ThemeProvider } from 'ui-kit';
import { AuthProvider } from '../services/auth';
import LoginPage from './Login';

describe('LoginPage', () => {
  it('renders login form', () => {
    render(
      <ThemeProvider>
        <AuthProvider>
          <MemoryRouter>
            <LoginPage />
          </MemoryRouter>
        </AuthProvider>
      </ThemeProvider>,
    );

    expect(screen.getByRole('heading', { name: 'Вход в платформу' })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Войти' })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /Демо-вход/ })).toBeInTheDocument();
  });
});
