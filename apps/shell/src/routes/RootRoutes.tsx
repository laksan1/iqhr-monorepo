import { Route, Routes } from 'react-router-dom';
import { ROUTE_PATTERNS } from '../constants/paths';
import AuthRoutes from './AuthRoutes';
import CabinetRoutes from './CabinetRoutes';

export default function RootRoutes() {
  return (
    <Routes>
      <Route path={ROUTE_PATTERNS.auth} element={<AuthRoutes />} />
      <Route path="/*" element={<CabinetRoutes />} />
    </Routes>
  );
}
