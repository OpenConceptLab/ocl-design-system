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
        'repo-chip': resolve(__dirname, 'components/repo-chip.html'),
        'html-tooltip': resolve(__dirname, 'components/html-tooltip.html'),
        'repo-header': resolve(__dirname, 'components/repo-header.html'),
        dialog: resolve(__dirname, 'components/dialog.html'),
        alert: resolve(__dirname, 'components/alert.html'),
        'common-tabs': resolve(__dirname, 'components/common-tabs.html'),
        breadcrumbs: resolve(__dirname, 'components/breadcrumbs.html'),
        'kebab-menu': resolve(__dirname, 'components/kebab-menu.html'),
        'workspace-toolbar': resolve(__dirname, 'components/workspace-toolbar.html'),
        'building-pages': resolve(__dirname, 'guides/building-pages.html'),
      },
    },
  },
})
