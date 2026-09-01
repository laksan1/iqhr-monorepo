import { resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import react from '@vitejs/plugin-react';
import { defineConfig, mergeConfig, type UserConfig } from 'vite';

const configsDir = fileURLToPath(new URL('.', import.meta.url));
export const monorepoRoot = resolve(configsDir, '../..');

export const workspaceAliases = {
  'ui-kit': resolve(monorepoRoot, 'packages/ui-kit/src/index.ts'),
  'ui-kit/dev': resolve(monorepoRoot, 'packages/ui-kit/src/dev/index.ts'),
  'api-client': resolve(monorepoRoot, 'packages/api-client/src/index.ts'),
  'api-client/types': resolve(monorepoRoot, 'packages/api-client/src/generated/index.ts'),
  'candidates/App': resolve(monorepoRoot, 'apps/candidates/src/App.tsx'),
  'vacancies/App': resolve(monorepoRoot, 'apps/vacancies/src/App.tsx'),
  'personal-account/App': resolve(monorepoRoot, 'apps/personal-account/src/App.tsx'),
};

export const reactViteConfig = defineConfig({
  plugins: [react()],
  resolve: {
    alias: workspaceAliases,
    dedupe: ['react', 'react-dom', 'react-router-dom', 'antd'],
  },
  css: {
    modules: {
      localsConvention: 'camelCaseOnly',
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
