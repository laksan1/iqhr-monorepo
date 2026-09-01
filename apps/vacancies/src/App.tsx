import { Route, Routes } from 'react-router-dom';
import { VacanciesListPage } from './pages/VacanciesListPage';
import { VacancyDetailsPage } from './pages/VacancyDetailsPage';

export default function VacanciesApp() {
  return (
    <Routes>
      <Route index element={<VacanciesListPage />} />
      <Route path=":id" element={<VacancyDetailsPage />} />
    </Routes>
  );
}
