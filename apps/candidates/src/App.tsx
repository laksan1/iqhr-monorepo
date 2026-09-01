import { Route, Routes } from 'react-router-dom';
import { CANDIDATE_ROUTES } from './constants/routes';
import { CandidateDetailsPage } from './pages/CandidateDetailsPage';
import { CandidatesListPage } from './pages/CandidatesListPage';

export default function CandidatesApp() {
  return (
    <Routes>
      <Route index element={<CandidatesListPage />} />
      <Route path={CANDIDATE_ROUTES.details} element={<CandidateDetailsPage />} />
    </Routes>
  );
}
