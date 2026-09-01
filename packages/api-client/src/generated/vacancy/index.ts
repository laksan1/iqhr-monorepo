/* eslint-disable */
/* Generated from /mocks/vacancy-service.json — do not edit by hand. */
import type { AxiosInstance, AxiosResponse } from 'axios';
import { http } from '../../http/client';

export type VacancyStatus = "draft" | "open" | "paused" | "closed";

export interface Vacancy {
  id: string;
  title: string;
  department?: string;
  city?: string;
  employmentType?: string;
  salaryFrom?: number;
  salaryTo?: number;
  status: VacancyStatus;
  description?: string;
  openings?: number;
  updatedAt?: string;
}

export interface VacancyPayload {
  title: string;
  department?: string;
  city?: string;
  employmentType?: string;
  salaryFrom?: number;
  salaryTo?: number;
  status?: VacancyStatus;
  description?: string;
  openings?: number;
}

export interface VacancyPage {
  items: Array<Vacancy>;
  total: number;
  page: number;
  size: number;
}

export class VacanciesApi {
  constructor(private axios: AxiosInstance = http) {}

  async listVacancies(params?: { page?: number; size?: number; search?: string; status?: "draft" | "open" | "paused" | "closed" }): Promise<AxiosResponse<VacancyPage>> {
    return this.axios.get('/vacancies', { params });
  }

  async createVacancy(body: VacancyPayload): Promise<AxiosResponse<Vacancy>> {
    return this.axios.post('/vacancies', body);
  }

  async getVacancy(id: string): Promise<AxiosResponse<Vacancy>> {
    return this.axios.get(`/vacancies/${id}`);
  }

  async updateVacancy(id: string, body: VacancyPayload): Promise<AxiosResponse<Vacancy>> {
    return this.axios.put(`/vacancies/${id}`, body);
  }
}

