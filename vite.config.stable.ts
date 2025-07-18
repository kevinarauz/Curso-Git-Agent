import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// Configuración ESTABLE para desarrollo - Sin auto refresh
export default defineConfig({
  plugins: [react()],
  server: {
    hmr: false, // Sin Hot Module Replacement
    watch: {
      ignored: ['**/.git/**', '**/node_modules/**', '**/.vscode/**'],
    },
    cors: true,
    port: 5174, // Puerto diferente para evitar conflictos
  },
  build: {
    sourcemap: true,
  },
  optimizeDeps: {
    exclude: ['lucide-react'],
  },
})
