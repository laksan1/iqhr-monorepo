import { AuthApi, setAuthToken } from 'api-client';
import type { User } from 'api-client/types';
import { createContext, type ReactNode, useMemo, useState } from 'react';
import { STORAGE_KEYS } from '../../constants/storage';

const authApi = new AuthApi();

export type AuthContextValue = {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
  login: (username: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
  hasPrivilege: (privilege: string) => boolean;
};

export const AuthContext = createContext<AuthContextValue | null>(null);

function readUser(): User | null {
  if (typeof localStorage === 'undefined') return null;
  const raw = localStorage.getItem(STORAGE_KEYS.user);
  return raw ? (JSON.parse(raw) as User) : null;
}

function readToken(): string | null {
  if (typeof localStorage === 'undefined') return null;
  return localStorage.getItem(STORAGE_KEYS.token);
}

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(readUser);
  const [token, setToken] = useState<string | null>(readToken);

  const value = useMemo<AuthContextValue>(
    () => ({
      user,
      token,
      isAuthenticated: Boolean(user && token),
      hasPrivilege: (privilege) =>
        Boolean(user?.privileges.includes(privilege) || user?.privileges.includes('*')),
      login: async (username, password) => {
        const { data } = await authApi.login({ username, password });
        setAuthToken(data.token);
        localStorage.setItem(STORAGE_KEYS.user, JSON.stringify(data.user));
        localStorage.setItem(STORAGE_KEYS.token, data.token);
        setToken(data.token);
        setUser(data.user);
      },
      logout: async () => {
        try {
          await authApi.logout();
        } finally {
          setAuthToken(null);
          localStorage.removeItem(STORAGE_KEYS.user);
          localStorage.removeItem(STORAGE_KEYS.token);
          setToken(null);
          setUser(null);
        }
      },
    }),
    [token, user],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
