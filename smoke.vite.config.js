import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  plugins: [react(), tailwindcss()],
  define: { 'process.env.NODE_ENV': '"production"' },
  build: {
    outDir: 'dist-smoke',
    emptyOutDir: true,
    cssCodeSplit: false,
    minify: false,
    lib: {
      entry: 'src/smoke-entry.jsx',
      name: 'SkillSyncSmoke',
      formats: ['iife'],
      fileName: () => 'smoke.js',
    },
  },
})
