import { IdcardOutlined, TeamOutlined, UserOutlined } from '@ant-design/icons';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { lazy, Suspense } from 'react';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import {
  ErrorBoundary,
  Layout,
  PrivilegeGuard,
  type SidebarItem,
  Spinner,
  ThemeProvider,
} from 'ui-kit';
import { AuthProvider, RequireAuth, useAuth } from './auth';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 1,
      refetchOnWindowFocus: false,
    },
  },
});

const CandidatesApp = lazy(() => import('candidates/App'));
const VacanciesApp = lazy(() => import('vacancies/App'));
const PersonalAccountApp = lazy(() => import('personal-account/App'));
const LoginPage = lazy(() => import('./pages/Login'));

const menuItems: SidebarItem[] = [
  {
    key: 'candidates',
    label: 'Кандидаты',
    path: '/candidates',
    icon: <TeamOutlined />,
    privilege: 'candidates:read',
  },
  {
    key: 'vacancies',
    label: 'Вакансии',
    path: '/vacancies',
    icon: <IdcardOutlined />,
    privilege: 'vacancies:read',
  },
  {
    key: 'account',
    label: 'Кабинет',
    path: '/account',
    icon: <UserOutlined />,
    privilege: 'account:read',
  },
];

function ShellLayout() {
  const { user, logout, hasPrivilege } = useAuth();
  const items = menuItems.filter((item) => !item.privilege || hasPrivilege(item.privilege));

  return (
    <PrivilegeGuard privileges={user?.privileges}>
      <Layout
        title={import.meta.env.VITE_APP_TITLE ?? 'IQHR'}
        menuItems={items}
        user={
          user
            ? { displayName: user.displayName, email: user.email, avatarUrl: user.avatarUrl }
            : null
        }
        onLogout={() => {
          void logout();
        }}
      />
    </PrivilegeGuard>
  );
}

export function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider>
        <AuthProvider>
          <BrowserRouter
            future={{
              v7_startTransition: true,
              v7_relativeSplatPath: true,
            }}
          >
            <ErrorBoundary>
              <Suspense fallback={<Spinner />}>
                <Routes>
                  <Route path="/login" element={<LoginPage />} />
                  <Route element={<RequireAuth />}>
                    <Route element={<ShellLayout />}>
                      <Route path="/candidates/*" element={<CandidatesApp />} />
                      <Route path="/vacancies/*" element={<VacanciesApp />} />
                      <Route path="/account/*" element={<PersonalAccountApp />} />
                      <Route path="/" element={<Navigate to="/candidates" replace />} />
                    </Route>
                  </Route>
                </Routes>
              </Suspense>
            </ErrorBoundary>
          </BrowserRouter>
        </AuthProvider>
      </ThemeProvider>
    </QueryClientProvider>
  );
}
