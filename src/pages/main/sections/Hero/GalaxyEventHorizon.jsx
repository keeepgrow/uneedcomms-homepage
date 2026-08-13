import { useEffect, useRef } from 'react'
import styles from './GalaxyEventHorizon.module.css'

// GalaxyJS UMD (self-host). eventHorizon은 런타임에 three.js를 CDN에서 동적 로드.
const GALAXY_SRC = `${import.meta.env.BASE_URL}vendor/galaxy.js`

function loadGalaxy() {
  if (typeof window === 'undefined') return Promise.reject(new Error('no window'))
  if (window.Galaxy) return Promise.resolve(window.Galaxy)
  if (window.__galaxyLoading) return window.__galaxyLoading
  window.__galaxyLoading = new Promise((resolve, reject) => {
    const s = document.createElement('script')
    s.src = GALAXY_SRC
    s.async = true
    s.onload = () => resolve(window.Galaxy)
    s.onerror = () => reject(new Error('GalaxyJS load failed'))
    document.head.appendChild(s)
  })
  return window.__galaxyLoading
}

export default function GalaxyEventHorizon() {
  const ref = useRef(null)

  useEffect(() => {
    let instance
    let cancelled = false

    // 오버레이(텍스트/커서)가 마우스를 가로채도 eventHorizon이 틸트 반응하도록
    // 윈도우 전역 마우스 이동을 호스트 el로 재전달한다.
    const forward = (e) => {
      const el = ref.current
      if (!el) return
      el.dispatchEvent(
        new PointerEvent('pointermove', {
          clientX: e.clientX,
          clientY: e.clientY,
          bubbles: true,
        }),
      )
    }

    loadGalaxy()
      .then((Galaxy) => {
        if (cancelled || !Galaxy || !ref.current) return
        instance = Galaxy.create('eventHorizon', ref.current, {
          speed: 3,
          // 기존 파티클 팔레트: 화이트핫 → 골드 → 블루 (안쪽 밝은 링 → 바깥 블루)
          colors: ['#fff3d8', '#f4a828', '#4a78d8'],
          interactive: true, // 마우스 위치에 따라 카메라 틸트(렌징 비대칭)
        })
        window.addEventListener('mousemove', forward, { passive: true })
      })
      .catch(() => {})

    return () => {
      cancelled = true
      window.removeEventListener('mousemove', forward)
      try {
        instance?.destroy?.()
        instance?.dispose?.()
        instance?.stop?.()
      } catch {
        /* noop */
      }
      if (ref.current) ref.current.innerHTML = ''
    }
  }, [])

  return <div ref={ref} className={styles.host} />
}
