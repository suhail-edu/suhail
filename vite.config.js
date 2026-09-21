import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// VITE_BASE lets the same build serve from a sub-path (GitHub Pages: /<repo>/).
// Netlify and local dev leave it unset and serve from /.
export default defineConfig({
  plugins: [react()],
  base: process.env.VITE_BASE || '/',
  server: { host: true },
});
