import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';
import { dailyLogsPlugin } from './dailyLogsPlugin.js';

export default defineConfig({
  base: '/fitness-tracker/',
  plugins: [
    react(),
    tailwindcss(),
    dailyLogsPlugin()
  ],
  server: {
    port: 3000,
    open: false
  },
  preview: {
    port: 4173
  }
});
