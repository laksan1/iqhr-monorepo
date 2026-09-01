/* eslint-disable */
/* Generated from /mocks/candidate-service.json — do not edit by hand. */
import type { AxiosInstance, AxiosResponse } from 'axios';
import { http } from '../../http/client';

export type CandidateStatus = "new" | "in_progress" | "hired" | "rejected";

export interface Candidate {
  id: string;
  fullName: string;
  email: string;
  phone?: string;
  position?: string;
  city?: string;
  experienceYears?: number;
  status: CandidateStatus;
  skills?: Array<string>;
  updatedAt?: string;
}

export interface CandidatePayload {
  fullName: string;
  email: string;
  phone?: string;
  position?: string;
  city?: string;
  experienceYears?: number;
  status?: CandidateStatus;
  skills?: Array<string>;
}

export interface CandidatePage {
  items: Array<Candidate>;
  total: number;
  page: number;
  size: number;
}

export class CandidatesApi {
  constructor(private axios: AxiosInstance = http) {}

  async listCandidates(params?: { page?: number; size?: number; search?: string; status?: "new" | "in_progress" | "hired" | "rejected" }): Promise<AxiosResponse<CandidatePage>> {
    return this.axios.get('/candidates', { params });
  }

  async createCandidate(body: CandidatePayload): Promise<AxiosResponse<Candidate>> {
    return this.axios.post('/candidates', body);
  }

  async getCandidate(id: string): Promise<AxiosResponse<Candidate>> {
    return this.axios.get(`/candidates/${id}`);
  }

  async updateCandidate(id: string, body: CandidatePayload): Promise<AxiosResponse<Candidate>> {
    return this.axios.put(`/candidates/${id}`, body);
  }
}

