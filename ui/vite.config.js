import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import formsPlugin from '@tailwindcss/forms'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss(), formsPlugin],
  server: {
    proxy: {
      '/auth': {
        target: 'http://localhost:3000/',
        changeOrigin: true
        // rewrite: (path) => path.replace(/^\/api\/v1/, ""),
      }
    }
  }
})
