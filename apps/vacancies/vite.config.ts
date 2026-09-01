import { createAppConfig } from '../../packages/configs/vite.config.base';

export default createAppConfig({
  test: {
    environment: 'jsdom',
    globals: true,
    setupFiles: ['./src/setupTests.ts'],
  },
});
