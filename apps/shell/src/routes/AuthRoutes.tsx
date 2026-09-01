import { Navigate, Route, Routes } from 'react-router-dom';
import { AUTH_PATH } from '../constants/paths';
import { LoginPage } from '../navigation/lazyModules';

export default function AuthRoutes() {
  return (
    <Routes>
      <Route index element={<LoginPage />} />
      <Route path="*" element={<Navigate to={AUTH_PATH} replace />} />
    </Routes>
  );
}
