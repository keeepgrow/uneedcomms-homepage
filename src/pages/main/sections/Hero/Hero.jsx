import { Suspense, lazy, useEffect, useRef } from 'react'
import styles from './Hero.module.css'

// 3D 배경은 three.js 번들이 크므로 지연 로딩 (초기 페인트 블로킹 방지)
const HeroBackground = lazy(() => import('./HeroBackground.jsx'))

const HEADLINE = '한 사람이 해낼 수 있는 일의'
const MIN_HEIGHT = 760 // 스크롤 후 도달할 '지금 사이즈'

export default function Hero() {
  const heroRef = useRef(null)

  // 스크롤 위치에 직결: 풀스크린(100vh) → MIN_HEIGHT 로 높이만 축소
  useEffect(() => {
    const hero = heroRef.current
    if (!hero) return

    let ticking = false
    const update = () => {
      ticking = false
      const full = window.innerHeight
      const min = Math.min(MIN_HEIGHT, full)
      const h = Math.max(min, full - window.scrollY)
      hero.style.height = `${h}px`
    }
    const onScroll = () => {
      if (!ticking) {
        ticking = true
        requestAnimationFrame(update)
      }
    }

    update()
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', update)
    return () => {
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', update)
    }
  }, [])

  return (
    <div className={styles.track} id="top">
      <section className={styles.hero} ref={heroRef}>
        {/* 3D 파티클 스웜 배경 */}
        <div className={styles.bg}>
          <Suspense fallback={null}>
            <HeroBackground />
          </Suspense>
        </div>

        {/* 헤드라인 마퀴 (배경 위에 표시) */}
        <div className={styles.marquee} aria-label={HEADLINE}>
          <div className={styles.marqueeTrack} aria-hidden="true">
            {[0, 1].map((n) => (
              <span key={n} className={styles.phrase}>
                {HEADLINE}
                <span className={styles.gap} />
              </span>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}
