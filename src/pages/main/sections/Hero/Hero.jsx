import { Suspense, lazy } from 'react'
import styles from './Hero.module.css'

// 3D 배경은 three.js 번들이 크므로 지연 로딩 (초기 페인트 블로킹 방지)
const HeroBackground = lazy(() => import('./HeroBackground.jsx'))

const HEADLINE = '한 사람이 해낼 수 있는 일의'

export default function Hero() {
  return (
    <section className={styles.hero} id="top">
      {/* 3D 파티클 스웜 배경 */}
      <div className={styles.bg}>
        <Suspense fallback={null}>
          <HeroBackground />
        </Suspense>
      </div>

      {/* 헤드라인 마퀴 (배경 위에 표시) */}
      <div className={styles.marquee} aria-label={HEADLINE}>
        <div className={styles.track} aria-hidden="true">
          {[0, 1].map((n) => (
            <span key={n} className={styles.phrase}>
              {HEADLINE}
              <span className={styles.gap} />
            </span>
          ))}
        </div>
      </div>
    </section>
  )
}
