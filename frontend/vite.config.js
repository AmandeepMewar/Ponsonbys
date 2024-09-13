import react from '@vitejs/plugin-react';
import { defineConfig, loadEnv } from 'vite';

export default defineConfig((mode) => {
  const env = loadEnv(mode, process.cwd(), '');
  return {
    plugins: [react()],
    test: {
      globals: true,
      environment: 'happy-dom',
      setupFiles: './src/setupTests.js',
    },
    server: {
      proxy: {
        '/api': env?.VITE_API_URL || 'https://ecommerce-4cf2.onrender.com/',
      },
    },
  };
});
