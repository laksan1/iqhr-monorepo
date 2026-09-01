import type { AxiosInstance, InternalAxiosRequestConfig } from 'axios';
import { AxiosHeaders } from 'axios';
import {
  type Candidate,
  candidates,
  type User,
  type UserProfile,
  type UserSettings,
  vacancies,
} from './data';

function jsonResponse(config: InternalAxiosRequestConfig, data: unknown, status = 200) {
  return Promise.resolve({
    data,
    status,
    statusText: 'OK',
    headers: { 'content-type': 'application/json' },
    config,
  });
}

function paginate<T>(items: T[], page = 1, size = 10) {
  const start = (page - 1) * size;
  return {
    items: items.slice(start, start + size),
    total: items.length,
    page,
    size,
  };
}

let profile: UserProfile = {
  id: 'u-1',
  displayName: 'Анна Соколова',
  email: 'anna.sokolova@iqhr.local',
  phone: '+7 999 123-45-67',
  position: 'HR Business Partner',
  department: 'People',
  city: 'Москва',
};

let settings: UserSettings = {
  language: 'ru',
  theme: 'light',
  emailNotifications: true,
  pushNotifications: false,
};

const demoUser: User = {
  id: 'u-1',
  username: 'anna',
  displayName: profile.displayName ?? 'Анна Соколова',
  email: profile.email,
  privileges: ['candidates:read', 'vacancies:read', 'account:read', 'account:write'],
};

export function installMocks(client: AxiosInstance) {
  client.interceptors.request.use((config) => {
    const adapter = async (cfg: InternalAxiosRequestConfig) => {
      const url = `${cfg.baseURL ?? ''}${cfg.url ?? ''}`;
      const method = (cfg.method ?? 'get').toLowerCase();
      const params = cfg.params ?? {};
      const body = typeof cfg.data === 'string' ? JSON.parse(cfg.data) : (cfg.data ?? {});

      if (url.includes('/auth/login') && method === 'post') {
        if (!body.username || String(body.password ?? '').length < 4) {
          const error = Object.assign(new Error('Invalid credentials'), {
            response: { status: 401 },
          });
          throw error;
        }
        return jsonResponse(cfg, {
          token: 'mock-token',
          user: { ...demoUser, username: body.username },
        });
      }

      if (url.includes('/auth/logout') && method === 'post') {
        return jsonResponse(cfg, undefined, 204);
      }

      if (url.includes('/auth/me')) {
        return jsonResponse(cfg, demoUser);
      }

      if (url.includes('/users/profile') && method === 'get') {
        return jsonResponse(cfg, profile);
      }

      if (url.includes('/users/profile') && method === 'put') {
        profile = { ...profile, ...body };
        return jsonResponse(cfg, profile);
      }

      if (url.includes('/users/settings') && method === 'get') {
        return jsonResponse(cfg, settings);
      }

      if (url.includes('/users/settings') && method === 'put') {
        settings = { ...settings, ...body };
        return jsonResponse(cfg, settings);
      }

      const candidateMatch = url.match(/\/candidates\/([^/?]+)$/);
      if (candidateMatch && method === 'get') {
        const item = candidates.find((c) => c.id === candidateMatch[1]);
        if (!item) {
          throw Object.assign(new Error('Not found'), { response: { status: 404 } });
        }
        return jsonResponse(cfg, item);
      }

      if (url.includes('/candidates') && method === 'get') {
        const search = String(params.search ?? '').toLowerCase();
        const status = params.status as Candidate['status'] | undefined;
        const filtered = candidates.filter((item) => {
          const matchesSearch =
            !search ||
            item.fullName.toLowerCase().includes(search) ||
            item.position.toLowerCase().includes(search);
          const matchesStatus = !status || item.status === status;
          return matchesSearch && matchesStatus;
        });
        return jsonResponse(
          cfg,
          paginate(filtered, Number(params.page ?? 1), Number(params.size ?? 8)),
        );
      }

      const vacancyMatch = url.match(/\/vacancies\/([^/?]+)$/);
      if (vacancyMatch && method === 'get') {
        const item = vacancies.find((c) => c.id === vacancyMatch[1]);
        if (!item) {
          throw Object.assign(new Error('Not found'), { response: { status: 404 } });
        }
        return jsonResponse(cfg, item);
      }

      if (url.includes('/vacancies') && method === 'get') {
        const search = String(params.search ?? '').toLowerCase();
        const status = params.status as string | undefined;
        const filtered = vacancies.filter((item) => {
          const matchesSearch =
            !search ||
            item.title.toLowerCase().includes(search) ||
            item.department.toLowerCase().includes(search);
          const matchesStatus = !status || item.status === status;
          return matchesSearch && matchesStatus;
        });
        return jsonResponse(
          cfg,
          paginate(filtered, Number(params.page ?? 1), Number(params.size ?? 8)),
        );
      }

      throw Object.assign(new Error(`No mock for ${method.toUpperCase()} ${url}`), {
        response: { status: 404 },
      });
    };

    config.adapter = adapter;
    config.headers = AxiosHeaders.from(config.headers);
    return config;
  });
}
