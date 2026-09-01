import { render, screen } from '@testing-library/react';
import { ThemeProvider } from '../../theme/ThemeProvider';
import { Button } from './Button';

describe('Button', () => {
  it('renders children and supports loading', () => {
    render(
      <ThemeProvider>
        <Button loading>Save</Button>
      </ThemeProvider>,
    );

    expect(screen.getByRole('button', { name: /Save/ })).toBeInTheDocument();
  });
});
