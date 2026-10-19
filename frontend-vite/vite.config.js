import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    port: 3000,   // same port as before (Create React App)
    host: true,   // also reachable on your network address
    proxy: {
      // Forward /api calls to the Spring Boot backend
      '/api': {
        target: 'http://localhost:8080',
        changeOrigin: true,
        configure: (proxy) => {
          // Backend sees a normal same-origin request -> no "Invalid CORS request" 403
          proxy.on('proxyReq', (proxyReq) => proxyReq.removeHeader('origin'));
        },
      },
    },
  },
  build: {
    outDir: 'build', // keep the same folder so pom.xml / Dockerfile keep working
  },
});
