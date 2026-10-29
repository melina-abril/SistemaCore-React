import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// /api va al backend .NET (dotnet run en http://localhost:5080) solo cuando VITE_USE_MOCK=false.
export default defineConfig({
  plugins: [react()],
  server: {
    port: 4260,
    proxy: {
      '/api': { target: 'http://localhost:5080', changeOrigin: true },
    },
  },
});
