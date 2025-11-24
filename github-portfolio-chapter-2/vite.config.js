import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import { VitePWA } from 'vite-plugin-pwa'

export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      registerType: 'autoUpdate',
      manifest: {
        name: 'My Github Portfolio',
        short_name: 'GithubPortfolio',
        icons: [
          {
            src: 'assets/GitHub-Mark-Light-64px.png',
            sizes: '64x64',
            type: 'image/png'
          }
        ]
      }
    })
  ]
})
