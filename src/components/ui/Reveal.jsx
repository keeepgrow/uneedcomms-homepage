import { useEffect, useRef, useState } from 'react'
import styles from './Reveal.module.css'

// 스크롤 방향에 따라: 뷰포트 진입 시 나타나고(내릴 때), 이탈 시 사라짐(올릴 때)
// ⚠ 관찰(IntersectionObserver) 요소에는 transform을 걸지 않는다.
//   변환을 걸면 요소가 이동→관찰 경계를 다시 넘어→토글→이동... 무한 깜빡임(피드백 루프) 발생.
//   따라서 바깥 div(위치 고정)를 관찰하고, 안쪽 div에만 애니메이션을 적용한다.
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
    <div ref={ref} className={className}>
      <div className={`${styles.reveal} ${inView ? styles.in : ''}`}>
        {children}
      </div>
    </div>
  )
}
