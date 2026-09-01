export type CandidateStatus = 'new' | 'in_progress' | 'hired' | 'rejected';

export type Candidate = {
  id: string;
  fullName: string;
  email: string;
  phone: string;
  position: string;
  city: string;
  experienceYears: number;
  status: CandidateStatus;
  skills: string[];
  updatedAt: string;
};

export type VacancyStatus = 'draft' | 'open' | 'paused' | 'closed';

export type Vacancy = {
  id: string;
  title: string;
  department: string;
  city: string;
  employmentType: string;
  salaryFrom: number;
  salaryTo: number;
  status: VacancyStatus;
  description: string;
  openings: number;
  updatedAt: string;
};

export type User = {
  id: string;
  username: string;
  displayName: string;
  email?: string;
  avatarUrl?: string;
  privileges: string[];
};

export type UserProfile = {
  id?: string;
  displayName?: string;
  email?: string;
  phone?: string;
  position?: string;
  department?: string;
  city?: string;
};

export type UserSettings = {
  language?: string;
  theme?: 'light' | 'dark' | 'system';
  emailNotifications?: boolean;
  pushNotifications?: boolean;
};

export const candidates: Candidate[] = [
  {
    id: 'c-1',
    fullName: 'Мария Лебедева',
    email: 'maria.lebedeva@mail.test',
    phone: '+7 921 111-22-33',
    position: 'Frontend Developer',
    city: 'Санкт-Петербург',
    experienceYears: 5,
    status: 'in_progress',
    skills: ['React', 'TypeScript', 'Vite'],
    updatedAt: '2026-08-20T10:00:00.000Z',
  },
  {
    id: 'c-2',
    fullName: 'Игорь Новиков',
    email: 'igor.novikov@mail.test',
    phone: '+7 903 444-55-66',
    position: 'QA Engineer',
    city: 'Казань',
    experienceYears: 3,
    status: 'new',
    skills: ['Playwright', 'Jest'],
    updatedAt: '2026-08-18T10:00:00.000Z',
  },
  {
    id: 'c-3',
    fullName: 'Елена Ким',
    email: 'elena.kim@mail.test',
    phone: '+7 912 777-88-99',
    position: 'Product Designer',
    city: 'Москва',
    experienceYears: 7,
    status: 'hired',
    skills: ['Figma', 'UX research'],
    updatedAt: '2026-08-12T10:00:00.000Z',
  },
  {
    id: 'c-4',
    fullName: 'Павел Орлов',
    email: 'pavel.orlov@mail.test',
    phone: '+7 981 222-33-44',
    position: 'Backend Developer',
    city: 'Екатеринбург',
    experienceYears: 6,
    status: 'rejected',
    skills: ['Java', 'Spring'],
    updatedAt: '2026-08-09T10:00:00.000Z',
  },
];

export const vacancies: Vacancy[] = [
  {
    id: 'v-1',
    title: 'Senior React Engineer',
    department: 'Platform',
    city: 'Москва / Remote',
    employmentType: 'Полная занятость',
    salaryFrom: 350000,
    salaryTo: 450000,
    status: 'open',
    description: 'Развитие shell-приложения и общего UI Kit.',
    openings: 2,
    updatedAt: '2026-08-21T10:00:00.000Z',
  },
  {
    id: 'v-2',
    title: 'People Partner',
    department: 'HR',
    city: 'Москва',
    employmentType: 'Полная занятость',
    salaryFrom: 180000,
    salaryTo: 240000,
    status: 'open',
    description: 'Сопровождение команд разработки и рекрутинг.',
    openings: 1,
    updatedAt: '2026-08-19T10:00:00.000Z',
  },
  {
    id: 'v-3',
    title: 'QA Automation',
    department: 'Quality',
    city: 'Санкт-Петербург',
    employmentType: 'Гибрид',
    salaryFrom: 220000,
    salaryTo: 280000,
    status: 'paused',
    description: 'Покрытие e2e-сценариев Vitest и Playwright.',
    openings: 1,
    updatedAt: '2026-08-10T10:00:00.000Z',
  },
];
