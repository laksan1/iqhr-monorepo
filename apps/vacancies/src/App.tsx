import { Route, Routes } from 'react-router-dom';
import { VACANCY_ROUTES } from './constants/routes';
import { VacanciesListPage } from './pages/VacanciesListPage';
import { VacancyDetailsPage } from './pages/VacancyDetailsPage';

export default function VacanciesApp() {
  return (
    <Routes>
      <Route index element={<VacanciesListPage />} />
      <Route path={VACANCY_ROUTES.details} element={<VacancyDetailsPage />} />
    </Routes>
  );
}
