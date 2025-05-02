import path from "path"
import react from "@vitejs/plugin-react"
import { defineConfig } from "vite"
import { VitePWA } from 'vite-plugin-pwa'

export default defineConfig({
  plugins: [react(),VitePWA({ registerType: 'autoUpdate',devOptions:{enabled: true},workbox:{globPatterns: ['**/*.{js,css,html,ico,png,svg}']},manifest: false  })],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
})
