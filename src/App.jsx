import { useEffect } from 'react'
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom'
import MainPage from './pages/main/MainPage.jsx'
import AboutPage from './pages/about/AboutPage.jsx'
import NewsroomPage from './pages/newsroom/NewsroomPage.jsx'

// 라이트 테마(흰 배경) 서브페이지 — 오버스크롤 영역도 흰색이어야 함
const LIGHT_ROUTES = ['/about', '/newsroom']

// 라우트 이동 시: 해시가 있으면 해당 섹션으로, 없으면 최상단으로
function ScrollManager() {
  const { pathname, hash } = useLocation()

  // 페이지 배경(맥북 고무줄 오버스크롤 시 상단에 노출되는 색)을 라우트에 맞춤
  useEffect(() => {
    document.body.style.background = LIGHT_ROUTES.includes(pathname)
      ? 'var(--color-white)'
      : ''
  }, [pathname])

  useEffect(() => {
    if (hash) {
      const el = document.querySelector(hash)
      if (el) {
        el.scrollIntoView({ behavior: 'smooth' })
        return
      }
    }
    window.scrollTo(0, 0)
  }, [pathname, hash])
  return null
}

export default function App() {
  return (
    <BrowserRouter basename={import.meta.env.BASE_URL}>
      <ScrollManager />
      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/newsroom" element={<NewsroomPage />} />
      </Routes>
    </BrowserRouter>
  )
}
