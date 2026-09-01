import { AuthApi, setAuthToken, type User } from 'api-client';
import { createContext, type ReactNode, useContext, useMemo, useState } from 'react';
import { Navigate, Outlet, useLocation } from 'react-router-dom';

const USER_KEY = 'iqhr-user';
const authApi = new AuthApi();

type AuthContextValue = {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
  login: (username: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
  hasPrivilege: (privilege: string) => boolean;
};

const AuthContext = createContext<AuthContextValue | null>(null);

function readUser(): User | null {
  if (typeof localStorage === 'undefined') return null;
  const raw = localStorage.getItem(USER_KEY);
  return raw ? (JSON.parse(raw) as User) : null;
}

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(readUser);
  const [token, setToken] = useState<string | null>(
    typeof localStorage === 'undefined' ? null : localStorage.getItem('iqhr-token'),
  );

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
        localStorage.setItem(USER_KEY, JSON.stringify(data.user));
        setToken(data.token);
        setUser(data.user);
      },
      logout: async () => {
        try {
          await authApi.logout();
        } finally {
          setAuthToken(null);
          localStorage.removeItem(USER_KEY);
          setToken(null);
          setUser(null);
        }
      },
    }),
    [token, user],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider');
  }
  return context;
}

export function RequireAuth() {
  const { isAuthenticated } = useAuth();
  const location = useLocation();

  if (!isAuthenticated) {
    return <Navigate to="/login" replace state={{ from: location }} />;
  }

  return <Outlet />;
}
