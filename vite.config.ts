/// <reference types="vitest" />
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  server: {
    port: 3000,
  },
  plugins: [react()],
  test: {
    globals: true,
    css: true,
    setupFiles: './src/tests/setUpFiles.ts',
    include: ['./src/tests/*.{test,spec}.{ts,tsx}'],
    exclude: [
      '**/node_modules/**',
      '**/public/**',
      '**/readmeImg/**',
      '**/.**',
      '**/*.{json,md,html}'
    ],
    environment: 'jsdom',
    typecheck: {
      checker: 'tsc',
      include: ['./src/tests/*.{test,spec}.{ts,tsx}'],
      exclude: [
        '**/node_modules/**',
        '**/public/**',
        '**/readmeImg/**',
        '**/.**',
        '**/*.{json,md,html}'
      ],  
    }
  }
});
