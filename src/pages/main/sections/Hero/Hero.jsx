import { Suspense, lazy, useEffect, useRef } from 'react'
import styles from './Hero.module.css'

// 3D 배경은 three.js 번들이 크므로 지연 로딩 (초기 페인트 블로킹 방지)
const HeroBackground = lazy(() => import('./HeroBackground.jsx'))

const MIN_HEIGHT = 760 // 스크롤 후 도달할 '지금 사이즈'

// 라이트/다크 레이어에서 동일 위치로 재사용되는 헤드라인 (원형 리빌 색 반전용)
function Headline() {
  return (
    <div className={styles.headline}>
      <p className={styles.lead}>
        한 사람이 해낼 수 있는 일의 넓이와 깊이를 바꾸는,
        <br />
        지혜로운 AI 에이전트를 만듭니다.
      </p>
      <p className={styles.sub}>
        지식이 넘쳐나는 세상에서, 우리는 지혜로운 AI를 만듭니다.
        <br />
        한 사람이 해낼 수 있는 일의 넓이와 깊이를 바꾸도록.
      </p>
    </div>
  )
}

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
        {/* 레이어 1: 라이트 상태 (흰 배경 + 검은 글자) */}
        <div className={`${styles.layer} ${styles.light}`}>
          <Headline />
        </div>

        {/* 레이어 2: 다크 상태 — 중앙에서 원형으로 확장되며 라이트 위를 덮음 */}
        <div className={`${styles.layer} ${styles.dark}`}>
          {/* 리빌 완료 후 페이드인되는 3D 파티클 배경 */}
          <div className={styles.particles}>
            <Suspense fallback={null}>
              <HeroBackground />
            </Suspense>
          </div>
          <Headline />
        </div>
      </section>
    </div>
  )
}
