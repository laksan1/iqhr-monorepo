#!/usr/bin/env node
import { execSync } from 'node:child_process';
import { existsSync, mkdirSync, readFileSync, rmSync, writeFileSync } from 'node:fs';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const configPath = resolve(root, 'packages/configs/openapitools-axios.json');
const config = JSON.parse(readFileSync(configPath, 'utf8'));

const APP_GENERATORS = {
  candidates: ['candidate'],
  vacancies: ['vacancy'],
  shell: ['shell'],
  'personal-account': ['candidate', 'vacancy', 'shell'],
};

const app = process.env.npm_config_app;
const generators = config['generator-cli'].generators;
const keys = app ? (APP_GENERATORS[app] ?? [app]) : Object.keys(generators);

if (app && !keys.length) {
  console.error(`Unknown app "${app}". Use one of: ${Object.keys(APP_GENERATORS).join(', ')}`);
  process.exit(1);
}

function hasJava() {
  try {
    execSync('java -version', { stdio: 'ignore' });
    return true;
  } catch {
    return false;
  }
}

const javaAvailable = hasJava();

function tsType(schema, schemas) {
  if (!schema) return 'unknown';
  if (schema.$ref) {
    const name = schema.$ref.split('/').pop();
    return name ?? 'unknown';
  }
  if (schema.enum) {
    return schema.enum.map((v) => JSON.stringify(v)).join(' | ');
  }
  if (schema.type === 'array') {
    return `Array<${tsType(schema.items, schemas)}>`;
  }
  if (schema.type === 'integer' || schema.type === 'number') return 'number';
  if (schema.type === 'boolean') return 'boolean';
  if (schema.type === 'object' && schema.properties) {
    const fields = Object.entries(schema.properties)
      .map(([k, v]) => `${k}?: ${tsType(v, schemas)}`)
      .join('; ');
    return `{ ${fields} }`;
  }
  return 'string';
}

function pascal(value) {
  return value
    .replace(/[^a-zA-Z0-9]+/g, ' ')
    .split(' ')
    .filter(Boolean)
    .map((part) => part[0].toUpperCase() + part.slice(1))
    .join('');
}

function generateFromSpec(inputSpec, output, generatorKey) {
  const spec = JSON.parse(readFileSync(inputSpec, 'utf8'));
  const schemas = spec.components?.schemas ?? {};
  mkdirSync(output, { recursive: true });

  const models = Object.entries(schemas)
    .map(([name, schema]) => {
      if (schema.enum) {
        return `export type ${name} = ${schema.enum.map((v) => JSON.stringify(v)).join(' | ')};`;
      }
      const required = new Set(schema.required ?? []);
      const fields = Object.entries(schema.properties ?? {})
        .map(([key, value]) => {
          const optional = required.has(key) ? '' : '?';
          return `  ${key}${optional}: ${tsType(value, schemas)};`;
        })
        .join('\n');
      return `export interface ${name} {\n${fields}\n}`;
    })
    .join('\n\n');

  const methods = [];
  for (const [path, pathItem] of Object.entries(spec.paths ?? {})) {
    for (const [method, operation] of Object.entries(pathItem)) {
      if (!operation || typeof operation !== 'object' || !operation.operationId) continue;
      const opId = operation.operationId;
      const params = operation.parameters ?? [];
      const pathParams = params.filter((p) => p.in === 'path');
      const queryParams = params.filter((p) => p.in === 'query');
      const hasBody = Boolean(operation.requestBody);
      const success =
        operation.responses?.['200'] ??
        operation.responses?.['201'] ??
        operation.responses?.['204'];
      const responseSchema = success?.content?.['application/json']?.schema;
      const returnType = responseSchema ? tsType(responseSchema, schemas) : 'void';

      const args = [];
      for (const p of pathParams) {
        args.push(`${p.name}: string`);
      }
      if (queryParams.length) {
        const q = queryParams.map((p) => `${p.name}?: ${tsType(p.schema, schemas)}`).join('; ');
        args.push(`params?: { ${q} }`);
      }
      if (hasBody) {
        const bodySchema = operation.requestBody.content?.['application/json']?.schema;
        args.push(`body: ${tsType(bodySchema, schemas)}`);
      }

      const template = '${$1}';
      const urlExpr = pathParams.length
        ? `\`${path.replace(/{([^}]+)}/g, template)}\``
        : `'${path}'`;

      const axiosArgs = [urlExpr];
      if (hasBody) axiosArgs.push('body');
      else if (method === 'post' || method === 'put' || method === 'patch')
        axiosArgs.push('undefined');
      if (queryParams.length) {
        axiosArgs.push('{ params }');
      }

      methods.push(`  async ${opId}(${args.join(', ')}): Promise<AxiosResponse<${returnType}>> {
    return this.axios.${method}(${axiosArgs.join(', ')});
  }`);
    }
  }

  const apiClass =
    generatorKey === 'candidate'
      ? 'CandidatesApi'
      : generatorKey === 'vacancy'
        ? 'VacanciesApi'
        : generatorKey === 'shell'
          ? 'ShellApi'
          : `${pascal(generatorKey)}Api`;

  const extraClasses =
    generatorKey === 'shell'
      ? `
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
`
      : '';

  const file = `/* eslint-disable */
/* Generated from ${inputSpec.replace(root, '')} — do not edit by hand. */
import type { AxiosInstance, AxiosResponse } from 'axios';
import { http } from '../../http/client';

${models}

export class ${apiClass} {
  constructor(private axios: AxiosInstance = http) {}

${methods.join('\n\n')}
}
${extraClasses}
`;

  writeFileSync(resolve(output, 'index.ts'), file);
  console.log(`Generated ${apiClass} → ${output}`);
}

function generateBarrel() {
  const barrel = `export { CandidatesApi } from './candidate';
export type {
  Candidate,
  CandidatePage,
  CandidatePayload,
  CandidateStatus,
} from './candidate';

export { VacanciesApi } from './vacancy';
export type {
  Vacancy,
  VacancyPage,
  VacancyPayload,
  VacancyStatus,
} from './vacancy';

export { AuthApi, ShellApi, UsersApi } from './shell';
export type {
  LoginRequest,
  LoginResponse,
  User,
  UserProfile,
  UserSettings,
} from './shell';
`;
  writeFileSync(resolve(root, 'packages/api-client/src/generated/index.ts'), barrel);
}

if (javaAvailable && !process.env.FORCE_NODE_GENERATOR) {
  let ok = true;
  for (const key of keys) {
    try {
      execSync(
        `pnpm exec openapi-generator-cli generate --config ${configPath} --generator-key ${key}`,
        { stdio: 'inherit', cwd: resolve(root, 'packages/api-client') },
      );
    } catch {
      ok = false;
      console.warn(
        `openapi-generator-cli failed for "${key}", falling back to the Node generator.`,
      );
      break;
    }
  }
  if (ok) {
    generateBarrel();
    process.exit(0);
  }
} else {
  console.info('Using the built-in TypeScript Axios generator.');
}

const generatedRoot = resolve(root, 'packages/api-client/src/generated');
if (!app && existsSync(generatedRoot)) {
  rmSync(generatedRoot, { recursive: true, force: true });
}
mkdirSync(generatedRoot, { recursive: true });

for (const key of keys) {
  const generator = generators[key];
  if (!generator) {
    console.error(`Generator "${key}" is not defined in openapitools-axios.json`);
    process.exit(1);
  }
  const inputSpec = resolve(dirname(configPath), generator.inputSpec);
  const output = resolve(dirname(configPath), generator.output);
  generateFromSpec(inputSpec, output, key);
}

generateBarrel();
