import react, { reactCompilerPreset } from '@vitejs/plugin-react'
import babel from '@rolldown/plugin-babel'
import { defineConfig } from 'vite'
import apiRoutes from 'vite-plugin-api-routes';


export default defineConfig({
  plugins: [
    react(),
    babel({ presets: [reactCompilerPreset()] }),
    apiRoutes({
      routeBase: 'api'
    })
  ],
})
