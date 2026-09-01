import axios, { type AxiosInstance } from 'axios';
import { installMocks } from '../mocks/install';

const TOKEN_KEY = 'iqhr-token';

function readEnv(name: string, fallback = '') {
  try {
    const meta = import.meta as ImportMeta & { env?: Record<string, string> };
    return meta.env?.[name] ?? fallback;
  } catch {
    return fallback;
  }
}

export function createHttpClient(): AxiosInstance {
  const instance = axios.create({
    baseURL: readEnv('VITE_API_BASE_URL', ''),
    timeout: 15000,
  });

  instance.interceptors.request.use((config) => {
    const token = typeof localStorage !== 'undefined' ? localStorage.getItem(TOKEN_KEY) : null;
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  });

  const useMocks = readEnv('VITE_USE_MOCKS', 'true') !== 'false';
  if (useMocks) {
    installMocks(instance);
  }

  return instance;
}

export const http = createHttpClient();

export function setAuthToken(token: string | null) {
  if (typeof localStorage === 'undefined') return;
  if (token) {
    localStorage.setItem(TOKEN_KEY, token);
  } else {
    localStorage.removeItem(TOKEN_KEY);
  }
}

export const AUTH_TOKEN_KEY = TOKEN_KEY;
