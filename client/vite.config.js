import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  server:{
    proxy:{
       '/api':'https://mindmend-backend-1y9v.onrender.com'    },
  },
  plugins: [react()],
})
