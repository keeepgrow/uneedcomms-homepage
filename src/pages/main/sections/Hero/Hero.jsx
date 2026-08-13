import { Suspense, lazy, useEffect, useRef } from 'react'
import ErrorBoundary from '../../../../components/common/ErrorBoundary.jsx'
import styles from './Hero.module.css'

// three.js 번들이 크므로 지연 로딩
const ParticleField = lazy(() => import('./ParticleRing.jsx'))
const SplashCursor = lazy(() => import('../../../../components/ui/SplashCursor.jsx'))

export default function Hero() {
  // 히어로는 fixed로 화면에 고정되고, 다음 섹션이 위로 스크롤되며 덮는다.
  // 덮이는 동안 블랙홀 파티클이 산개(progressRef)하고, 결론 문구는 화살표 방향으로 흩어진다.
  const progressRef = useRef(0)
  const s4mainRef = useRef(null)
  const s4subRef = useRef(null)

  useEffect(() => {
    let ticking = false
    const update = () => {
      ticking = false
      const winH = window.innerHeight
      // 스크롤 0 → 0.85뷰포트 동안 산개 완료(콘텐츠가 덮기 직전)
      const p = Math.min(1, Math.max(0, window.scrollY / (winH * 0.85)))
      progressRef.current = p

      // 결론 문구: 스크롤에 따라 화살표 방향으로 흩어짐(메인 2줄 ←왼쪽 / 서브 →오른쪽).
      // p에 직접 연동 → 위로 스크롤하면 그대로 원복.
      const shift = p * 75 // vw
      const op = Math.max(0, 1 - p * 1.4)
      const blur = p * 6
      const main = s4mainRef.current
      const sub = s4subRef.current
      if (main) {
        main.style.transform = `translateX(${-shift}vw)`
        main.style.opacity = String(op)
        main.style.filter = `blur(${blur}px)`
      }
      if (sub) {
        sub.style.transform = `translateX(${shift}vw)`
        sub.style.opacity = String(op)
        sub.style.filter = `blur(${blur}px)`
      }
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
      <section className={styles.hero}>
        {/* 배경: 3D 파티클 지혜의 고리 + 유체 커서 */}
        <div className={styles.bg}>
          <ErrorBoundary>
            <Suspense fallback={null}>
              <ParticleField progressRef={progressRef} />
            </Suspense>
          </ErrorBoundary>
          <ErrorBoundary>
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
          </ErrorBoundary>
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
            <p className={styles.s4main} ref={s4mainRef}>
              지식이 넘쳐나는 세상에서,
              <br />
              우리는 <b>지혜로운 AI</b>를 만듭니다.
            </p>
            <p className={styles.s4sub} ref={s4subRef}>
              한 사람이 해낼 수 있는 일의 넓이와 깊이를 바꾸도록.
            </p>
          </div>
        </div>

        {/* 스크롤 유도 화살표 (하단 중앙) */}
        <div className={styles.scrollCue} aria-hidden="true">
          <svg width="28" height="17" viewBox="0 0 28 17" fill="none">
            <path
              d="M1.41422 1.41422L13.9142 13.9142L26.4142 1.41422"
              stroke="currentColor"
              strokeWidth="4"
            />
          </svg>
        </div>
      </section>
    </div>
  )
}
