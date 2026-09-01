import type { ReactNode } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import styles from './Sidebar.module.css';

export type SidebarItem = {
  key: string;
  label: string;
  path: string;
  icon?: ReactNode;
  privilege?: string;
};

export type SidebarProps = {
  items: SidebarItem[];
  collapsed?: boolean;
  title?: string;
  onCollapsedChange?: (collapsed: boolean) => void;
};

export function Sidebar({
  items,
  collapsed = false,
  title = 'IQHR',
  onCollapsedChange,
}: SidebarProps) {
  const location = useLocation();

  return (
    <aside className={`${styles.sidebar} ${collapsed ? styles.collapsed : ''}`}>
      <div className={styles.brand}>
        <span className={styles.logoMark}>IQ</span>
        {!collapsed && <span className={styles.logoText}>{title}</span>}
      </div>
      <nav className={styles.nav} aria-label="Основная навигация">
        {items.map((item) => {
          const active = location.pathname.startsWith(item.path);
          return (
            <NavLink
              key={item.key}
              to={item.path}
              className={`${styles.item} ${active ? styles.active : ''}`}
              title={item.label}
            >
              <span className={styles.icon}>{item.icon}</span>
              {!collapsed && <span className={styles.label}>{item.label}</span>}
            </NavLink>
          );
        })}
      </nav>
      <button
        type="button"
        className={styles.collapse}
        onClick={() => onCollapsedChange?.(!collapsed)}
        aria-label={collapsed ? 'Развернуть меню' : 'Свернуть меню'}
      >
        {collapsed ? '›' : '‹'}
      </button>
    </aside>
  );
}
