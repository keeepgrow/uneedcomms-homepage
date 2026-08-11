import { useEffect, useRef } from 'react'
import styles from './Hero.module.css'

// 밝기(어두움→밝음) → 문자 램프
const RAMP = ' .:oxX6V0#@'
// smoothstep
const ss = (a, b, x) => {
  const t = Math.min(1, Math.max(0, (x - a) / (b - a)))
  return t * t * (3 - 2 * t)
}

// 셀 고정 의사난수 (확률적 산포 = 부스러지는 질감)
const hash = (x, y) => {
  const v = Math.sin(x * 127.1 + y * 311.7) * 43758.5453
  return v - Math.floor(v)
}

// 영상 프레임을 실시간 ASCII + 디더링으로 렌더링하는 배경
export default function AsciiVideo({ src }) {
  const canvasRef = useRef(null)
  const videoRef = useRef(null)

  useEffect(() => {
    const canvas = canvasRef.current
    const video = videoRef.current
    if (!canvas || !video) return
    const ctx = canvas.getContext('2d')

    // 다운샘플용 소형 캔버스
    const sample = document.createElement('canvas')
    const sctx = sample.getContext('2d', { willReadFrequently: true })

    const CELL = 9 // 문자 셀 크기(px)
    const levels = RAMP.length
    let cols = 0
    let rows = 0
    let W = 0
    let H = 0
    let val = new Float32Array(1) // value(밝기) 그리드

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
      val = new Float32Array(cols * rows)
      ctx.font = `${CELL + 1}px "Courier New", ui-monospace, monospace`
      ctx.textBaseline = 'top'
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

      // 베이스: 원본 영상을 그대로 깔아 밝은 중심부가 비치게(clear)
      ctx.drawImage(video, 0, 0, W, H)

      // 영상 → 격자 해상도로 다운샘플 (ASCII 오버레이용)
      sctx.drawImage(video, 0, 0, cols, rows)
      const data = sctx.getImageData(0, 0, cols, rows).data

      // value(밝기, max 채널) 그리드 선계산 — 붉은 코어도 밝게 잡히도록
      for (let k = 0; k < cols * rows; k++) {
        const j = k * 4
        let m = data[j]
        if (data[j + 1] > m) m = data[j + 1]
        if (data[j + 2] > m) m = data[j + 2]
        val[k] = m / 255
      }

      for (let y = 0; y < rows; y++) {
        for (let x = 0; x < cols; x++) {
          const k = y * cols + x
          const v = val[k]
          // 이웃과의 차이(엣지) — 경계에서 문자가 집중되어 부서지는 느낌
          const vL = x > 0 ? val[k - 1] : v
          const vU = y > 0 ? val[k - cols] : v
          const edge = Math.abs(v - vL) + Math.abs(v - vU)
          // 밝기 중간대(프린지)에서만, 그리고 엣지에 가중
          const band = ss(0.12, 0.42, v) * (1 - ss(0.58, 0.9, v))
          let p = band * (0.18 + edge * 4.2)
          if (p > 1) p = 1
          // 확률적 산포: 셀 고정 난수가 p보다 크면 비움 → 불규칙 파편
          if (hash(x, y) > p) continue

          let idx = Math.round(v * (levels - 1))
          if (idx < 1) idx = 1
          else if (idx > levels - 1) idx = levels - 1

          const i = k * 4
          const cr = Math.min(255, data[i] * 1.7 + 60) | 0
          const cg = Math.min(255, data[i + 1] * 1.7 + 60) | 0
          const cb = Math.min(255, data[i + 2] * 1.7 + 70) | 0
          ctx.fillStyle = `rgb(${cr},${cg},${cb})`
          ctx.fillText(RAMP[idx], x * CELL, y * CELL)
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
      <canvas ref={canvasRef} className={styles.asciiCanvas} />
    </>
  )
}
