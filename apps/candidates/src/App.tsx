import { Route, Routes } from 'react-router-dom';
import { CandidateDetailsPage } from './pages/CandidateDetailsPage';
import { CandidatesListPage } from './pages/CandidatesListPage';

export default function CandidatesApp() {
  return (
    <Routes>
      <Route index element={<CandidatesListPage />} />
      <Route path=":id" element={<CandidateDetailsPage />} />
    </Routes>
  );
}
