import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  // IMPORTANT: Change 'hydrosync-app' to the EXACT name of your GitHub repository.
  // If you are deploying to a custom domain (like www.my-app.com), remove this line.
  base: '/hydrosync-app/', 
})
