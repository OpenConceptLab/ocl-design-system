import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { resolve } from 'path'

export default defineConfig({
  plugins: [react()],
  base: '/ocl-design-system/',
  build: {
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'index.html'),
        button: resolve(__dirname, 'components/button.html'),
        'building-pages': resolve(__dirname, 'guides/building-pages.html'),
      },
    },
  },
})
