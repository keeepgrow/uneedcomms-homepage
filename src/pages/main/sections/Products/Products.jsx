import { useEffect, useRef, useState } from 'react'
import { products } from '../../../../data/products.js'
import styles from './Products.module.css'

// 화면이 한 벌 폭보다 넓어도 이음새 없이 순환하도록 넉넉히 복제
const COPIES = 4

export default function Products() {
  // 데스크톱 hover, 모바일 탭 토글, 카드 확장 상태
  const [hovering, setHovering] = useState(false)
  const [tapPaused, setTapPaused] = useState(false)
  const [activeId, setActiveId] = useState(null)

  // 무한 흐름/드래그 제어 refs
  const viewportRef = useRef(null)
  const trackRef = useRef(null)
  const offsetRef = useRef(0) // 누적 스크롤량(px). 표시 시 한 벌 폭으로 모듈러 처리
  const setWidthRef = useRef(0) // 한 벌(제품 전체) 폭
  const pausedRef = useRef(false)
  const dragRef = useRef({ active: false, axis: null, startX: 0, startY: 0, startOffset: 0, moved: false, captured: false })
  const snapRef = useRef(null) // 스와이프 종료 후 카드 경계로 튕겨 정렬하는 트윈

  const loop = []
  for (let c = 0; c < COPIES; c++) loop.push(...products)

  // 자동 흐름 일시정지 조건(hover · 탭정지 · 카드확장) 동기화
  useEffect(() => {
    pausedRef.current = hovering || tapPaused || activeId !== null
  }, [hovering, tapPaused, activeId])

  // transform + 모듈러 기반의 진짜 무한 루프 (좌로 흐름, 양방향 스와이프)
  useEffect(() => {
    const track = trackRef.current
    if (!track) return

    const measure = () => {
      setWidthRef.current = track.scrollWidth / COPIES
    }
    measure()

    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    let raf
    let last = null
    const step = (t) => {
      if (last == null) last = t
      const dt = t - last
      last = t
      const sw = setWidthRef.current
      if (sw > 0) {
        const anim = snapRef.current
        if (anim) {
          // 카드 경계로 부드럽게 스냅 (easeOutCubic)
          anim.elapsed += dt
          const p = Math.min(1, anim.elapsed / anim.dur)
          const e = 1 - Math.pow(1 - p, 3)
          offsetRef.current = anim.from + (anim.to - anim.from) * e
          if (p >= 1) snapRef.current = null
        } else if (!reduce && !pausedRef.current && !dragRef.current.active) {
          // 기존 마퀴와 동일한 페이스(한 벌 42초)
          offsetRef.current += (sw / 42) * (dt / 1000)
        }
        // 한 벌 폭으로 모듈러 → 무한 순환 (음수 드래그도 정상 래핑)
        const m = ((offsetRef.current % sw) + sw) % sw
        track.style.transform = `translate3d(${-m}px, 0, 0)`
      }
      raf = requestAnimationFrame(step)
    }
    raf = requestAnimationFrame(step)
    window.addEventListener('resize', measure)
    return () => {
      cancelAnimationFrame(raf)
      window.removeEventListener('resize', measure)
    }
  }, [])

  // 좌우 스와이프(드래그) — 마우스/터치 공통, 수직 제스처는 페이지 스크롤에 양보
  const onPointerDown = (e) => {
    snapRef.current = null // 진행 중이던 스냅 취소
    const d = dragRef.current
    d.active = true
    d.axis = null
    d.moved = false
    d.captured = false
    d.startX = e.clientX
    d.startY = e.clientY
    d.startOffset = offsetRef.current
  }
  const onPointerMove = (e) => {
    const d = dragRef.current
    if (!d.active) return
    const dx = e.clientX - d.startX
    const dy = e.clientY - d.startY
    if (!d.axis) {
      if (Math.abs(dx) < 6 && Math.abs(dy) < 6) return // 임계값 전까진 판정 보류
      d.axis = Math.abs(dx) >= Math.abs(dy) ? 'x' : 'y'
      if (d.axis === 'y') {
        // 수직 스와이프 → 우리 드래그 종료, 브라우저 페이지 스크롤에 양보
        d.active = false
        return
      }
      d.moved = true
      const vp = viewportRef.current
      vp.setPointerCapture?.(e.pointerId)
      vp.style.cursor = 'grabbing'
      d.captured = true
    }
    if (d.axis === 'x') offsetRef.current = d.startOffset - dx
  }
  const endPointer = (e) => {
    const d = dragRef.current
    if (d.captured) {
      const vp = viewportRef.current
      vp.style.cursor = 'grab'
      vp.releasePointerCapture?.(e.pointerId)
    }
    // 스와이프 종료 → 가장 가까운 카드 경계로 딱 스냅
    if (d.moved) {
      const cardStep = setWidthRef.current / products.length
      if (cardStep > 0) {
        const target = Math.round(offsetRef.current / cardStep) * cardStep
        snapRef.current = { from: offsetRef.current, to: target, dur: 340, elapsed: 0 }
      }
    }
    d.active = false
  }

  // 카드 밖(섹션 여백·갤러리 빈 곳) 클릭 → 확장 닫고 자동 흐름 재개
  const onBackgroundClick = () => {
    if (dragRef.current.moved) return // 스와이프 직후 클릭은 무시
    setActiveId(null)
    setTapPaused(false)
  }

  return (
    <section className={styles.section} id="products" onClick={onBackgroundClick}>
      <div className="container">
        <h2 className={styles.title}>
          유니드컴즈가 만드는 것,{' '}
          <br className={styles.mBreak} />더 나은 일의 방식
        </h2>
      </div>

      {/* 자동 무한 흐름 + 좌우 스와이프 · hover/탭 시 정지 · 카드 클릭 시 확장 */}
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
        role="group"
        aria-label="제품 목록"
      >
        <div className={styles.track} ref={trackRef}>
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
