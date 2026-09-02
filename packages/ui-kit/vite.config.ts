import { resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';
import dts from 'vite-plugin-dts';

const uiKitDir = fileURLToPath(new URL('.', import.meta.url));
const monorepoRoot = resolve(uiKitDir, '../..');

export default defineConfig({
  plugins: [
    react(),
    dts({
      insertTypesEntry: true,
      tsconfigPath: resolve(uiKitDir, 'tsconfig.json'),
    }),
  ],
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
  build: {
    lib: {
      entry: resolve(__dirname, 'src/index.ts'),
      name: 'UiKit',
      formats: ['es', 'cjs'],
      fileName: (format) => (format === 'es' ? 'index.js' : 'index.cjs'),
    },
    rollupOptions: {
      external: [
        'react',
        'react-dom',
        'react/jsx-runtime',
        'antd',
        '@ant-design/icons',
        'react-router-dom',
      ],
    },
  },
});
