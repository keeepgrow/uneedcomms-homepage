import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// 배포(GitHub Pages)는 /uneedcomms-homepage/ 하위 경로.
// 로컬 dev/preview 는 루트('/')로 서빙 → http://localhost:5173/ 에서 바로 미리보기.
export default defineConfig(({ command }) => ({
  plugins: [react()],
  base: command === 'build' ? '/uneedcomms-homepage/' : '/',
}))
