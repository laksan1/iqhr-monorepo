import { Avatar, Dropdown } from 'antd';
import type { ReactNode } from 'react';
import { useEffect, useMemo, useState } from 'react';
import { Outlet } from 'react-router-dom';
import { useTheme } from '../../theme/ThemeContext';
import { Button } from '../Button/Button';
import { Sidebar, type SidebarItem } from '../Sidebar/Sidebar';
import styles from './Layout.module.css';

export type LayoutUser = {
  displayName: string;
  email?: string;
  avatarUrl?: string;
};

export type AppLayoutProps = {
  title?: string;
  menuItems: SidebarItem[];
  user?: LayoutUser | null;
  onLogout?: () => void;
  extraHeader?: ReactNode;
};

export function Layout({ title = 'IQHR', menuItems, user, onLogout, extraHeader }: AppLayoutProps) {
  const { mode, toggleTheme } = useTheme();
  const [collapsed, setCollapsed] = useState(false);

  useEffect(() => {
    const media = window.matchMedia('(max-width: 768px)');
    const sync = () => setCollapsed(media.matches);
    sync();
    media.addEventListener('change', sync);
    return () => media.removeEventListener('change', sync);
  }, []);

  const menu = useMemo(
    () => [
      {
        key: 'theme',
        label: mode === 'dark' ? 'Светлая тема' : 'Тёмная тема',
        onClick: toggleTheme,
      },
      { key: 'logout', label: 'Выйти', onClick: onLogout },
    ],
    [mode, onLogout, toggleTheme],
  );

  return (
    <div className={styles.shell}>
      <Sidebar
        title={title}
        items={menuItems}
        collapsed={collapsed}
        onCollapsedChange={setCollapsed}
      />
      <div className={styles.main}>
        <header className={styles.header}>
          <div className={styles.headerLeft}>
            <button
              type="button"
              className={styles.mobileMenu}
              onClick={() => setCollapsed((value) => !value)}
              aria-label="Меню"
            >
              ☰
            </button>
            <div>
              <p className={styles.kicker}>HR-платформа</p>
              <h1 className={styles.title}>{title}</h1>
            </div>
          </div>
          <div className={styles.actions}>
            {extraHeader}
            <Button type="text" onClick={toggleTheme}>
              {mode === 'dark' ? 'Светлая' : 'Тёмная'}
            </Button>
            <Dropdown menu={{ items: menu }} trigger={['click']}>
              <button type="button" className={styles.user}>
                <Avatar src={user?.avatarUrl} style={{ background: '#41c597' }}>
                  {user?.displayName?.slice(0, 1).toUpperCase() ?? 'U'}
                </Avatar>
                <span className={styles.userMeta}>
                  <strong>{user?.displayName ?? 'Пользователь'}</strong>
                  <small>{user?.email ?? ''}</small>
                </span>
              </button>
            </Dropdown>
          </div>
        </header>
        <main className={styles.content}>
          <div className={styles.page}>
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
}
