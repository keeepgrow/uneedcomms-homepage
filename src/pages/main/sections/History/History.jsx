import { useState } from 'react'
import { historyYears, historyDefaultYear } from '../../../../data/history.js'
import styles from './History.module.css'

export default function History() {
  const [active, setActive] = useState(
    historyYears.findIndex((y) => y.year === historyDefaultYear),
  )

  const prev = historyYears[active - 1]
  const cur = historyYears[active]
  const next = historyYears[active + 1]

  return (
    <section className={styles.section} id="history">
      <div className={`container ${styles.head}`}>
        <h2 className={styles.title}>유니드컴즈가 걸어온 길</h2>
        <p className={styles.subtitle}>유니드컴즈의 변화는 세상을 놀랍게 만듭니다</p>
      </div>

      {/* 연도 눈금자 */}
      <div className={styles.rulerWrap}>
        <div className={`container ${styles.ruler}`}>
          {historyYears.map((y, i) => (
            <button
              key={y.year}
              type="button"
              className={`${styles.tick} ${i === active ? styles.tickActive : ''}`}
              onClick={() => setActive(i)}
            >
              <span className={styles.tickMark} />
              <span className={styles.tickLabel}>{y.year}</span>
            </button>
          ))}
        </div>
      </div>

      {/* 대형 연도 캐러셀 */}
      <div className={styles.stage} aria-hidden="true">
        <span className={`${styles.bigYear} ${styles.side}`}>{prev ? prev.year : ''}</span>
        <span className={`${styles.bigYear} ${styles.center}`}>{cur.year}</span>
        <span className={`${styles.bigYear} ${styles.side}`}>{next ? next.year : ''}</span>
      </div>

      {cur.caption && <p className={styles.caption}>{cur.caption}</p>}
    </section>
  )
}
