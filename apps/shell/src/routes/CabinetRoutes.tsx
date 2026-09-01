import { Navigate, Route, Routes } from 'react-router-dom';
import { DEFAULT_CABINET_PATH, ROUTE_PATTERNS } from '../constants/paths';
import { ShellLayout } from '../layouts/ShellLayout';
import { CandidatesApp, PersonalAccountApp, VacanciesApp } from '../navigation/lazyModules';
import { RequireAuth } from '../services/auth';

export default function CabinetRoutes() {
  return (
    <Routes>
      <Route element={<RequireAuth />}>
        <Route element={<ShellLayout />}>
          <Route path={ROUTE_PATTERNS.candidates} element={<CandidatesApp />} />
          <Route path={ROUTE_PATTERNS.vacancies} element={<VacanciesApp />} />
          <Route path={ROUTE_PATTERNS.account} element={<PersonalAccountApp />} />
          <Route path="/" element={<Navigate to={DEFAULT_CABINET_PATH} replace />} />
        </Route>
      </Route>
      <Route path="*" element={<Navigate to={DEFAULT_CABINET_PATH} replace />} />
    </Routes>
  );
}
