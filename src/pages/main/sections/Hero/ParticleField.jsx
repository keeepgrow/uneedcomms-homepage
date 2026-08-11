import { useMemo, useRef } from 'react'
import { Canvas, useFrame, extend } from '@react-three/fiber'
import { Effects } from '@react-three/drei'
import { UnrealBloomPass } from 'three-stdlib'
import { createNoise3D } from 'simplex-noise'
import * as THREE from 'three'

extend({ UnrealBloomPass })

// 결정론적 PRNG
function mulberry32(a) {
  return function () {
    a |= 0
    a = (a + 0x6d2b79f5) | 0
    let t = Math.imul(a ^ (a >>> 15), 1 | a)
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296
  }
}

// usta.agency 풍: curl-noise 흐름선(filament) 파티클 클라우드
// 둥근 소프트 도트 스프라이트 텍스처
function makeDotTexture() {
  const c = document.createElement('canvas')
  c.width = c.height = 64
  const g = c.getContext('2d')
  const grd = g.createRadialGradient(32, 32, 0, 32, 32, 32)
  grd.addColorStop(0, 'rgba(255,255,255,1)')
  grd.addColorStop(0.35, 'rgba(255,255,255,0.85)')
  grd.addColorStop(1, 'rgba(255,255,255,0)')
  g.fillStyle = grd
  g.beginPath()
  g.arc(32, 32, 32, 0, Math.PI * 2)
  g.fill()
  const t = new THREE.CanvasTexture(c)
  return t
}

function Cloud() {
  const ref = useRef()
  const COUNT = 26000
  const dot = useMemo(() => makeDotTexture(), [])

  const { positions, colors } = useMemo(() => {
    const rand = mulberry32(20240811)
    const noise3D = createNoise3D(rand)

    // 3D 포텐셜 벡터장 → curl
    const pot = (x, y, z) => [
      noise3D(x, y, z),
      noise3D(x + 41.7, y + 13.2, z + 7.9),
      noise3D(x - 23.1, y + 31.5, z - 17.3),
    ]
    const e = 0.1
    const curl = (x, y, z) => {
      const yp = pot(x, y + e, z)
      const ym = pot(x, y - e, z)
      const zp = pot(x, y, z + e)
      const zm = pot(x, y, z - e)
      const xp = pot(x + e, y, z)
      const xm = pot(x - e, y, z)
      const cx = yp[2] - ym[2] - (zp[1] - zm[1])
      const cy = zp[0] - zm[0] - (xp[2] - xm[2])
      const cz = xp[1] - xm[1] - (yp[0] - ym[0])
      const inv = 1 / (2 * e)
      return [cx * inv, cy * inv, cz * inv]
    }

    // 팔레트 (usta 번들에서 추출)
    const GOLD = new THREE.Color('#f48c18')
    const GOLD2 = new THREE.Color('#EC9354')
    const BLUE = new THREE.Color('#2FA1D6')
    const WHITE = new THREE.Color('#f2ede2')
    const TAN = new THREE.Color('#c5bdad')

    const pos = new Float32Array(COUNT * 3)
    const col = new Float32Array(COUNT * 3)
    const TAU = Math.PI * 2
    const tmp = new THREE.Color()

    for (let i = 0; i < COUNT; i++) {
      // 길쭉한 타원 내부에 시드 (중심으로 갈수록 조밀)
      const u = rand() * 2 - 1
      const th = rand() * TAU
      const s = Math.sqrt(1 - u * u)
      const radBase = Math.pow(rand(), 0.62)
      let px = s * Math.cos(th) * radBase * 1.95
      let py = s * Math.sin(th) * radBase * 0.92
      let pz = u * radBase * 0.92

      // curl 흐름선을 따라 살짝 advect → 형태 유지하면서 결만 휘어짐
      const freq = 0.6
      const amp = 0.13
      for (let k = 0; k < 4; k++) {
        const c = curl(px * freq + 5.2, py * freq, pz * freq)
        px += c[0] * amp
        py += c[1] * amp
        pz += c[2] * amp
      }

      const S = 1.0
      pos[i * 3] = px * S
      pos[i * 3 + 1] = py * S
      pos[i * 3 + 2] = pz * S

      // 색: 노이즈로 골드/블루/화이트 군집 + 코어일수록 밝게
      const cn = noise3D(px * 0.12 + 10, py * 0.12, pz * 0.12) * 0.5 + 0.5
      const rNorm = Math.min(1, Math.hypot(px / 2.5, py, pz) / 1.3)
      if (cn > 0.63) tmp.copy(rand() < 0.5 ? GOLD : GOLD2)
      else if (cn < 0.4) tmp.copy(BLUE)
      else tmp.copy(rand() < 0.55 ? WHITE : TAN)
      // 코어 근처 밝게, 바깥은 살짝 어둡게
      const bright = 1.15 - rNorm * 0.5
      col[i * 3] = Math.min(1, tmp.r * bright)
      col[i * 3 + 1] = Math.min(1, tmp.g * bright)
      col[i * 3 + 2] = Math.min(1, tmp.b * bright)
    }
    return { positions: pos, colors: col }
  }, [])

  useFrame((state, delta) => {
    if (!ref.current) return
    ref.current.rotation.y += delta * 0.1
    ref.current.rotation.z = 0.28 + Math.sin(state.clock.elapsedTime * 0.08) * 0.05
  })

  return (
    <group ref={ref} rotation={[0.35, 0, 0.28]}>
      <points>
        <bufferGeometry>
          <bufferAttribute attach="attributes-position" args={[positions, 3]} />
          <bufferAttribute attach="attributes-color" args={[colors, 3]} />
        </bufferGeometry>
        <pointsMaterial
          map={dot}
          size={0.05}
          sizeAttenuation
          vertexColors
          transparent
          opacity={0.95}
          depthWrite={false}
          blending={THREE.AdditiveBlending}
        />
      </points>

      {/* 밝은 코어 "눈" */}
      <mesh position={[-0.7, 0.1, 0.3]}>
        <sphereGeometry args={[0.06, 16, 16]} />
        <meshBasicMaterial color="#ffffff" />
      </mesh>
    </group>
  )
}

function Stars() {
  const { positions, colors } = useMemo(() => {
    const rand = mulberry32(77)
    const N = 800
    const pos = new Float32Array(N * 3)
    const col = new Float32Array(N * 3)
    const c1 = new THREE.Color('#9fb4ff')
    for (let i = 0; i < N; i++) {
      const r = 14 + rand() * 26
      const phi = Math.acos(2 * rand() - 1)
      const theta = 2 * Math.PI * rand()
      pos[i * 3] = r * Math.sin(phi) * Math.cos(theta)
      pos[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta)
      pos[i * 3 + 2] = r * Math.cos(phi) - 8
      const b = 0.35 + rand() * 0.6
      const c = rand() < 0.3 ? c1 : { r: 1, g: 1, b: 1 }
      col[i * 3] = c.r * b
      col[i * 3 + 1] = c.g * b
      col[i * 3 + 2] = c.b * b
    }
    return { positions: pos, colors: col }
  }, [])

  return (
    <points>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
        <bufferAttribute attach="attributes-color" args={[colors, 3]} />
      </bufferGeometry>
      <pointsMaterial size={0.05} sizeAttenuation vertexColors transparent opacity={0.9} depthWrite={false} />
    </points>
  )
}

export default function ParticleField() {
  return (
    <Canvas
      camera={{ position: [0, 0, 6], fov: 55 }}
      dpr={[1, 1.5]}
      gl={{ antialias: true, powerPreference: 'high-performance' }}
    >
      <color attach="background" args={['#000005']} />
      <Stars />
      <Cloud />
      <Effects disableGamma>
        <unrealBloomPass threshold={0.15} strength={0.65} radius={0.5} />
      </Effects>
    </Canvas>
  )
}
