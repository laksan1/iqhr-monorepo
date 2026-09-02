import { createAppConfig } from '../../packages/configs/vite.config.base';

export default createAppConfig({
  base: process.env.VITE_BASE_PATH ?? '/',
  test: {
    environment: 'jsdom',
    globals: true,
    setupFiles: ['./src/setupTests.ts'],
  },
});
