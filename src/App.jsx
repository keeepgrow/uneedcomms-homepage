import { useEffect } from 'react'
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom'
import MainPage from './pages/main/MainPage.jsx'
import AboutPage from './pages/about/AboutPage.jsx'
import NewsroomPage from './pages/newsroom/NewsroomPage.jsx'

// 라우트 이동 시: 해시가 있으면 해당 섹션으로, 없으면 최상단으로
function ScrollManager() {
  const { pathname, hash } = useLocation()
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
