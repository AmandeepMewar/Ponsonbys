import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  test: {
    globals: true,
    environment: 'happy-dom',
    setupFiles: './src/setupTests.js',
  },
  server: {
    proxy: {
      // '/api': 'https://postinks-notes-app.onrender.com',
      '/api': 'http://localhost:3000',
    },
  },
});
