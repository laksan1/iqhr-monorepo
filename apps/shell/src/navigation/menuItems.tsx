import { IdcardOutlined, TeamOutlined, UserOutlined } from '@ant-design/icons';
import type { SidebarItem } from 'ui-kit';
import { ACCOUNT_PATH, CANDIDATES_PATH, VACANCIES_PATH } from '../constants/paths';
import { PRIVILEGES } from '../constants/privileges';

export const MENU_ITEMS: SidebarItem[] = [
  {
    key: 'candidates',
    label: 'Кандидаты',
    path: CANDIDATES_PATH,
    icon: <TeamOutlined />,
    privilege: PRIVILEGES.candidatesRead,
  },
  {
    key: 'vacancies',
    label: 'Вакансии',
    path: VACANCIES_PATH,
    icon: <IdcardOutlined />,
    privilege: PRIVILEGES.vacanciesRead,
  },
  {
    key: 'account',
    label: 'Кабинет',
    path: ACCOUNT_PATH,
    icon: <UserOutlined />,
    privilege: PRIVILEGES.accountRead,
  },
];
