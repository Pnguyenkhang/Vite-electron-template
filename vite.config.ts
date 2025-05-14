import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

console.log("using vite.config.ts");
export default defineConfig({
  plugins: [react()],
  server: {
    port: 5123,
    host: 'localhost',
    strictPort: true,
    watch: {
      usePolling: true, // Enable polling for file changes
    },
    hmr: {
      protocol: 'ws', // Use WebSocket protocol
      host: 'localhost',
      overlay: true, // Show errors as overlay
    },
  },
});
