import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// Configuración ULTRA ESTABLE - CERO AUTO REFRESH
export default defineConfig({
  base: '/Curso-Git-Agent/',
  plugins: [react()],
  server: {
    hmr: false,
    watch: {
      ignored: ['**/*'], // Ignora todos los archivos
    },
    port: 5175, // Puerto diferente
    strictPort: true,
    cors: true,
  },
  optimizeDeps: {
    disabled: 'dev',
    exclude: ['lucide-react'],
  },
  build: {
    watch: null,
  },
  // Configuración para modo estático
  preview: {
    port: 5175,
    strictPort: true,
  },
})
