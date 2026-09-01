import { Layout, PrivilegeGuard } from 'ui-kit';
import { APP_TITLE } from '../config/app';
import { MENU_ITEMS } from '../navigation/menuItems';
import { useAuth } from '../services/auth';
import { mapLayoutUser } from './mapLayoutUser';

export function ShellLayout() {
  const { user, logout, hasPrivilege } = useAuth();
  const menuItems = MENU_ITEMS.filter((item) => !item.privilege || hasPrivilege(item.privilege));

  return (
    <PrivilegeGuard privileges={user?.privileges}>
      <Layout
        title={APP_TITLE}
        menuItems={menuItems}
        user={mapLayoutUser(user)}
        onLogout={() => {
          void logout();
        }}
      />
    </PrivilegeGuard>
  );
}
