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
  uniform float uProgress; // 스크롤 커버 진행도 0..1 (산개/소멸)
  attribute vec3 aStart;
  attribute float aDelay;
  attribute vec3 aColor;
  attribute float aRadius;  // 소용돌이 속도용 반경
  varying vec3 vColor;
  varying float vT;
  varying float vFade;
  void main() {
    float dur = 2.4;
    float t = clamp((uTime - aDelay) / dur, 0.0, 1.0);
    float e = 1.0 - pow(1.0 - t, 3.0);           // easeOutCubic

    // 소용돌이: 초반 빠르게 → 형성되며 현재 속도로 감속 (안쪽일수록 빠른 차등 회전)
    float spin = uTime + 7.8 * (1.0 - exp(-uTime / 1.3));
    float sw = spin * (0.3 / (aRadius + 0.4));
    float cs = cos(sw);
    float sn = sin(sw);
    vec3 disc = vec3(
      position.x * cs - position.y * sn,
      position.x * sn + position.y * cs,
      position.z
    );

    vec3 pos = mix(aStart, disc, e);

    // ── 스크롤 커버 시: 바깥으로 산개(팽창·흩뿌림) + 일부 먼저 소멸 (USTA 스타일) ──
    float rr = fract(sin(aDelay * 91.7) * 4398.5453);
    float rr2 = fract(sin(aRadius * 57.31) * 434.17);
    float dp = uProgress;
    if (dp > 0.001) {
      vec3 rdir = normalize(pos + vec3(0.0001, 0.0001, 0.0001));
      vec3 jitter = vec3(cos(rr * 6.2831), sin(rr2 * 6.2831), sin(rr * 3.1415));
      pos += (rdir * 1.0 + jitter * 0.85) * dp * 5.5;
    }
    // 스태거 소멸: 입자마다 사라지는 시점이 달라 '일부는 먼저' 사라짐
    float thr = 0.28 + 0.5 * rr;
    vFade = 1.0 - smoothstep(thr, thr + 0.22, uProgress);

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

    // 입자마다 크기 편차 (작은 미세점 + 드문 큰 점)
    float sv = 0.5 + 1.15 * fract(sin(aDelay * 57.31) * 434.17);
    // 원근 깊이: 앞(카메라 가까움)은 크게, 뒤는 작게
    float depthBoost = clamp((6.6 + mv.z) * 0.42 + 1.0, 0.4, 2.3);
    gl_PointSize = uSize * sv * depthBoost * (260.0 / -mv.z) * (0.4 + 0.6 * e);
    gl_Position = projectionMatrix * mv;
  }
`

const fragmentShader = /* glsl */ `
  precision mediump float;
  varying vec3 vColor;
  varying float vT;
  varying float vFade;
  void main() {
    vec2 uv = gl_PointCoord - 0.5;
    float d = length(uv);
    float a = smoothstep(0.5, 0.0, d);
    gl_FragColor = vec4(vColor, a * (0.35 + 0.65 * vT) * vFade);
  }
`

function Ring({ progressRef }) {
  const ref = useRef()
  const matRef = useRef()
  const lastMoveRef = useRef(0) // 마지막 마우스 움직임 시각
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

    // 블랙홀 팔레트: 화이트핫/골드/앰버(밝은 링) · 블루/화이트(바깥)
    const HOT = new THREE.Color('#fff3d8')
    const GOLD = new THREE.Color('#f4a828')
    const AMBER = new THREE.Color('#e07d1a')
    const BLUE = new THREE.Color('#4a78d8')
    const BLUE2 = new THREE.Color('#89b0f0')
    const WHITE = new THREE.Color('#eef2f7')

    const tgt = new Float32Array(COUNT * 3)
    const st = new Float32Array(COUNT * 3)
    const dl = new Float32Array(COUNT)
    const col = new Float32Array(COUNT * 3)
    const rad = new Float32Array(COUNT)
    const TAU = Math.PI * 2
    const tmp = new THREE.Color()

    const rMin = 1.35 // 이벤트 호라이즌(다크 홀) 반경
    const rMax = 3.3

    for (let i = 0; i < COUNT; i++) {
      // 24%: 구를 위/아래까지 감싸며 흐르는 낮은 밀도 3D 스트림
      const isShell = rand() < 0.24
      const isWisp = !isShell && rand() < 0.22
      let tx
      let ty
      let tz
      let r
      let tf
      if (isShell) {
        const u = rand() * 2 - 1
        const sp = Math.sqrt(1 - u * u)
        r = rMin + 0.05 + Math.pow(rand(), 0.6) * 1.35
        const ang2 = rand() * TAU + 1.4 * Math.log(r + 0.4)
        tx = sp * Math.cos(ang2) * r
        ty = sp * Math.sin(ang2) * r
        tz = u * r
        tf = Math.min(1, (r - rMin) / (rMax - rMin))
      } else {
        r = isWisp
          ? rMin + Math.pow(rand(), 0.5) * (rMax * 1.7 - rMin)
          : rMin + Math.pow(rand(), 2.6) * (rMax - rMin)
        tf = Math.min(1, (r - rMin) / (rMax - rMin))
        const a0 = rand() * TAU
        const ang = a0 + 1.6 * Math.log(r + 0.4)
        const rr = r + (rand() - 0.5) * (0.015 + tf * 0.12)
        tx = Math.cos(ang) * rr
        ty = Math.sin(ang) * rr
        const zAmp = isWisp ? 0.04 : 0.05 + 0.1 * (1 - tf)
        tz = (rand() + rand() + rand() - 1.5) * zAmp
      }

      // curl 유기적 결(약하게)
      const c = curl(tx * 0.45, ty * 0.45, tz * 0.45)
      const wisp = 0.05
      tx += c[0] * wisp
      ty += c[1] * wisp
      tz += c[2] * wisp

      // 가운데 '투명 구'를 품은 느낌: 구 근처 입자를 표면 밖으로 부드럽게 밀어 감쌈
      // (하드한 원형 경계 아님 — 부드러운 왜곡)
      const sphR = 1.15
      const d = Math.sqrt(tx * tx + ty * ty + tz * tz)
      if (d > 0.0001) {
        const bulge = sphR * Math.exp(-(d * d) / (sphR * sphR * 0.9))
        const nd = (d + bulge) / d
        tx *= nd
        ty *= nd
        tz *= nd
      }

      tgt[i * 3] = tx
      tgt[i * 3 + 1] = ty
      tgt[i * 3 + 2] = tz
      rad[i] = r

      // 시작점: 넓게 흩어져 있던 입자 → 안쪽으로 모여들며 블랙홀 형성
      const su = rand() * 2 - 1
      const sth = rand() * TAU
      const ss = Math.sqrt(1 - su * su)
      const sR = 4.0 + Math.pow(rand(), 0.4) * 5.0 // 4~9 넓게 분산
      st[i * 3] = ss * Math.cos(sth) * sR
      st[i * 3 + 1] = ss * Math.sin(sth) * sR
      st[i * 3 + 2] = su * sR

      // 스태거 지연
      dl[i] = rand() * 1.3

      // 색: 안쪽 밝은 링(화이트핫→골드→앰버) → 바깥 블루
      if (tf < 0.12) {
        tmp.copy(rand() < 0.5 ? HOT : GOLD)
      } else if (tf < 0.4) {
        tmp.copy(rand() < 0.55 ? GOLD : AMBER)
      } else if (tf < 0.68) {
        const p = rand()
        tmp.copy(p < 0.4 ? AMBER : p < 0.7 ? WHITE : BLUE2)
      } else {
        tmp.copy(rand() < 0.65 ? BLUE : BLUE2)
      }
      const bright = (isShell ? 0.55 : isWisp ? 0.55 : 1.7) - tf * 0.9
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
      uProgress: { value: 0 },
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
      lastMoveRef.current = performance.now()
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
    uniforms.uProgress.value = progressRef && progressRef.current ? progressRef.current : 0
    const et = state.clock.elapsedTime
    if (ref.current) {
      // 마우스 방향에 따라 군체가 입체적으로 살짝 기울어짐 (패럴랙스, 부드럽게 lerp)
      // 단, 움직임이 멈추고 ~2초 지나면 기본 방향으로 서서히 복귀
      const idle = (performance.now() - lastMoveRef.current) / 1000
      const recenter = Math.min(1, Math.max(0, (idle - 1.2) / 0.8)) // 1.2~2.0s에 0→1
      const infl = uniforms.uActive.value * (1 - recenter)
      const mx = uniforms.uMouse.value.x
      const my = uniforms.uMouse.value.y
      const targetX = 0.95 - my * 0.18 * infl // 원래 뷰(살짝 눕힘)
      const targetY = mx * 0.28 * infl // 마우스 좌우 → 좌우로 기울임
      ref.current.rotation.x += (targetX - ref.current.rotation.x) * 0.05
      ref.current.rotation.y += (targetY - ref.current.rotation.y) * 0.05
      ref.current.rotation.z = Math.sin(et * 0.05) * 0.03
    }
  })

  return (
    <group ref={ref} rotation={[0.95, 0, 0]}>
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
        // 블랙홀과 같은 팔레트: 골드/앰버 · 블루 · 화이트
        const t = rand()
        const b = 0.42 + rand() * 0.55
        let cr
        let cg
        let cb
        if (t < 0.42) {
          // 골드/앰버
          cr = 0.96
          cg = 0.66
          cb = 0.18
        } else if (t < 0.72) {
          // 블루
          cr = 0.32
          cg = 0.5
          cb = 0.9
        } else {
          // 화이트
          cr = 0.95
          cg = 0.96
          cb = 1
        }
        col[i * 3] = cr * b
        col[i * 3 + 1] = cg * b
        col[i * 3 + 2] = cb * b
      }
      return { pos, col }
    }
    return { far: build(1300, 10), near: build(150, 6) }
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
        <pointsMaterial size={0.08} sizeAttenuation vertexColors transparent opacity={0.9} depthWrite={false} />
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

export default function ParticleRing({ progressRef }) {
  return (
    <Canvas
      camera={{ position: [0, 0, 6.6], fov: 58 }}
      dpr={[1, 1.5]}
      gl={{ antialias: true, powerPreference: 'high-performance' }}
    >
      <color attach="background" args={['#000000']} />
      <Stars />
      <Ring progressRef={progressRef} />
      <Effects disableGamma>
        <unrealBloomPass threshold={0.12} strength={0.75} radius={0.55} />
      </Effects>
    </Canvas>
  )
}
