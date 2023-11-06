import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'

// https://vitejs.dev/config/
export default defineConfig({
   resolve: {
    alias: {
      '@': '/src', // Adjust the path to your source directory if needed
    },
  },
  plugins: [react()],
})
