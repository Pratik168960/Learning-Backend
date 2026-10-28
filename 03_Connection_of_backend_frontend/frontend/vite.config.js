import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  // Configure the proxy server to intercept /api requests and forward them to the backend
  server: {
    proxy: {
      '/api': 'http://localhost:3000', 
      //proxy is used to avoid CORS error. It will append the backend URL behind the scenes. This tricks the browser into thinking the request came from the same origin.
    }
  },
  plugins: [react()],
})