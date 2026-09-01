import { Route, Routes } from 'react-router-dom';
import { ProfilePage } from './pages/ProfilePage';
import { SettingsPage } from './pages/SettingsPage';

export default function PersonalAccountApp() {
  return (
    <Routes>
      <Route index element={<ProfilePage />} />
      <Route path="settings" element={<SettingsPage />} />
    </Routes>
  );
}
