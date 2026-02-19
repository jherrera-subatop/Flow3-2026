import path from 'path';
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@flow3/components': path.resolve(__dirname, '../packages/components/src/index.ts'),
      '@flow3/tokens': path.resolve(__dirname, '../src/tokens'),
      '@flow3/button': path.resolve(__dirname, '../src/components/Button/Button'),
    },
  },
  optimizeDeps: {
    include: ['@flow3/components'],
  },
});
