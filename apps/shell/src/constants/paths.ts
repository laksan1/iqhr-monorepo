export const AUTH_PATH = '/login';

export const CANDIDATES_PATH = '/candidates';
export const VACANCIES_PATH = '/vacancies';
export const ACCOUNT_PATH = '/account';

export const DEFAULT_CABINET_PATH = CANDIDATES_PATH;

export const ROUTE_PATTERNS = {
  auth: `${AUTH_PATH}/*`,
  candidates: `${CANDIDATES_PATH}/*`,
  vacancies: `${VACANCIES_PATH}/*`,
  account: `${ACCOUNT_PATH}/*`,
} as const;
