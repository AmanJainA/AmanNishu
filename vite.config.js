import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// GitHub Pages project-site URL: https://amanjaina.github.io/AmanNishu/
export default defineConfig({
  base: '/AmanNishu/',
  plugins: [react()],
  server: {
    proxy: { '/api': 'http://localhost:8000' },
  },
});
