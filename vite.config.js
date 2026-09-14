import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { copyFileSync } from 'node:fs'
import { resolve } from 'node:path'

// GitHub Pages는 SPA 라우트(/about, /newsroom)를 서버에서 알지 못해
// 새로고침·딥링크 시 404를 반환한다. index.html을 404.html로 복사해
// 404 응답 시에도 index.html이 로드되어 클라이언트 라우팅이 동작하게 한다.
function spaFallback() {
  return {
    name: 'spa-404-fallback',
    apply: 'build',
    closeBundle() {
      const dir = resolve(process.cwd(), 'dist')
      copyFileSync(resolve(dir, 'index.html'), resolve(dir, '404.html'))
    },
  }
}

// 배포(GitHub Pages)는 /uneedcomms-homepage/ 하위 경로.
// 로컬 dev/preview 는 루트('/')로 서빙 → http://localhost:5173/ 에서 바로 미리보기.
export default defineConfig(({ command }) => ({
  plugins: [react(), spaFallback()],
  base: command === 'build' ? '/uneedcomms-homepage/' : '/',
}))
