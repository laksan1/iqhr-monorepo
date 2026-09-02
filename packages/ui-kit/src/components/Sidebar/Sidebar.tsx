import { LeftOutlined } from '@ant-design/icons';
import type { ReactNode } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import styles from './Sidebar.module.scss';

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
      <button
        type="button"
        className={styles.toggle}
        onClick={() => onCollapsedChange?.(!collapsed)}
        aria-label={collapsed ? 'Развернуть меню' : 'Свернуть меню'}
        aria-expanded={!collapsed}
        title={collapsed ? 'Развернуть' : 'Свернуть'}
      >
        <LeftOutlined
          className={`${styles.toggleIcon} ${collapsed ? styles.toggleIconCollapsed : ''}`}
        />
      </button>

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
              title={collapsed ? item.label : undefined}
            >
              <span className={styles.icon}>{item.icon}</span>
              {!collapsed && <span className={styles.label}>{item.label}</span>}
            </NavLink>
          );
        })}
      </nav>
    </aside>
  );
}
