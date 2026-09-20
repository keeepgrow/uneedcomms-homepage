import { useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import styles from './Hero.module.css'
import DotArrow from '../../../../components/ui/DotArrow.jsx'
import { useLang } from '../../../../i18n/LanguageContext.jsx'
import bg from '../../../../assets/hero-v2/bg.png'
import clouds from '../../../../assets/hero-v2/clouds.webm'
import mtn from '../../../../assets/hero-v2/mtn.png'
import ocean from '../../../../assets/hero-v2/ocean.png'
import sun from '../../../../assets/hero-v2/sun.png'
import ship from '../../../../assets/hero-v2/ship.png'
import rocks from '../../../../assets/hero-v2/rocks.png'
import fg from '../../../../assets/hero-v2/fg.png'

// 하늘은 고정, 근경일수록 크게 이동 → 지구 원근감의 고저차(다이나믹 패럴랙스).
// 해(sun)는 범선 바로 뒤 수평선. 전경(fg)은 하단에 검정 스커트를 이어 붙여
// 크게 떠올라도 하단이 항상 검정으로 덮여 빈틈이 없음.
const LAYERS = [
  // 배경(하늘) = pixelclouds 영상. bg.png는 poster(로딩 폴백)
  { key: 'bg', src: clouds, speed: 0 },
  // 해는 산 뒤에(산이 해를 가림 — 자연스러움). 반응형에서 해·반사광은 범선 우측으로
  { key: 'sun', src: sun, speed: 0.14, mob: 'refl' },
  // 뒤 산: 반응형에서 왼쪽으로 이동해 범선 영역을 비움
  { key: 'mtn', src: mtn, speed: 0.08, mob: 'mtn' },
  { key: 'ocean', src: ocean, speed: 0.14, mob: 'refl' },
  { key: 'ship', src: ship, speed: 0.14, mob: 'ship' },
  { key: 'rocks', src: rocks, speed: 0.22 },
]
const FG_SPEED = 0.32
// 하늘(bg)·앞산(fg) 제외한 중경 레이어(원경산·해·바다·범선·바위)를 아래로 내리는 기준 오프셋(px)
const SCENE_OFFSET = 50

// 줄바꿈(\n)을 <br />로 렌더
function MultiLine({ text }) {
  const lines = text.split('\n')
  return lines.map((line, i) => (
    <span key={i}>
      {line}
      {i < lines.length - 1 && <br />}
    </span>
  ))
}

export default function Hero() {
  const { t } = useLang()
  const layerRefs = useRef([])
  const fgRef = useRef(null)

  // 스크롤 패럴랙스 — 레이어별 서로 다른 속도로 지구 원근감(고저차) 연출
  useEffect(() => {
    if (window.matchMedia?.('(prefers-reduced-motion: reduce)').matches) return
    let raf = 0
    const apply = () => {
      const y = window.scrollY
      for (let i = 0; i < LAYERS.length; i++) {
        const el = layerRefs.current[i]
        // 하늘은 고정, 나머지 중경은 SCENE_OFFSET만큼 아래로
        const base = LAYERS[i].key === 'bg' ? 0 : SCENE_OFFSET
        if (el) el.style.transform = `translate3d(0, ${base - y * LAYERS[i].speed}px, 0)`
      }
      // 앞산(fg)은 오프셋 없이 그대로
      if (fgRef.current)
        fgRef.current.style.transform = `translate3d(0, ${-(y * FG_SPEED)}px, 0)`
      raf = 0
    }
    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(apply)
    }
    apply()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => {
      window.removeEventListener('scroll', onScroll)
      if (raf) cancelAnimationFrame(raf)
    }
  }, [])

  return (
    <section className={styles.hero} id="top">
      <div className={styles.bg} aria-hidden="true">
        {LAYERS.map((l, i) =>
          l.key === 'bg' ? (
            // 배경(하늘) 영상 — 자동재생·루프·무음(모바일 자동재생 위해 muted+playsInline)
            <video
              key={l.key}
              ref={(el) => (layerRefs.current[i] = el)}
              className={styles.layer}
              src={l.src}
              poster={bg}
              autoPlay
              loop
              muted
              playsInline
              preload="auto"
            />
          ) : (
            <img
              key={l.key}
              ref={(el) => (layerRefs.current[i] = el)}
              className={`${styles.layer} ${
                l.mob === 'ship'
                  ? styles.mobShip
                  : l.mob === 'refl'
                  ? styles.mobRefl
                  : l.mob === 'mtn'
                  ? styles.mobMtn
                  : ''
              }`}
              src={l.src}
              alt=""
            />
          )
        )}
        {/* 전경(앞산) — 긴 하단(solid 검정)을 프레임 아래로 연장 렌더링해
            스크롤 시 하단 빈틈/띠 없이 검정으로 덮음 */}
        <div ref={fgRef} className={styles.fgWrap}>
          <img className={styles.fgLayer} src={fg} alt="" />
        </div>
      </div>

      <div className={`container ${styles.content}`}>
        <h1 className={styles.headline}>
          <MultiLine
            text={t('한 사람이 해낼 수 있는 일의 넓이와 깊이를 바꾸는,\n지혜로운 AI 에이전트를 만듭니다.')}
          />
        </h1>

        <Link to="/about" className={styles.cta}>
          {t('더 알아보기')}
          <DotArrow dir="right" />
        </Link>
      </div>
    </section>
  )
}
