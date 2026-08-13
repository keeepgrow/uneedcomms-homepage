import { useState } from 'react'
import { products } from '../../../../data/products.js'
import styles from './Products.module.css'

export default function Products() {
  const [paused, setPaused] = useState(false)
  // 이음새 없는 무한 루프를 위해 카드 목록을 2벌로
  const loop = [...products, ...products]

  return (
    <section className={styles.section} id="products">
      <div className="container">
        <h2 className={styles.title}>유니드컴즈가 만드는 것, 더 나은 일의 방식</h2>
      </div>

      {/* 왼쪽으로 천천히 흐르는 마퀴 · hover/클릭 시 멈춤 */}
      <div
        className={`${styles.marquee} ${paused ? styles.paused : ''}`}
        onClick={() => setPaused((v) => !v)}
        role="group"
        aria-label="제품 목록 — 클릭하면 멈춥니다"
      >
        <div className={styles.track}>
          {loop.map((p, i) => (
            <article
              key={i}
              className={styles.card}
              aria-hidden={i >= products.length || undefined}
            >
              <div className={styles.cardHead}>
                <h3 className={styles.name}>{p.name}</h3>
                <p className={styles.desc}>{p.tagline}</p>
              </div>

              <div className={styles.cardFoot}>
                <img
                  className={`${styles.logo} ${p.logoInvert ? styles.logoInvert : ''}`}
                  src={p.logo}
                  alt={`${p.name} 로고`}
                />
                <svg
                  className={styles.plus}
                  width="26"
                  height="26"
                  viewBox="0 0 26 26"
                  fill="none"
                  aria-hidden="true"
                >
                  <path
                    d="M13 2.5 V23.5 M2.5 13 H23.5"
                    stroke="currentColor"
                    strokeWidth="2.2"
                    strokeLinecap="round"
                  />
                </svg>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
