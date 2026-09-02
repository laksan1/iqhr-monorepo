import { resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import react from '@vitejs/plugin-react';
import { defineConfig, mergeConfig, type UserConfig } from 'vite';

const configsDir = fileURLToPath(new URL('.', import.meta.url));
export const monorepoRoot = resolve(configsDir, '../..');

const aliasEntries: Array<{ find: string | RegExp; replacement: string }> = [
  {
    find: 'ui-kit/dev',
    replacement: resolve(monorepoRoot, 'packages/ui-kit/src/dev/index.ts'),
  },
  {
    find: 'ui-kit',
    replacement: resolve(monorepoRoot, 'packages/ui-kit/src/index.ts'),
  },
  {
    find: 'api-client/types',
    replacement: resolve(monorepoRoot, 'packages/api-client/src/generated/index.ts'),
  },
  {
    find: 'api-client',
    replacement: resolve(monorepoRoot, 'packages/api-client/src/index.ts'),
  },
  {
    find: 'candidates/App',
    replacement: resolve(monorepoRoot, 'apps/candidates/src/App.tsx'),
  },
  {
    find: 'vacancies/App',
    replacement: resolve(monorepoRoot, 'apps/vacancies/src/App.tsx'),
  },
  {
    find: 'personal-account/App',
    replacement: resolve(monorepoRoot, 'apps/personal-account/src/App.tsx'),
  },
];

export const workspaceAliases = Object.fromEntries(
  aliasEntries.map(({ find, replacement }) => [String(find), replacement]),
);

export const reactViteConfig = defineConfig({
  plugins: [react()],
  resolve: {
    alias: aliasEntries,
    dedupe: ['react', 'react-dom', 'react-router-dom', 'antd'],
  },
  css: {
    modules: {
      localsConvention: 'camelCaseOnly',
    },
    preprocessorOptions: {
      scss: {
        additionalData: `@use "${resolve(monorepoRoot, 'packages/ui-kit/src/styles/mixins')}" as *;\n`,
      },
    },
  },
  server: {
    fs: {
      allow: [monorepoRoot],
    },
  },
  optimizeDeps: {
    exclude: ['ui-kit', 'api-client'],
  },
});

export function createAppConfig(overrides: UserConfig = {}): UserConfig {
  return mergeConfig(reactViteConfig, overrides);
}
