import type { User } from 'api-client/types';
import type { LayoutUser } from 'ui-kit';

export function mapLayoutUser(user: User | null): LayoutUser | null {
  if (!user) return null;

  return {
    displayName: user.displayName,
    email: user.email,
    avatarUrl: user.avatarUrl,
  };
}
