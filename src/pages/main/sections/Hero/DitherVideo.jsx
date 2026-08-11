import { useEffect, useRef } from 'react'
import styles from './Hero.module.css'

// 4x4 Bayer (디더 지터)
const BAYER = [
  [0, 8, 2, 10],
  [12, 4, 14, 6],
  [3, 11, 1, 9],
  [15, 7, 13, 5],
]

const ss = (a, b, x) => {
  const t = Math.min(1, Math.max(0, (x - a) / (b - a)))
  return t * t * (3 - 2 * t)
}

// 원본 영상을 베이스로 깔고, 밝기 중간대(전환 영역)에만 점묘(도트)를 오버레이.
// 밝고 매끈한 코어/딥다크는 도트 없이 원본이 그대로 보임 (샘플 참고).
export default function DitherVideo({ src }) {
  const canvasRef = useRef(null)
  const videoRef = useRef(null)

  useEffect(() => {
    const canvas = canvasRef.current
    const video = videoRef.current
    if (!canvas || !video) return
    const ctx = canvas.getContext('2d')

    const sample = document.createElement('canvas')
    const sctx = sample.getContext('2d', { willReadFrequently: true })

    const CELL = 6 // 점 간격(px)
    const R = CELL * 0.66 // 최대 점 반경
    let cols = 0
    let rows = 0
    let W = 0
    let H = 0

    const resize = () => {
      const parent = canvas.parentElement
      if (!parent) return
      W = parent.clientWidth
      H = parent.clientHeight
      canvas.width = W
      canvas.height = H
      cols = Math.max(1, Math.ceil(W / CELL))
      rows = Math.max(1, Math.ceil(H / CELL))
      sample.width = cols
      sample.height = rows
    }
    resize()
    window.addEventListener('resize', resize)

    let raf = 0
    let last = 0
    const render = (t) => {
      raf = requestAnimationFrame(render)
      if (t - last < 33) return // ~30fps
      last = t
      if (video.readyState < 2 || cols === 0) return

      // 베이스: 원본 영상 (밝은 코어가 매끈하게 비침)
      ctx.drawImage(video, 0, 0, W, H)

      // 다운샘플 후 밝기 중간대에만 도트
      sctx.drawImage(video, 0, 0, cols, rows)
      const data = sctx.getImageData(0, 0, cols, rows).data
      const half = CELL / 2

      for (let y = 0; y < rows; y++) {
        for (let x = 0; x < cols; x++) {
          const i = (y * cols + x) * 4
          const r = data[i]
          const g = data[i + 1]
          const b = data[i + 2]
          const v = Math.max(r, g, b) / 255
          // 중간 밝기에서만 도트가 보이고, 밝은코어/딥다크는 비움 → 원본 노출
          const band = ss(0.1, 0.35, v) * (1 - ss(0.62, 0.9, v))
          if (band < 0.1) continue

          // 크기: 밝을수록 크게 + 밴드 강할수록 크게
          let rad = R * (0.3 + 0.7 * v) * (0.55 + 0.45 * band)
          rad += (BAYER[y & 3][x & 3] / 16 - 0.5) * 0.5
          if (rad < 0.4) continue

          // 투명도: 밝을수록 / 밴드 강할수록 진하게 (어두운 곳은 옅게)
          const a = Math.min(1, 0.18 + 0.95 * band * (0.4 + 0.6 * v))

          // 원본보다 밝게
          const cr = Math.min(255, r * 1.5 + 85) | 0
          const cg = Math.min(255, g * 1.5 + 85) | 0
          const cb = Math.min(255, b * 1.5 + 95) | 0
          ctx.fillStyle = `rgba(${cr},${cg},${cb},${a})`
          ctx.beginPath()
          ctx.arc(x * CELL + half, y * CELL + half, rad, 0, 6.2832)
          ctx.fill()
        }
      }
    }

    const play = () => video.play().catch(() => {})
    video.addEventListener('loadeddata', () => {
      resize()
      play()
    })
    play()
    raf = requestAnimationFrame(render)

    return () => {
      cancelAnimationFrame(raf)
      window.removeEventListener('resize', resize)
    }
  }, [src])

  return (
    <>
      <video
        ref={videoRef}
        src={src}
        autoPlay
        loop
        muted
        playsInline
        preload="auto"
        className={styles.hiddenVideo}
      />
      <canvas ref={canvasRef} className={styles.dither} />
    </>
  )
}
