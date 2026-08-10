import { useRef, useMemo } from 'react'
import { Canvas, useFrame, extend } from '@react-three/fiber'
import { OrbitControls, Effects } from '@react-three/drei'
import { UnrealBloomPass } from 'three-stdlib'
import * as THREE from 'three'

extend({ UnrealBloomPass })

// 파티클 스웜: 데이터가 중심 CRM 코어로 수렴하는 형상 (블루→퍼플, Bloom)
function ParticleSwarm() {
  const meshRef = useRef()
  const count = 20000
  const speedMult = 1
  const dummy = useMemo(() => new THREE.Object3D(), [])
  const target = useMemo(() => new THREE.Vector3(), [])
  const pColor = useMemo(() => new THREE.Color(), [])
  const color = pColor

  const positions = useMemo(() => {
    const pos = []
    for (let i = 0; i < count; i++) {
      pos.push(
        new THREE.Vector3(
          (Math.random() - 0.5) * 100,
          (Math.random() - 0.5) * 100,
          (Math.random() - 0.5) * 100,
        ),
      )
    }
    return pos
  }, [])

  const material = useMemo(() => new THREE.MeshBasicMaterial({ color: 0xffffff }), [])
  const geometry = useMemo(() => new THREE.TetrahedronGeometry(0.25), [])

  const PARAMS = useMemo(() => ({ speed: 0.4, chaos: 20, coreSize: 10 }), [])

  useFrame((state) => {
    if (!meshRef.current) return
    const time = state.clock.getElapsedTime() * speedMult

    for (let i = 0; i < count; i++) {
      const speed = PARAMS.speed
      const chaos = PARAMS.chaos
      const coreSize = PARAMS.coreSize

      // 1. 코어를 향한 진행도 (0.0 = 바깥, 1.0 = 코어)
      const norm = i / count
      const progress = (norm + time * speed * 0.2) % 1.0
      const easeProgress = Math.pow(progress, 1.5)

      // 2. 피보나치 구 분포 (균일한 3D 볼륨)
      const goldenRatio = (1.0 + Math.sqrt(5.0)) / 2.0
      const theta = (2.0 * Math.PI * i) / goldenRatio
      const phi = Math.acos(1.0 - 2.0 * norm)

      // 3. 반경: 150 → coreSize
      const currentRadius = coreSize + 150.0 * (1.0 - easeProgress)

      // 4. 노이즈/카오스: 바깥에서 크고 코어에서 0
      const instability = Math.pow(1.0 - progress, 2.0)
      const wobbleX = Math.sin(time * 2.0 + norm * 100.0) * chaos * instability
      const wobbleY = Math.cos(time * 1.5 + norm * 200.0) * chaos * instability
      const wobbleZ = Math.sin(time * 3.0 - norm * 300.0) * chaos * instability

      // 5. 위치 조합
      const sinPhi = Math.sin(phi)
      const x = currentRadius * sinPhi * Math.cos(theta) + wobbleX
      const y = currentRadius * sinPhi * Math.sin(theta) + wobbleY
      const z = currentRadius * Math.cos(phi) + wobbleZ

      target.set(x, y, z)

      // 6. 컬러: 바깥 = 데이터 블루, 코어 = 네온 퍼플
      const hue = 0.55 + 0.25 * progress
      const saturation = 0.8 + 0.2 * progress
      const corePulse = progress > 0.95 ? Math.sin(time * 10.0) * 0.3 : 0.0
      const lightness = 0.2 + 0.6 * progress + corePulse

      color.setHSL(hue, saturation, Math.max(0.0, Math.min(1.0, lightness)))

      positions[i].lerp(target, 0.1)
      dummy.position.copy(positions[i])
      dummy.updateMatrix()
      meshRef.current.setMatrixAt(i, dummy.matrix)
      meshRef.current.setColorAt(i, pColor)
    }
    meshRef.current.instanceMatrix.needsUpdate = true
    if (meshRef.current.instanceColor) meshRef.current.instanceColor.needsUpdate = true
  })

  return <instancedMesh ref={meshRef} args={[geometry, material, count]} />
}

export default function HeroBackground() {
  return (
    <Canvas
      camera={{ position: [0, 0, 100], fov: 60 }}
      dpr={[1, 1.5]}
      gl={{ antialias: true, powerPreference: 'high-performance' }}
    >
      <fog attach="fog" args={['#000000', 0.01]} />
      <ParticleSwarm />
      {/* 배경용: 사용자 입력은 막고 자동 회전만 */}
      <OrbitControls
        autoRotate
        autoRotateSpeed={1.2}
        enableZoom={false}
        enablePan={false}
        enableRotate={false}
      />
      <Effects disableGamma>
        <unrealBloomPass threshold={0} strength={1.8} radius={0.4} />
      </Effects>
    </Canvas>
  )
}
