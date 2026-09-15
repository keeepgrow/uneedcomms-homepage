import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { copyFileSync, readFileSync } from 'node:fs'
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

// news.xml 을 정적 파일로 노출 → URL 로 직접 열기/다운로드 가능.
// (원본은 src/data/news.xml 하나 — 앱은 ?raw 로 번들에 포함해 사용,
//  이 플러그인은 dev 서버 서빙 + 빌드 시 dist/news.xml 복사만 담당)
function newsXmlDownload() {
  const srcPath = () => resolve(process.cwd(), 'src/data/news.xml')
  return {
    name: 'news-xml-download',
    configureServer(server) {
      server.middlewares.use('/news.xml', (_req, res) => {
        res.setHeader('Content-Type', 'application/xml; charset=utf-8')
        res.setHeader('Content-Disposition', 'attachment; filename="news.xml"')
        res.end(readFileSync(srcPath()))
      })
    },
    closeBundle() {
      copyFileSync(srcPath(), resolve(process.cwd(), 'dist/news.xml'))
    },
  }
}

// 배포(GitHub Pages)는 /uneedcomms-homepage/ 하위 경로.
// 로컬 dev/preview 는 루트('/')로 서빙 → http://localhost:5173/ 에서 바로 미리보기.
export default defineConfig(({ command }) => ({
  plugins: [react(), spaFallback(), newsXmlDownload()],
  base: command === 'build' ? '/uneedcomms-homepage/' : '/',
}))
