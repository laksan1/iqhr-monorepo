import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { AUTH_PATH } from '../../constants/paths';
import { useAuth } from './useAuth';

export function RequireAuth() {
  const { isAuthenticated } = useAuth();
  const location = useLocation();

  if (!isAuthenticated) {
    return <Navigate to={AUTH_PATH} replace state={{ from: location }} />;
  }

  return <Outlet />;
}
