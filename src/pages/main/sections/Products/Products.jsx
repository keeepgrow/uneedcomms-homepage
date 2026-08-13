import { useState } from 'react'
import { products } from '../../../../data/products.js'
import styles from './Products.module.css'

export default function Products() {
  // 마우스 hover(데스크톱)와 탭 토글(모바일), 카드 확장 상태
  const [hovering, setHovering] = useState(false)
  const [tapPaused, setTapPaused] = useState(false)
  const [activeId, setActiveId] = useState(null)
  const paused = hovering || tapPaused || activeId !== null

  // 이음새 없는 무한 루프를 위해 카드 목록을 2벌로
  const loop = [...products, ...products]

  return (
    <section className={styles.section} id="products">
      <div className="container">
        <h2 className={styles.title}>
          유니드컴즈가 만드는 것,{' '}
          <br className={styles.mBreak} />더 나은 일의 방식
        </h2>
      </div>

      {/* 왼쪽으로 흐르는 마퀴 · hover/탭 시 멈춤 · 카드 클릭 시 확장 */}
      <div
        className={styles.marquee}
        onPointerEnter={(e) => {
          if (e.pointerType !== 'touch') setHovering(true)
        }}
        onPointerLeave={(e) => {
          if (e.pointerType !== 'touch') setHovering(false)
        }}
        onClick={() => {
          // 카드 바깥(빈 영역) 클릭 시 확장 해제
          setActiveId(null)
          setTapPaused(false)
        }}
        role="group"
        aria-label="제품 목록"
      >
        <div
          className={styles.track}
          style={{ animationPlayState: paused ? 'paused' : 'running' }}
        >
          {loop.map((p, i) => {
            const active = activeId === p.id
            return (
              <article
                key={i}
                className={`${styles.card} ${active ? styles.cardActive : ''}`}
                style={p.accent ? { '--accent': p.accent } : undefined}
                onClick={(e) => {
                  e.stopPropagation()
                  if (p.description) setActiveId((v) => (v === p.id ? null : p.id))
                  else setTapPaused((v) => !v)
                }}
                aria-hidden={i >= products.length || undefined}
              >
                <div className={styles.cardHead}>
                  <h3 className={styles.name}>{active && p.nameKo ? p.nameKo : p.name}</h3>
                  <p className={styles.desc}>{p.tagline}</p>
                  {/* 활성 시 설명이 태그라인(부컨텐츠) 자리에 노출 */}
                  {p.description && <p className={styles.detail}>{p.description}</p>}
                </div>

                <div className={styles.cardFoot}>
                  <img
                    className={`${styles.logo} ${p.logoInvert ? styles.logoInvert : ''}`}
                    style={p.logoScale ? { '--logo-scale': p.logoScale } : undefined}
                    src={p.logo}
                    alt={`${p.name} 로고`}
                  />
                  {/* +↔− 모핑 아이콘 (세로선 수축 + 회전) */}
                  <svg
                    className={styles.toggleIcon}
                    width="26"
                    height="26"
                    viewBox="0 0 26 26"
                    fill="none"
                    aria-hidden="true"
                  >
                    <line className={styles.lineH} x1="2.5" y1="13" x2="23.5" y2="13" />
                    <line className={styles.lineV} x1="13" y1="2.5" x2="13" y2="23.5" />
                  </svg>
                </div>
              </article>
            )
          })}
        </div>
      </div>
    </section>
  )
}
