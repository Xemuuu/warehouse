import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/api': {
        target: 'http://localhost:5204',
        changeOrigin: true, // Zmienia nagłówek hosta na adres docelowy
        secure: false,
      },
    },
    port: 3000, // Port, na którym działa React
  },
});