import { lazy } from 'react';

export const CandidatesApp = lazy(() => import('candidates/App'));
export const VacanciesApp = lazy(() => import('vacancies/App'));
export const PersonalAccountApp = lazy(() => import('personal-account/App'));
export const LoginPage = lazy(() => import('../pages/Login'));
