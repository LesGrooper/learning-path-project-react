import { defineConfig } from 'vite'
import react, { reactCompilerPreset } from '@vitejs/plugin-react'
import babel from '@rolldown/plugin-babel'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react({ include: /src\/.*\.(js|jsx|ts|tsx)$/ })
  ],
  esbuild: {
    loader: 'jsx',
    include: /src\/.*\.js$/, // Parses JSX inside your src folder's .js files
    exclude: [],
  },
  optimizeDeps: {
    esbuildOptions: {
      loader: {
        '.js': 'jsx', // Ensures consistency during dependency optimization
      },
    },
  },
})
