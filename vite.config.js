import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  // An empty string here makes all paths relative. 
  // It works no matter what your repo is named.
  base: '', 
})
