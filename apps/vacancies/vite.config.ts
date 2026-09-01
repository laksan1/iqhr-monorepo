import { defineConfig, mergeConfig } from 'vitest/config';
import { createAppConfig } from '../../packages/configs/vite.config.base';

export default mergeConfig(
  createAppConfig(),
  defineConfig({
    test: {
      environment: 'jsdom',
      globals: true,
      setupFiles: ['./src/setupTests.ts'],
    },
  }),
);
