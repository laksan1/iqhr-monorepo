import { render, screen } from '@testing-library/react';
import { PrivilegeGuard } from './PrivilegeGuard';

describe('PrivilegeGuard', () => {
  it('hides content without privilege', () => {
    render(
      <PrivilegeGuard privilege="admin" privileges={['candidates:read']} fallback={<p>denied</p>}>
        <p>secret</p>
      </PrivilegeGuard>,
    );

    expect(screen.getByText('denied')).toBeInTheDocument();
    expect(screen.queryByText('secret')).not.toBeInTheDocument();
  });

  it('shows content when privilege matches', () => {
    render(
      <PrivilegeGuard privilege="candidates:read" privileges={['candidates:read']}>
        <p>secret</p>
      </PrivilegeGuard>,
    );

    expect(screen.getByText('secret')).toBeInTheDocument();
  });
});
