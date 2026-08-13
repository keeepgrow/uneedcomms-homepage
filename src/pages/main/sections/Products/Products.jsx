import { useEffect, useRef, useState } from 'react'
import { products } from '../../../../data/products.js'
import styles from './Products.module.css'

export default function Products() {
  // 데스크톱 hover, 모바일 탭 토글, 카드 확장 상태
  const [hovering, setHovering] = useState(false)
  const [tapPaused, setTapPaused] = useState(false)
  const [activeId, setActiveId] = useState(null)

  // 스크롤 뷰포트 + 자동흐름/드래그 제어 refs
  const viewportRef = useRef(null)
  const pausedRef = useRef(false)
  const interactingRef = useRef(false)
  const dragRef = useRef({ active: false, startX: 0, startScroll: 0, moved: false })

  // 이음새 없는 무한 루프를 위해 카드 목록을 2벌로
  const loop = [...products, ...products]

  // 자동 흐름 일시정지 조건(hover · 탭정지 · 카드확장) 동기화
  useEffect(() => {
    pausedRef.current = hovering || tapPaused || activeId !== null
  }, [hovering, tapPaused, activeId])

  // 자동 스크롤(좌로 흐름) — 스와이프와 공존하도록 scrollLeft 기반으로 구동
  useEffect(() => {
    const vp = viewportRef.current
    if (!vp) return

    // 좌우 양방향 무한 스와이프 여유를 위해 가운데(한 벌 폭)에서 시작
    const recenter = () => {
      const half = vp.scrollWidth / 2
      if (half > 0) vp.scrollLeft = half
    }
    recenter()

    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    let raf
    let last = null
    const step = (t) => {
      if (last == null) last = t
      const dt = t - last
      last = t
      const half = vp.scrollWidth / 2
      if (half > 0) {
        if (!reduce && !pausedRef.current && !interactingRef.current) {
          // 기존 마퀴와 동일한 페이스(한 벌 42초)
          vp.scrollLeft += (half / 42) * (dt / 1000)
        }
        // 무한 루프: 가운데 밴드[0.5·half ~ 1.5·half] 유지 (드래그 기준점도 함께 보정)
        if (vp.scrollLeft >= half * 1.5) {
          vp.scrollLeft -= half
          if (dragRef.current.active) dragRef.current.startScroll -= half
        } else if (vp.scrollLeft <= half * 0.5) {
          vp.scrollLeft += half
          if (dragRef.current.active) dragRef.current.startScroll += half
        }
      }
      raf = requestAnimationFrame(step)
    }
    raf = requestAnimationFrame(step)
    window.addEventListener('resize', recenter)
    return () => {
      cancelAnimationFrame(raf)
      window.removeEventListener('resize', recenter)
    }
  }, [])

  // 데스크톱 마우스 드래그 스와이프 (터치는 네이티브 스크롤이 처리)
  // 포인터 캡처는 "실제로 움직였을 때"만 걸어 클릭(카드 확장) 이벤트를 절대 가로채지 않게 함
  const onPointerDown = (e) => {
    interactingRef.current = true
    const vp = viewportRef.current
    dragRef.current = {
      active: e.pointerType === 'mouse', // 마우스만 수동 드래그
      startX: e.clientX,
      startScroll: vp ? vp.scrollLeft : 0,
      moved: false,
      captured: false,
    }
  }
  const onPointerMove = (e) => {
    const d = dragRef.current
    if (!d.active) return
    const vp = viewportRef.current
    const dx = e.clientX - d.startX
    if (Math.abs(dx) > 6) {
      d.moved = true // 클릭/드래그 구분 임계값
      if (!d.captured) {
        vp.setPointerCapture?.(e.pointerId)
        vp.style.cursor = 'grabbing'
        d.captured = true
      }
    }
    if (d.moved) vp.scrollLeft = d.startScroll - dx
  }
  const endPointer = (e) => {
    interactingRef.current = false
    const d = dragRef.current
    if (d.active) {
      d.active = false
      const vp = viewportRef.current
      if (d.captured) {
        vp.style.cursor = 'grab'
        vp.releasePointerCapture?.(e.pointerId)
      }
    }
  }

  return (
    <section className={styles.section} id="products">
      <div className="container">
        <h2 className={styles.title}>
          유니드컴즈가 만드는 것,{' '}
          <br className={styles.mBreak} />더 나은 일의 방식
        </h2>
      </div>

      {/* 자동 흐름 + 좌우 스와이프(드래그) · hover/탭 시 정지 · 카드 클릭 시 확장 */}
      <div
        className={styles.marquee}
        ref={viewportRef}
        onPointerEnter={(e) => {
          if (e.pointerType !== 'touch') setHovering(true)
        }}
        onPointerLeave={(e) => {
          if (e.pointerType !== 'touch') setHovering(false)
        }}
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={endPointer}
        onPointerCancel={endPointer}
        onClick={() => {
          // 드래그(스와이프) 후의 클릭은 무시
          if (dragRef.current.moved) return
          setActiveId(null)
          setTapPaused(false)
        }}
        role="group"
        aria-label="제품 목록"
      >
        <div className={styles.track}>
          {loop.map((p, i) => {
            const active = activeId === p.id
            return (
              <article
                key={i}
                className={`${styles.card} ${active ? styles.cardActive : ''}`}
                style={p.accent ? { '--accent': p.accent } : undefined}
                onClick={(e) => {
                  e.stopPropagation()
                  if (dragRef.current.moved) return // 스와이프 후 클릭 방지
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
                    draggable="false"
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
