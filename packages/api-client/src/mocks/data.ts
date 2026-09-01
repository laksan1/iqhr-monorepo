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
    email: 'maria.lebedeva@yandex.ru',
    phone: '+7 (921) 111-22-33',
    position: 'Senior Frontend Engineer',
    city: 'Санкт-Петербург',
    experienceYears: 6,
    status: 'in_progress',
    skills: ['React', 'TypeScript', 'Vite', 'Design Systems'],
    updatedAt: '2026-08-28T09:15:00.000Z',
  },
  {
    id: 'c-2',
    fullName: 'Игорь Новиков',
    email: 'igor.novikov@gmail.com',
    phone: '+7 (903) 444-55-66',
    position: 'QA Automation Lead',
    city: 'Казань',
    experienceYears: 5,
    status: 'new',
    skills: ['Playwright', 'Vitest', 'CI/CD', 'Allure'],
    updatedAt: '2026-08-29T14:20:00.000Z',
  },
  {
    id: 'c-3',
    fullName: 'Елена Ким',
    email: 'elena.kim@mail.ru',
    phone: '+7 (912) 777-88-99',
    position: 'Product Designer',
    city: 'Москва',
    experienceYears: 7,
    status: 'hired',
    skills: ['Figma', 'UX Research', 'HR Tech', 'Prototyping'],
    updatedAt: '2026-08-22T11:40:00.000Z',
  },
  {
    id: 'c-4',
    fullName: 'Павел Орлов',
    email: 'pavel.orlov@outlook.com',
    phone: '+7 (981) 222-33-44',
    position: 'Java Backend Developer',
    city: 'Екатеринбург',
    experienceYears: 8,
    status: 'rejected',
    skills: ['Java 21', 'Spring Boot', 'Kafka', 'PostgreSQL'],
    updatedAt: '2026-08-19T16:05:00.000Z',
  },
  {
    id: 'c-5',
    fullName: 'Алина Волкова',
    email: 'alina.volkova@hh.ru',
    phone: '+7 (926) 301-44-55',
    position: 'HR Business Partner',
    city: 'Москва',
    experienceYears: 9,
    status: 'in_progress',
    skills: ['Recruiting', 'Onboarding', '1:1', 'Compensation'],
    updatedAt: '2026-08-27T08:30:00.000Z',
  },
  {
    id: 'c-6',
    fullName: 'Дмитрий Сафин',
    email: 'd.safin@corp.tech',
    phone: '+7 (843) 900-12-34',
    position: 'DevOps Engineer',
    city: 'Казань',
    experienceYears: 4,
    status: 'new',
    skills: ['Kubernetes', 'Terraform', 'GitHub Actions', 'Grafana'],
    updatedAt: '2026-08-30T10:00:00.000Z',
  },
  {
    id: 'c-7',
    fullName: 'Ольга Морозова',
    email: 'o.morozova@inbox.ru',
    phone: '+7 (911) 555-66-77',
    position: 'Data Analyst',
    city: 'Санкт-Петербург',
    experienceYears: 3,
    status: 'in_progress',
    skills: ['SQL', 'Power BI', 'Python', 'A/B тесты'],
    updatedAt: '2026-08-26T13:45:00.000Z',
  },
  {
    id: 'c-8',
    fullName: 'Артём Зайцев',
    email: 'artem.zaytsev@proton.me',
    phone: '+7 (495) 123-45-67',
    position: 'Team Lead (Platform)',
    city: 'Москва / Remote',
    experienceYears: 10,
    status: 'hired',
    skills: ['Architecture', 'React', 'Node.js', 'Mentoring'],
    updatedAt: '2026-08-15T09:00:00.000Z',
  },
  {
    id: 'c-9',
    fullName: 'София Романова',
    email: 'sofia.romanova@gmail.com',
    phone: '+7 (977) 888-99-00',
    position: 'Recruiter (IT)',
    city: 'Москва',
    experienceYears: 4,
    status: 'new',
    skills: ['Sourcing', 'LinkedIn', 'Interviewing', 'ATS'],
    updatedAt: '2026-08-31T07:50:00.000Z',
  },
  {
    id: 'c-10',
    fullName: 'Никита Громов',
    email: 'nikita.gromov@ya.ru',
    phone: '+7 (812) 400-22-11',
    position: 'Mobile Developer (React Native)',
    city: 'Санкт-Петербург',
    experienceYears: 5,
    status: 'in_progress',
    skills: ['React Native', 'Expo', 'TypeScript', 'App Store'],
    updatedAt: '2026-08-25T18:10:00.000Z',
  },
  {
    id: 'c-11',
    fullName: 'Виктория Панова',
    email: 'v.panova@corp.io',
    phone: '+7 (351) 700-33-22',
    position: 'Compensation & Benefits Specialist',
    city: 'Челябинск',
    experienceYears: 6,
    status: 'rejected',
    skills: ['C&B', 'Excel', 'HR Analytics', '1C:ЗУП'],
    updatedAt: '2026-08-18T12:25:00.000Z',
  },
  {
    id: 'c-12',
    fullName: 'Константин Ершов',
    email: 'k.ershov@tinkoff.team',
    phone: '+7 (999) 210-98-76',
    position: 'Security Engineer',
    city: 'Москва',
    experienceYears: 7,
    status: 'new',
    skills: ['AppSec', 'SAST/DAST', 'OWASP', 'Threat Modeling'],
    updatedAt: '2026-09-01T06:40:00.000Z',
  },
];

export const vacancies: Vacancy[] = [
  {
    id: 'v-1',
    title: 'Senior React Engineer',
    department: 'Платформа и UI Kit',
    city: 'Москва / Remote',
    employmentType: 'Полная занятость',
    salaryFrom: 350000,
    salaryTo: 450000,
    status: 'open',
    description:
      'Развитие shell-приложения, общего UI Kit и модульной архитектуры. Опыт с monorepo и design systems — плюс.',
    openings: 2,
    updatedAt: '2026-08-29T10:00:00.000Z',
  },
  {
    id: 'v-2',
    title: 'HR Business Partner',
    department: 'People & Culture',
    city: 'Москва',
    employmentType: 'Полная занятость',
    salaryFrom: 220000,
    salaryTo: 280000,
    status: 'open',
    description:
      'Сопровождение продуктовых команд, планирование найма, адаптация и развитие сотрудников.',
    openings: 1,
    updatedAt: '2026-08-28T14:30:00.000Z',
  },
  {
    id: 'v-3',
    title: 'QA Automation Engineer',
    department: 'Качество',
    city: 'Санкт-Петербург',
    employmentType: 'Гибрид',
    salaryFrom: 240000,
    salaryTo: 310000,
    status: 'paused',
    description:
      'Покрытие e2e и интеграционных сценариев Vitest/Playwright, интеграция в CI pipeline.',
    openings: 1,
    updatedAt: '2026-08-20T09:15:00.000Z',
  },
  {
    id: 'v-4',
    title: 'Product Designer (HR)',
    department: 'Дизайн',
    city: 'Москва / Remote',
    employmentType: 'Полная занятость',
    salaryFrom: 280000,
    salaryTo: 360000,
    status: 'open',
    description:
      'Проектирование сценариев рекрутинга, личного кабинета и внутренних HR-инструментов.',
    openings: 1,
    updatedAt: '2026-08-27T11:00:00.000Z',
  },
  {
    id: 'v-5',
    title: 'Backend Developer (Java)',
    department: 'Сервисы кандидатов',
    city: 'Казань',
    employmentType: 'Офис',
    salaryFrom: 300000,
    salaryTo: 390000,
    status: 'open',
    description:
      'Разработка микросервисов candidate-service и vacancy-service, OpenAPI-first подход.',
    openings: 3,
    updatedAt: '2026-08-30T08:45:00.000Z',
  },
  {
    id: 'v-6',
    title: 'Recruiter (IT)',
    department: 'Talent Acquisition',
    city: 'Москва',
    employmentType: 'Полная занятость',
    salaryFrom: 150000,
    salaryTo: 200000,
    status: 'open',
    description: 'Закрытие инженерных позиций, работа с hiring manager, ведение воронки в ATS.',
    openings: 2,
    updatedAt: '2026-08-31T15:20:00.000Z',
  },
  {
    id: 'v-7',
    title: 'DevOps Engineer',
    department: 'Инфраструктура',
    city: 'Remote',
    employmentType: 'Удалённо',
    salaryFrom: 320000,
    salaryTo: 420000,
    status: 'draft',
    description: 'Поддержка Kubernetes, настройка CI/CD для monorepo, observability и секретов.',
    openings: 1,
    updatedAt: '2026-08-24T12:00:00.000Z',
  },
  {
    id: 'v-8',
    title: 'People Partner (Junior)',
    department: 'HR Operations',
    city: 'Новосибирск',
    employmentType: 'Гибрид',
    salaryFrom: 120000,
    salaryTo: 160000,
    status: 'closed',
    description:
      'Администрирование HR-процессов, отчётность, поддержка сотрудников на испытательном сроке.',
    openings: 0,
    updatedAt: '2026-08-10T17:30:00.000Z',
  },
  {
    id: 'v-9',
    title: 'Engineering Manager',
    department: 'Платформа',
    city: 'Москва',
    employmentType: 'Полная занятость',
    salaryFrom: 450000,
    salaryTo: 550000,
    status: 'open',
    description: 'Управление командой платформы, roadmap UI Kit и developer experience в monorepo.',
    openings: 1,
    updatedAt: '2026-09-01T07:10:00.000Z',
  },
];
