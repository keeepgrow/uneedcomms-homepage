import { Suspense, lazy, useEffect, useRef } from 'react'
import styles from './Hero.module.css'

// three.js 번들이 크므로 지연 로딩
const ParticleField = lazy(() => import('./ParticleRing.jsx'))
const SplashCursor = lazy(() => import('../../../../components/ui/SplashCursor.jsx'))

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
        {/* 배경: 3D 파티클 지혜의 고리 + 유체 커서 */}
        <div className={styles.bg}>
          <Suspense fallback={null}>
            <ParticleField />
          </Suspense>
          <Suspense fallback={null}>
            <SplashCursor
              SIM_RESOLUTION={128}
              DYE_RESOLUTION={1440}
              DENSITY_DISSIPATION={3.5}
              VELOCITY_DISSIPATION={2}
              PRESSURE={0.1}
              CURL={3}
              SPLAT_RADIUS={0.2}
              SPLAT_FORCE={6000}
              COLOR_UPDATE_SPEED={10}
            />
          </Suspense>
          {/* 텍스트 가독성을 위한 스크림 */}
          <div className={styles.scrim} />
        </div>

        <div className={styles.stage}>
          {/* S1: 두 조각이 좌·우에서 한 줄로 합쳐짐 (대형) → 축소 → 사라짐 */}
          <div className={styles.s1}>
            <span className={styles.halfLeft}>한&nbsp;사람이&nbsp;해낼&nbsp;수&nbsp;</span>
            <span className={styles.halfRight}>있는&nbsp;일의</span>
          </div>

          {/* S2, S3: 차례로 등장하며 첫 문장을 이어감 */}
          <p className={`${styles.seq} ${styles.s2}`}>넓이와 깊이를 바꾸는,</p>
          <p className={`${styles.seq} ${styles.s3}`}>지혜로운 AI 에이전트를 만듭니다.</p>

          {/* S4: 최종 결론 문구 (메인 굵게 2줄 + 서브 작게) */}
          <div className={styles.s4}>
            <p className={styles.s4main}>
              지식이 넘쳐나는 세상에서,
              <br />
              우리는 <b>지혜로운 AI</b>를 만듭니다.
            </p>
            <p className={styles.s4sub}>
              한 사람이 해낼 수 있는 일의 넓이와 깊이를 바꾸도록.
            </p>
          </div>
        </div>

        {/* 스크롤 유도 화살표 (하단 중앙) */}
        <div className={styles.scrollCue} aria-hidden="true">
          <svg width="15" height="25" viewBox="0 0 15 25" fill="none">
            <path
              d="M7.20715 0V23.5M13.7072 17L7.20715 23.5L0.707153 17"
              stroke="currentColor"
              strokeWidth="2"
            />
          </svg>
        </div>
      </section>
    </div>
  )
}
