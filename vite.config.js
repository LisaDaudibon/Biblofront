import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import ViteRuby from 'vite-plugin-ruby'

export default defineConfig({
  plugins: [
    react(),
    ViteRuby(),
  ],
})

