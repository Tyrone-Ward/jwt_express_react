import path from 'node:path'
import process from 'node:process'
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import formsPlugin from '@tailwindcss/forms'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss(), formsPlugin],
  resolve: {
    alias: {
      '@hooks': path.resolve(process.cwd(), './src/hooks')
    }
  },
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
