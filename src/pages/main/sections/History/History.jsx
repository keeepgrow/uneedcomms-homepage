import { useEffect, useRef, useState } from 'react'
import { historyYears, historyDefaultYear } from '../../../../data/history.js'
import { useLang } from '../../../../i18n/LanguageContext.jsx'
import styles from './History.module.css'

export default function History() {
  const { t } = useLang()
  const startIdx = Math.max(
    0,
    historyYears.findIndex((y) => y.year === historyDefaultYear),
  )
  const [index, setIndex] = useState(startIdx)
  const [drag, setDrag] = useState(0)
  const [dragging, setDragging] = useState(false)
  const stageRef = useRef(null)
  const rulerRef = useRef(null)
  const startX = useRef(0)
  const moved = useRef(false)
  const [w, setW] = useState(1200)

  useEffect(() => {
    const measure = () => {
      if (stageRef.current) setW(stageRef.current.offsetWidth)
    }
    measure()
    window.addEventListener('resize', measure)
    return () => window.removeEventListener('resize', measure)
  }, [])

  // 활성 연도를 눈금자 중앙으로 스크롤 (넘칠 때만 실제 이동)
  useEffect(() => {
    const wrap = rulerRef.current
    if (!wrap) return
    const active = wrap.querySelector('[data-active="true"]')
    if (!active) return
    const wr = wrap.getBoundingClientRect()
    const ar = active.getBoundingClientRect()
    const target =
      wrap.scrollLeft + (ar.left + ar.width / 2) - (wr.left + wr.width / 2)
    wrap.scrollTo({ left: target, behavior: 'smooth' })
  }, [index])

  const len = historyYears.length
  const slot = w * 0.5
  const offset = w / 2 - (index + 0.5) * slot + drag
  const cur = historyYears[index]

  const onDown = (e) => {
    setDragging(true)
    moved.current = false
    startX.current = e.clientX
    e.currentTarget.setPointerCapture?.(e.pointerId)
  }
  const onMove = (e) => {
    if (!dragging) return
    const d = e.clientX - startX.current
    if (Math.abs(d) > 4) moved.current = true
    setDrag(d)
  }
  const onUp = () => {
    if (!dragging) return
    const th = 50
    let ni = index
    if (drag < -th) ni = Math.min(len - 1, index + 1)
    else if (drag > th) ni = Math.max(0, index - 1)
    setIndex(ni)
    setDrag(0)
    setDragging(false)
  }

  return (
    <section className={styles.section} id="history">
      <div className={`container ${styles.head}`}>
        <h2 className={styles.title}>{t('유니드컴즈가 걸어온 길')}</h2>
        {/* <p className={styles.subtitle}>{t('유니드컴즈의 변화는 세상을 놀랍게 만듭니다')}</p> */}
      </div>

      {/* 연도 눈금자 */}
      <div className={styles.rulerWrap} ref={rulerRef}>
        <div className={styles.ruler}>
          {historyYears.map((y, i) => (
            <div key={y.year} className={styles.unit}>
              <button
                type="button"
                data-active={i === index ? 'true' : undefined}
                className={`${styles.major} ${i === index ? styles.majorActive : ''}`}
                onClick={() => setIndex(i)}
              >
                <span className={styles.majorTick} />
                <span className={styles.majorLabel}>{y.year}</span>
              </button>
              {i < len - 1 && (
                <span className={styles.minors} aria-hidden="true">
                  <span className={styles.minorTick} />
                  <span className={styles.minorTick} />
                  <span className={styles.minorTick} />
                </span>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* 대형 연도 스와이프 캐러셀 */}
      <div
        className={styles.stage}
        ref={stageRef}
        onPointerDown={onDown}
        onPointerMove={onMove}
        onPointerUp={onUp}
        onPointerCancel={onUp}
        role="group"
        aria-label="연혁 연도 스와이프"
      >
        <div
          className={styles.track}
          style={{
            width: len * slot,
            transform: `translateX(${offset}px)`,
            transition: dragging
              ? 'none'
              : 'transform 0.45s cubic-bezier(0.16, 1, 0.3, 1)',
          }}
        >
          {historyYears.map((y, i) => (
            <span
              key={y.year}
              className={`${styles.bigYear} ${i === index ? styles.center : styles.side}`}
              style={{ width: slot }}
            >
              {y.year}
            </span>
          ))}
        </div>
      </div>

      <div className={styles.caption} key={index}>
        {cur.items.map((it, i) => (
          <p key={i}>{t(it)}</p>
        ))}
      </div>
    </section>
  )
}
