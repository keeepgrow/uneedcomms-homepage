import { useEffect, useRef, useState } from 'react'
import styles from './Reveal.module.css'

// 스크롤 방향에 따라: 뷰포트 진입 시 나타나고(내릴 때), 이탈 시 사라짐(올릴 때)
export default function Reveal({ children, className = '' }) {
  const ref = useRef(null)
  const [inView, setInView] = useState(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    // 접근성: 모션 최소화 설정이면 즉시 노출(토글 안 함)
    if (window.matchMedia?.('(prefers-reduced-motion: reduce)').matches) {
      setInView(true)
      return
    }
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => setInView(entry.isIntersecting))
      },
      { threshold: 0.14, rootMargin: '0px 0px -8% 0px' }
    )
    io.observe(el)
    return () => io.disconnect()
  }, [])

  return (
    <div
      ref={ref}
      className={`${styles.reveal} ${inView ? styles.in : ''} ${className}`}
    >
      {children}
    </div>
  )
}
