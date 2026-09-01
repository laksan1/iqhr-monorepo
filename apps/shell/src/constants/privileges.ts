export const PRIVILEGES = {
  candidatesRead: 'candidates:read',
  vacanciesRead: 'vacancies:read',
  accountRead: 'account:read',
} as const;

export type Privilege = (typeof PRIVILEGES)[keyof typeof PRIVILEGES];
