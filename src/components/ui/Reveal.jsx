import { useEffect, useRef, useState } from 'react'
import styles from './Reveal.module.css'

// 스크롤 시 뷰포트에 들어오면 페이드+슬라이드로 자연스럽게 등장
export default function Reveal({ children, className = '' }) {
  const ref = useRef(null)
  const [inView, setInView] = useState(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    // 접근성: 모션 최소화 설정이면 즉시 노출
    if (window.matchMedia?.('(prefers-reduced-motion: reduce)').matches) {
      setInView(true)
      return
    }
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setInView(true)
            io.unobserve(entry.target)
          }
        })
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
