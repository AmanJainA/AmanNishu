import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// Dev: run `php -S localhost:8000 -t .` in the project root (see README) and the
// proxy below forwards /api/* to the PHP endpoints.
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: { '/api': 'http://localhost:8000' },
  },
});
