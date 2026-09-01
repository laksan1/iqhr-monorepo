/* eslint-disable */
/* Generated from /mocks/shell-service.json — do not edit by hand. */
import type { AxiosInstance, AxiosResponse } from 'axios';
import { http } from '../../http/client';

export interface LoginRequest {
  username: string;
  password: string;
}

export interface LoginResponse {
  token: string;
  user: User;
}

export interface User {
  id: string;
  username: string;
  displayName: string;
  email?: string;
  avatarUrl?: string;
  privileges: Array<string>;
}

export interface UserProfile {
  id?: string;
  displayName?: string;
  email?: string;
  phone?: string;
  position?: string;
  department?: string;
  city?: string;
}

export interface UserSettings {
  language?: string;
  theme?: "light" | "dark" | "system";
  emailNotifications?: boolean;
  pushNotifications?: boolean;
}

export class ShellApi {
  constructor(private axios: AxiosInstance = http) {}

  async login(body: LoginRequest): Promise<AxiosResponse<LoginResponse>> {
    return this.axios.post('/auth/login', body);
  }

  async logout(): Promise<AxiosResponse<void>> {
    return this.axios.post('/auth/logout', undefined);
  }

  async getCurrentUser(): Promise<AxiosResponse<User>> {
    return this.axios.get('/auth/me');
  }

  async getProfile(): Promise<AxiosResponse<UserProfile>> {
    return this.axios.get('/users/profile');
  }

  async updateProfile(body: UserProfile): Promise<AxiosResponse<UserProfile>> {
    return this.axios.put('/users/profile', body);
  }

  async getSettings(): Promise<AxiosResponse<UserSettings>> {
    return this.axios.get('/users/settings');
  }

  async updateSettings(body: UserSettings): Promise<AxiosResponse<UserSettings>> {
    return this.axios.put('/users/settings', body);
  }
}

export class AuthApi {
  constructor(private axios: AxiosInstance = http) {}

  async login(body: LoginRequest): Promise<AxiosResponse<LoginResponse>> {
    return this.axios.post('/auth/login', body);
  }

  async logout(): Promise<AxiosResponse<void>> {
    return this.axios.post('/auth/logout');
  }

  async getCurrentUser(): Promise<AxiosResponse<User>> {
    return this.axios.get('/auth/me');
  }
}

export class UsersApi {
  constructor(private axios: AxiosInstance = http) {}

  async getProfile(): Promise<AxiosResponse<UserProfile>> {
    return this.axios.get('/users/profile');
  }

  async updateProfile(body: UserProfile): Promise<AxiosResponse<UserProfile>> {
    return this.axios.put('/users/profile', body);
  }

  async getSettings(): Promise<AxiosResponse<UserSettings>> {
    return this.axios.get('/users/settings');
  }

  async updateSettings(body: UserSettings): Promise<AxiosResponse<UserSettings>> {
    return this.axios.put('/users/settings', body);
  }
}

