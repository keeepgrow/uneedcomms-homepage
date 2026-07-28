import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// GitHub Pages 프로젝트 페이지 경로: /uneedcomms-homepage/
export default defineConfig({
  plugins: [react()],
  base: '/uneedcomms-homepage/',
})
