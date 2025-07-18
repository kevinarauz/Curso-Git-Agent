import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// Configuración SIN AUTO-REFRESH pero con React funcionando
export default defineConfig({
  plugins: [react()],
  server: {
    hmr: false, // Desactiva completamente HMR
    watch: {
      // Ignora la mayoría de archivos para evitar auto-refresh
      ignored: ['**/.git/**', '**/node_modules/**', '**/.vscode/**', '**/dist/**'],
    },
    fs: {
      strict: false,
    },
  },
  // Mantener React y dependencias esenciales optimizadas
  optimizeDeps: {
    include: ['react', 'react-dom', 'react/jsx-runtime'], // Incluir React explícitamente
    exclude: ['lucide-react'],
  },
  // Configuraciones adicionales
  build: {
    watch: null,
  },
  // Asegurar que React se exporte correctamente
  define: {
    __DEV__: false,
  },
})
