import { useEffect, useMemo, useRef } from 'react'
import { Canvas, useFrame, useThree, extend } from '@react-three/fiber'
import { Effects } from '@react-three/drei'
import { UnrealBloomPass } from 'three-stdlib'
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

// 파티클이 여러 형태 사이를 부드럽게 모핑 (two-buffer lerp).
// 색상은 블랙홀 팔레트(화이트핫/골드/앰버/블루/화이트).
const vertexShader = /* glsl */ `
  uniform float uSize;
  uniform float uMorph;    // 0..1 현재 두 형태 사이 진행도
  uniform float uProgress; // 스크롤 커버 진행도 (산개/소멸)
  attribute vec3 aPosA;
  attribute vec3 aPosB;
  attribute vec3 aColor;
  attribute float aSeed;
  varying vec3 vColor;
  varying float vFade;
  const float PI = 3.14159265;
  float easeInOutCubic(float x){
    return x < 0.5 ? 4.0*x*x*x : 1.0 - pow(-2.0*x + 2.0, 3.0) / 2.0;
  }
  void main() {
    // 입자별 스태거(일부 먼저 출발) → 흐르는 듯한 모핑
    float st = aSeed * 0.32;
    float m = clamp((uMorph - st) / (1.0 - 0.32), 0.0, 1.0);
    float e = easeInOutCubic(m);
    vec3 pos = mix(aPosA, aPosB, e);

    // 모핑 중반에 유기적으로 부풀었다 모이기 (arc)
    float arc = sin(e * PI);
    vec3 adir = normalize(vec3(sin(aSeed*61.0), cos(aSeed*37.0), sin(aSeed*17.3)));
    pos += adir * arc * (0.12 + 0.5 * fract(aSeed * 13.13));

    // ── 스크롤 커버 시 바깥으로 산개 + 일부 먼저 소멸 ──
    float rr = fract(sin(aSeed * 91.7) * 4398.5453);
    float rr2 = fract(sin(aSeed * 57.31) * 434.17);
    float dp = uProgress;
    if (dp > 0.001) {
      vec3 rdir = normalize(pos + vec3(0.0001, 0.0001, 0.0001));
      vec3 jitter = vec3(cos(rr * 6.2831), sin(rr2 * 6.2831), sin(rr * 3.1415));
      pos += (rdir * 1.0 + jitter * 0.8) * dp * 5.2;
    }
    float keep = step(0.62, rr);
    float thr = mix(0.05, 0.32 + 0.46 * rr, keep);
    vFade = 1.0 - smoothstep(thr, thr + 0.18, uProgress);

    vColor = aColor;
    vec4 mv = modelViewMatrix * vec4(pos, 1.0);
    float sv = 0.5 + 1.1 * fract(sin(aSeed * 12.9898) * 43758.5453);
    float depthBoost = clamp((6.6 + mv.z) * 0.42 + 1.0, 0.4, 2.3);
    gl_PointSize = uSize * sv * depthBoost * (260.0 / -mv.z) * (1.0 - 0.72 * dp);
    gl_Position = projectionMatrix * mv;
  }
`

const fragmentShader = /* glsl */ `
  precision mediump float;
  varying vec3 vColor;
  varying float vFade;
  void main() {
    vec2 uv = gl_PointCoord - 0.5;
    float d = length(uv);
    float a = smoothstep(0.5, 0.0, d);
    gl_FragColor = vec4(vColor, a * vFade);
  }
`

const COUNT = 60000
const TAU = Math.PI * 2
const MORPH_DUR = 2.6 // 형태 전환 시간(초)
const HOLD_DUR = 1.5 // 형태 유지 시간(초)

// ── 형태 생성기들 (각각 COUNT*3 채움) ─────────────────
function fillSphere(arr, rand) {
  for (let i = 0; i < COUNT; i++) {
    const u = rand() * 2 - 1
    const th = rand() * TAU
    const s = Math.sqrt(1 - u * u)
    const R = 2.0 + (rand() - 0.5) * 0.06
    arr[i * 3] = s * Math.cos(th) * R
    arr[i * 3 + 1] = u * R
    arr[i * 3 + 2] = s * Math.sin(th) * R
  }
}
function fillGalaxy(arr, rand) {
  const arms = 4
  for (let i = 0; i < COUNT; i++) {
    const r = Math.pow(rand(), 0.7) * 2.7
    const arm = Math.floor(rand() * arms)
    const ang = (arm * TAU) / arms + r * 1.9 + (rand() - 0.5) * 0.55
    arr[i * 3] = Math.cos(ang) * r
    arr[i * 3 + 1] = (rand() - 0.5) * (0.14 * (1 - r / 3.2) + 0.03)
    arr[i * 3 + 2] = Math.sin(ang) * r
  }
}
function fillTorusKnot(arr, rand) {
  const p = 2
  const q = 3
  for (let i = 0; i < COUNT; i++) {
    const u = rand() * TAU
    const r = Math.cos(q * u) + 2
    const jx = (rand() - 0.5) * 0.16
    const jy = (rand() - 0.5) * 0.16
    const jz = (rand() - 0.5) * 0.16
    arr[i * 3] = 0.62 * (r * Math.cos(p * u)) + jx
    arr[i * 3 + 1] = 0.62 * (r * Math.sin(p * u)) + jy
    arr[i * 3 + 2] = 0.62 * (-Math.sin(q * u)) * 1.6 + jz
  }
}
function fillWave(arr, rand) {
  for (let i = 0; i < COUNT; i++) {
    const x = (rand() * 2 - 1) * 3.2
    const z = (rand() * 2 - 1) * 3.2
    arr[i * 3] = x
    arr[i * 3 + 1] = Math.sin(x * 1.3) * Math.cos(z * 1.3) * 0.6 + (rand() - 0.5) * 0.04
    arr[i * 3 + 2] = z
  }
}

function MorphPoints({ progressRef }) {
  const groupRef = useRef()
  const posARef = useRef()
  const posBRef = useRef()

  const { formations, posA, posB, colors, seeds, scatter } = useMemo(() => {
    const rand = mulberry32(20260814)

    // 형태 순서: 은하 원반 → 구 → 토러스매듭 → 파동 평면
    const gens = [fillGalaxy, fillSphere, fillTorusKnot, fillWave]
    const forms = gens.map((gen) => {
      const a = new Float32Array(COUNT * 3)
      // 각 형태는 동일 시드로 생성해 입자 대응이 일관되도록
      gen(a, mulberry32(4242))
      return a
    })

    // 시작: 넓게 흩어진 구름 → 첫 형태로 모핑
    const scat = new Float32Array(COUNT * 3)
    for (let i = 0; i < COUNT; i++) {
      const u = rand() * 2 - 1
      const th = rand() * TAU
      const s = Math.sqrt(1 - u * u)
      const R = 4.5 + Math.pow(rand(), 0.4) * 5.0
      scat[i * 3] = s * Math.cos(th) * R
      scat[i * 3 + 1] = u * R
      scat[i * 3 + 2] = s * Math.sin(th) * R
    }

    // 색: 블랙홀 팔레트 (골드 중심 + 블루 + 화이트 하이라이트)
    const HOT = new THREE.Color('#fff3d8')
    const GOLD = new THREE.Color('#f4a828')
    const AMBER = new THREE.Color('#e07d1a')
    const BLUE = new THREE.Color('#4a78d8')
    const BLUE2 = new THREE.Color('#89b0f0')
    const WHITE = new THREE.Color('#eef2f7')
    const col = new Float32Array(COUNT * 3)
    const sd = new Float32Array(COUNT)
    const tmp = new THREE.Color()
    const crand = mulberry32(7777)
    for (let i = 0; i < COUNT; i++) {
      const pp = crand()
      let bright
      if (pp < 0.1) {
        tmp.copy(HOT)
        bright = 1.3 + crand() * 0.5
      } else if (pp < 0.42) {
        tmp.copy(crand() < 0.55 ? GOLD : AMBER)
        bright = 1.0 + crand() * 0.6
      } else if (pp < 0.52) {
        tmp.copy(WHITE)
        bright = 1.1 + crand() * 0.4
      } else {
        tmp.copy(crand() < 0.6 ? BLUE : BLUE2)
        bright = 0.7 + crand() * 0.5
      }
      col[i * 3] = Math.min(1, tmp.r * bright)
      col[i * 3 + 1] = Math.min(1, tmp.g * bright)
      col[i * 3 + 2] = Math.min(1, tmp.b * bright)
      sd[i] = crand()
    }

    const pA = new Float32Array(scat) // 시작: 흩어진 구름
    const pB = new Float32Array(forms[0]) // 목표: 첫 형태
    return { formations: forms, posA: pA, posB: pB, colors: col, seeds: sd, scatter: scat }
  }, [])

  // 모핑 상태
  const stateRef = useRef({ phase: 'morph', timer: 0, target: 0, uMorph: 0 })

  const uniforms = useMemo(
    () => ({
      uSize: { value: 0.05 },
      uMorph: { value: 0 },
      uProgress: { value: 0 },
    }),
    [],
  )

  useFrame((_, delta) => {
    const s = stateRef.current
    s.timer += delta
    if (s.phase === 'hold') {
      if (s.timer >= HOLD_DUR) {
        s.phase = 'morph'
        s.timer = 0
      }
    } else {
      const t = Math.min(1, s.timer / MORPH_DUR)
      s.uMorph = t
      uniforms.uMorph.value = t
      if (t >= 1) {
        // 다음 형태로: posA ← 현재 목표, posB ← 그 다음 형태
        posARef.current.array.set(formations[s.target])
        posARef.current.needsUpdate = true
        s.target = (s.target + 1) % formations.length
        posBRef.current.array.set(formations[s.target])
        posBRef.current.needsUpdate = true
        uniforms.uMorph.value = 0
        s.uMorph = 0
        s.phase = 'hold'
        s.timer = 0
      }
    }
    uniforms.uProgress.value = progressRef && progressRef.current ? progressRef.current : 0

    if (groupRef.current) {
      groupRef.current.rotation.y += delta * 0.08
    }
  })

  return (
    <group ref={groupRef} rotation={[0.7, 0, 0]}>
      <points>
        <bufferGeometry>
          <bufferAttribute ref={posARef} attach="attributes-aPosA" args={[posA, 3]} />
          <bufferAttribute ref={posBRef} attach="attributes-aPosB" args={[posB, 3]} />
          <bufferAttribute attach="attributes-aColor" args={[colors, 3]} />
          <bufferAttribute attach="attributes-aSeed" args={[seeds, 1]} />
          {/* position 어트리뷰트(필수) — 실제 위치는 셰이더에서 aPosA/B로 계산 */}
          <bufferAttribute attach="attributes-position" args={[scatter, 3]} />
        </bufferGeometry>
        <shaderMaterial
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

// 은은한 배경 별 (블랙홀 팔레트)
function Stars() {
  const layer = useMemo(() => {
    const rand = mulberry32(91)
    const N = 1200
    const pos = new Float32Array(N * 3)
    const col = new Float32Array(N * 3)
    for (let i = 0; i < N; i++) {
      const r = 16 + rand() * 30
      const phi = Math.acos(2 * rand() - 1)
      const theta = TAU * rand()
      pos[i * 3] = r * Math.sin(phi) * Math.cos(theta)
      pos[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta)
      pos[i * 3 + 2] = r * Math.cos(phi) - 10
      const b = 0.4 + rand() * 0.5
      const t = rand()
      let cr, cg, cb
      if (t < 0.42) {
        cr = 0.96
        cg = 0.66
        cb = 0.18
      } else if (t < 0.72) {
        cr = 0.32
        cg = 0.5
        cb = 0.9
      } else {
        cr = 0.95
        cg = 0.96
        cb = 1
      }
      col[i * 3] = cr * b
      col[i * 3 + 1] = cg * b
      col[i * 3 + 2] = cb * b
    }
    return { pos, col }
  }, [])
  const ref = useRef()
  useFrame((_, delta) => {
    if (ref.current) ref.current.rotation.y += delta * 0.005
  })
  return (
    <group ref={ref}>
      <points>
        <bufferGeometry>
          <bufferAttribute attach="attributes-position" args={[layer.pos, 3]} />
          <bufferAttribute attach="attributes-color" args={[layer.col, 3]} />
        </bufferGeometry>
        <pointsMaterial size={0.05} sizeAttenuation vertexColors transparent opacity={0.85} depthWrite={false} />
      </points>
    </group>
  )
}

export default function ParticleMorph({ progressRef }) {
  return (
    <Canvas
      camera={{ position: [0, 0, 6.6], fov: 58 }}
      dpr={[1, 1.5]}
      gl={{ antialias: true, powerPreference: 'high-performance' }}
    >
      <color attach="background" args={['#000000']} />
      <Stars />
      <MorphPoints progressRef={progressRef} />
      <Effects disableGamma>
        <unrealBloomPass threshold={0.14} strength={0.62} radius={0.55} />
      </Effects>
    </Canvas>
  )
}
