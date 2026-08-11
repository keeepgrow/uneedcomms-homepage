import { useEffect, useMemo, useRef } from 'react'
import { Canvas, useFrame, useThree, extend } from '@react-three/fiber'
import { Effects } from '@react-three/drei'
import { UnrealBloomPass } from 'three-stdlib'
import { createNoise3D } from 'simplex-noise'
import * as THREE from 'three'

extend({ UnrealBloomPass })

function mulberry32(a) {
  return function () {
    a |= 0
    a = (a + 0x6d2b79f5) | 0
    let t = Math.imul(a ^ (a >>> 15), 1 | a)
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296
  }
}

const vertexShader = /* glsl */ `
  uniform float uTime;
  uniform float uSize;
  uniform vec2 uMouse;    // NDC (-1..1)
  uniform float uAspect;
  uniform float uActive;  // 커서가 히어로 안에 있으면 1
  attribute vec3 aStart;
  attribute float aDelay;
  attribute vec3 aColor;
  attribute float aRadius;  // 소용돌이 속도용 반경
  varying vec3 vColor;
  varying float vT;
  void main() {
    float dur = 2.4;
    float t = clamp((uTime - aDelay) / dur, 0.0, 1.0);
    float e = 1.0 - pow(1.0 - t, 3.0);           // easeOutCubic

    // 소용돌이: 안쪽일수록 빠르게 중심을 돎 (차등 회전)
    float sw = uTime * (0.3 / (aRadius + 0.4));
    float cs = cos(sw);
    float sn = sin(sw);
    vec3 disc = vec3(
      position.x * cs - position.y * sn,
      position.x * sn + position.y * cs,
      position.z
    );

    vec3 pos = mix(aStart, disc, e);
    vColor = aColor;
    vT = t;

    vec4 mv = modelViewMatrix * vec4(pos, 1.0);

    // ── 커서 충돌 → 파편화(부스러짐) ──────────────
    vec4 clip0 = projectionMatrix * mv;
    vec2 ndc = clip0.xy / clip0.w;
    vec2 diff = ndc - uMouse;
    diff.x *= uAspect;
    float infl = smoothstep(0.24, 0.0, length(diff)) * uActive * e;
    if (infl > 0.0) {
      float rj = fract(sin(aDelay * 91.7) * 4398.5453);
      vec2 pushDir = normalize(diff + 0.0001);
      vec2 jdir = vec2(cos(rj * 6.2831), sin(rj * 6.2831));
      mv.xy += (pushDir * 0.85 + jdir * 0.6) * infl * 1.1; // 밀어내기 + 흩뿌림
      mv.z += (rj - 0.5) * infl * 1.6;
    }

    gl_PointSize = uSize * (260.0 / -mv.z) * (0.4 + 0.6 * e);
    gl_Position = projectionMatrix * mv;
  }
`

const fragmentShader = /* glsl */ `
  precision mediump float;
  varying vec3 vColor;
  varying float vT;
  void main() {
    vec2 uv = gl_PointCoord - 0.5;
    float d = length(uv);
    float a = smoothstep(0.5, 0.0, d);
    gl_FragColor = vec4(vColor, a * (0.35 + 0.65 * vT));
  }
`

function Ring() {
  const ref = useRef()
  const matRef = useRef()
  const { gl, size } = useThree()
  const COUNT = 75000

  const { targets, starts, delays, colors, radii } = useMemo(() => {
    const rand = mulberry32(20240811)
    const noise3D = createNoise3D(rand)

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
      const inv = 1 / (2 * e)
      return [
        (yp[2] - ym[2] - (zp[1] - zm[1])) * inv,
        (zp[0] - zm[0] - (xp[2] - xm[2])) * inv,
        (xp[1] - xm[1] - (yp[0] - ym[0])) * inv,
      ]
    }

    // 소용돌이 팔레트: 안쪽 골드/오렌지/핑크 → 바깥 블루/퍼플
    const HOT = new THREE.Color('#fff0d2') // 화이트-핫(안쪽 링)
    const GOLD = new THREE.Color('#f6a81e')
    const ORANGE = new THREE.Color('#f0673a')
    const PINK = new THREE.Color('#e0468e')
    const WHITE = new THREE.Color('#fbf3e6')
    const BLUE = new THREE.Color('#3aa0e6')
    const PURPLE = new THREE.Color('#6a4fd0')

    const tgt = new Float32Array(COUNT * 3)
    const st = new Float32Array(COUNT * 3)
    const dl = new Float32Array(COUNT)
    const col = new Float32Array(COUNT * 3)
    const rad = new Float32Array(COUNT)
    const TAU = Math.PI * 2
    const tmp = new THREE.Color()

    const rMin = 1.05 // 블랙홀 공백 반경
    const rMax = 4.4

    for (let i = 0; i < COUNT; i++) {
      // 일부는 프레임 밖까지 뻗는 '긴 스위핑 팔' (웅장한 광활함)
      const isStreamer = rand() < 0.17
      const r = isStreamer
        ? rMin + Math.pow(rand(), 0.7) * (8.5 - rMin)
        : rMin + Math.pow(rand(), 2.1) * (rMax - rMin)
      const tf = Math.min(1, (r - rMin) / (rMax - rMin)) // 색/두께 정규화
      // 로그 나선 감김(스트릭) + 얇은 반경 산포
      const a0 = rand() * TAU
      const ang = a0 + 2.4 * Math.log(r + 0.4)
      const rr = r + (rand() - 0.5) * (0.06 + tf * 0.55)
      let tx = Math.cos(ang) * rr
      let ty = Math.sin(ang) * rr
      // 볼륨 두께(가우시안): 안쪽 두툼, 스트리머는 얇게 → 입체감
      const zAmp = isStreamer ? 0.07 : 0.16 + 0.34 * (1.0 - tf)
      let tz = (rand() + rand() + rand() - 1.5) * zAmp

      // curl 노이즈로 유기적 결/솜털
      const c = curl(tx * 0.5, ty * 0.5, tz * 0.5)
      const wisp = 0.12
      tx += c[0] * wisp
      ty += c[1] * wisp
      tz += c[2] * wisp

      tgt[i * 3] = tx
      tgt[i * 3 + 1] = ty
      tgt[i * 3 + 2] = tz
      rad[i] = r

      // 시작점: 사방 먼 곳에서 날아옴
      const su = rand() * 2 - 1
      const sth = rand() * TAU
      const ss = Math.sqrt(1 - su * su)
      const sR = 7 + rand() * 7
      st[i * 3] = ss * Math.cos(sth) * sR
      st[i * 3 + 1] = ss * Math.sin(sth) * sR
      st[i * 3 + 2] = su * sR

      // 스태거 지연
      dl[i] = rand() * 1.3

      // 색: 안쪽 화이트-핫/골드 → 핑크/퍼플 → 바깥 블루
      if (tf < 0.13) {
        tmp.copy(rand() < 0.55 ? HOT : GOLD)
      } else if (tf < 0.34) {
        const p = rand()
        tmp.copy(p < 0.4 ? GOLD : p < 0.75 ? ORANGE : PINK)
      } else if (tf < 0.62) {
        const p = rand()
        tmp.copy(p < 0.4 ? PINK : p < 0.7 ? PURPLE : WHITE)
      } else {
        tmp.copy(rand() < 0.62 ? BLUE : PURPLE)
      }
      const bright = (isStreamer ? 0.6 : 1.6) - tf * 0.9 // 안쪽 매우 밝게
      col[i * 3] = Math.min(1, tmp.r * bright)
      col[i * 3 + 1] = Math.min(1, tmp.g * bright)
      col[i * 3 + 2] = Math.min(1, tmp.b * bright)
    }
    return { targets: tgt, starts: st, delays: dl, colors: col, radii: rad }
  }, [])

  const uniforms = useMemo(
    () => ({
      uTime: { value: 0 },
      uSize: { value: 0.05 },
      uMouse: { value: new THREE.Vector2(10, 10) }, // 초기값 화면 밖
      uAspect: { value: 1 },
      uActive: { value: 0 },
    }),
    [],
  )

  // 윈도우 마우스 → 캔버스 기준 NDC (canvas는 pointer-events:none여도 동작)
  useEffect(() => {
    const el = gl.domElement
    const onMove = (e) => {
      const r = el.getBoundingClientRect()
      const nx = ((e.clientX - r.left) / r.width) * 2 - 1
      const ny = -(((e.clientY - r.top) / r.height) * 2 - 1)
      uniforms.uMouse.value.set(nx, ny)
      const inside =
        e.clientX >= r.left && e.clientX <= r.right && e.clientY >= r.top && e.clientY <= r.bottom
      uniforms.uActive.value = inside ? 1 : 0
    }
    const onLeave = () => (uniforms.uActive.value = 0)
    window.addEventListener('mousemove', onMove)
    window.addEventListener('mouseout', onLeave)
    return () => {
      window.removeEventListener('mousemove', onMove)
      window.removeEventListener('mouseout', onLeave)
    }
  }, [gl, uniforms])

  useFrame((state, delta) => {
    uniforms.uTime.value += delta
    uniforms.uAspect.value = size.width / size.height
    // 소용돌이는 셰이더에서 처리 — 그룹은 정면(살짝 틸트)으로 미세 드리프트만
    if (ref.current) {
      ref.current.rotation.z = Math.sin(state.clock.elapsedTime * 0.05) * 0.04
    }
  })

  return (
    <group ref={ref} rotation={[0.1, 0, 0]}>
      <points>
        <bufferGeometry>
          <bufferAttribute attach="attributes-position" args={[targets, 3]} />
          <bufferAttribute attach="attributes-aStart" args={[starts, 3]} />
          <bufferAttribute attach="attributes-aDelay" args={[delays, 1]} />
          <bufferAttribute attach="attributes-aColor" args={[colors, 3]} />
          <bufferAttribute attach="attributes-aRadius" args={[radii, 1]} />
        </bufferGeometry>
        <shaderMaterial
          ref={matRef}
          uniforms={uniforms}
          vertexShader={vertexShader}
          fragmentShader={fragmentShader}
          transparent
          depthWrite={false}
          blending={THREE.AdditiveBlending}
        />
      </points>
    </group>
  )
}

// 배경 별 (은은한 성긴 별 + 드문드문 큰 별로 두 레이어)
function Stars() {
  const ref = useRef()
  const layers = useMemo(() => {
    const rand = mulberry32(77)
    const build = (N, spreadZ) => {
      const pos = new Float32Array(N * 3)
      const col = new Float32Array(N * 3)
      for (let i = 0; i < N; i++) {
        const r = 15 + rand() * 30
        const phi = Math.acos(2 * rand() - 1)
        const theta = 2 * Math.PI * rand()
        pos[i * 3] = r * Math.sin(phi) * Math.cos(theta)
        pos[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta)
        pos[i * 3 + 2] = r * Math.cos(phi) - spreadZ
        // 대부분 흰색, 일부 골드/블루 별
        const t = rand()
        const b = 0.45 + rand() * 0.55
        let cr = 1
        let cg = 1
        let cb = 1
        if (t < 0.18) {
          cr = 0.62
          cg = 0.72
          cb = 1
        } else if (t < 0.28) {
          cr = 1
          cg = 0.82
          cb = 0.5
        }
        col[i * 3] = cr * b
        col[i * 3 + 1] = cg * b
        col[i * 3 + 2] = cb * b
      }
      return { pos, col }
    }
    return { far: build(1300, 10), near: build(160, 6) }
  }, [])

  // 아주 천천히 회전(패럴랙스 느낌)
  useFrame((_, delta) => {
    if (ref.current) ref.current.rotation.y += delta * 0.006
  })

  return (
    <group ref={ref}>
      <points>
        <bufferGeometry>
          <bufferAttribute attach="attributes-position" args={[layers.far.pos, 3]} />
          <bufferAttribute attach="attributes-color" args={[layers.far.col, 3]} />
        </bufferGeometry>
        <pointsMaterial size={0.05} sizeAttenuation vertexColors transparent opacity={0.9} depthWrite={false} />
      </points>
      <points>
        <bufferGeometry>
          <bufferAttribute attach="attributes-position" args={[layers.near.pos, 3]} />
          <bufferAttribute attach="attributes-color" args={[layers.near.col, 3]} />
        </bufferGeometry>
        <pointsMaterial size={0.11} sizeAttenuation vertexColors transparent opacity={0.95} depthWrite={false} />
      </points>
    </group>
  )
}

// 부드러운 방사 글로우 텍스처
function makeGlow() {
  const c = document.createElement('canvas')
  c.width = c.height = 128
  const g = c.getContext('2d')
  const grd = g.createRadialGradient(64, 64, 0, 64, 64, 64)
  grd.addColorStop(0, 'rgba(255,255,255,0.9)')
  grd.addColorStop(0.25, 'rgba(255,255,255,0.35)')
  grd.addColorStop(1, 'rgba(255,255,255,0)')
  g.fillStyle = grd
  g.fillRect(0, 0, 128, 128)
  return new THREE.CanvasTexture(c)
}

// 배경 성운 글로우 — 대기감/깊이(웅장함)
function Nebula() {
  const tex = useMemo(() => makeGlow(), [])
  const common = {
    transparent: true,
    depthWrite: false,
    blending: THREE.AdditiveBlending,
  }
  return (
    <group>
      <sprite position={[0, 0, -5]} scale={[20, 20, 1]}>
        <spriteMaterial map={tex} color="#242a6e" opacity={0.5} {...common} />
      </sprite>
      <sprite position={[-2.5, 1.2, -3.5]} scale={[11, 11, 1]}>
        <spriteMaterial map={tex} color="#5a3aa0" opacity={0.35} {...common} />
      </sprite>
      <sprite position={[2.8, -1.6, -4]} scale={[12, 12, 1]}>
        <spriteMaterial map={tex} color="#1d5a9a" opacity={0.32} {...common} />
      </sprite>
    </group>
  )
}

export default function ParticleRing() {
  return (
    <Canvas
      camera={{ position: [0, 0, 5.7], fov: 60 }}
      dpr={[1, 1.5]}
      gl={{ antialias: true, powerPreference: 'high-performance' }}
    >
      <color attach="background" args={['#000005']} />
      <Nebula />
      <Stars />
      <Ring />
      <Effects disableGamma>
        <unrealBloomPass threshold={0.08} strength={0.95} radius={0.62} />
      </Effects>
    </Canvas>
  )
}
