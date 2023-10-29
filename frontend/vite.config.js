import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    host: '0.0.0.0', // Set the host to listen on all available network interfaces
    port: 5173
  },
  build: {
    rollupOptions: {
      input: {
        main: './dist/index.html', //configure entrypoint
      }
    }
  }
})
