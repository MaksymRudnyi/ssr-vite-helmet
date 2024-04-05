import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  ssr: {
    noExternal: ['react-helmet-async'],
  },
  esbuild: {
    target: 'esnext',
    platform: 'linux',
  }
})
