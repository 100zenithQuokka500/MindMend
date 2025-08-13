import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  server: {
    proxy: {
      '/api': {
        target: 'https://mindmend-backend-19y9.onrender.com/',
        changeOrigin: true,
        secure: false, 
      },
    },
  },
  plugins: [react()],
});
