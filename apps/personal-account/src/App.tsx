import { Route, Routes } from 'react-router-dom';
import { ACCOUNT_ROUTES } from './constants/routes';
import { ProfilePage } from './pages/ProfilePage';
import { SettingsPage } from './pages/SettingsPage';

export default function PersonalAccountApp() {
  return (
    <Routes>
      <Route index element={<ProfilePage />} />
      <Route path={ACCOUNT_ROUTES.settings} element={<SettingsPage />} />
    </Routes>
  );
}
