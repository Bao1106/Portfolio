import { useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import { Html, RoundedBox, useTexture } from '@react-three/drei'
import * as THREE from 'three'
import { getThumb } from '../data/portfolio'

const { damp } = THREE.MathUtils

/**
 * Một "hòn đảo" trong thế giới isometric: bệ đỡ + props riêng theo kind + nhãn HTML.
 * active = đang hover hoặc đang mở panel; dimmed = zone khác đang được chọn.
 */
export default function Zone({ zone, active, dimmed, onSelect, onHover }) {
  const group = useRef()
  const matRef = useRef()
  const glowRef = useRef()
  const [x, z] = zone.pos

  useFrame((_, dt) => {
    const g = group.current
    if (!g) return
    // hover -> nhấc đảo lên, sáng bệ và loe vầng sáng dưới chân
    g.position.y = damp(g.position.y, active ? 0.28 : 0, 6, dt)
    if (matRef.current) {
      matRef.current.emissiveIntensity = damp(matRef.current.emissiveIntensity, active ? 0.55 : 0.14, 6, dt)
      matRef.current.opacity = damp(matRef.current.opacity, dimmed ? 0.35 : 1, 6, dt)
    }
    if (glowRef.current) {
      glowRef.current.material.opacity = damp(glowRef.current.material.opacity, active ? 0.22 : 0.05, 6, dt)
    }
  })

  const hover = (v) => {
    onHover(v ? zone : null)
    document.body.style.cursor = v ? 'pointer' : 'auto'
  }

  return (
    <group
      ref={group}
      position={[x, 0, z]}
      onPointerOver={(e) => { e.stopPropagation(); hover(true) }}
      onPointerOut={() => hover(false)}
      onClick={(e) => { e.stopPropagation(); onSelect(zone) }}
    >
      {/* vầng sáng dưới đảo */}
      <mesh ref={glowRef} rotation-x={-Math.PI / 2} position-y={-0.26}>
        <circleGeometry args={[2.4, 40]} />
        <meshBasicMaterial color={zone.color} transparent opacity={0.05} depthWrite={false} />
      </mesh>

      {/* bệ đảo */}
      <RoundedBox args={[2.6, 0.45, 2.6]} radius={0.07} smoothness={4}>
        <meshStandardMaterial
          ref={matRef}
          color={zone.color}
          emissive={zone.color}
          emissiveIntensity={0.14}
          roughness={0.55}
          metalness={0.15}
          transparent
        />
      </RoundedBox>

      <Props zone={zone} active={active} />

      <Html center position={[0, -0.45, 1.85]} style={{ pointerEvents: 'none' }} zIndexRange={[10, 0]}>
        <div
          className={`whitespace-nowrap text-[12px] font-semibold tracking-[0.3px] transition-all duration-300
            [text-shadow:0_2px_10px_rgba(0,0,0,0.9)] ${active ? 'text-ink' : 'text-ink/55'}
            ${dimmed ? 'opacity-30' : 'opacity-100'}`}
        >
          {zone.label}
        </div>
      </Html>
    </group>
  )
}

// ── Props nổi trên mỗi đảo ───────────────────────────────────────────────────
function Props({ zone, active }) {
  if (zone.kind === 'experience') return <Buildings color={zone.color} />
  if (zone.kind === 'skills') return <Crystals color={zone.color} />
  return <Billboard project={zone.project} active={active} />
}

// 4 toà nhà nhỏ = 4 công ty trong CV, nhấp nháy lệch pha nhau
function Buildings({ color }) {
  const ref = useRef()
  const heights = [0.55, 0.85, 0.4, 0.7]

  useFrame((state) => {
    const t = state.clock.elapsedTime
    ref.current?.children.forEach((m, i) => {
      m.material.emissiveIntensity = 0.35 + Math.sin(t * 1.6 + i * 0.8) * 0.25
    })
  })

  return (
    <group ref={ref}>
      {heights.map((h, i) => (
        <mesh key={i} position={[-0.72 + i * 0.48, 0.22 + h / 2, 0]}>
          <boxGeometry args={[0.34, h, 0.34]} />
          <meshStandardMaterial color={color} emissive={color} emissiveIntensity={0.4} roughness={0.4} />
        </mesh>
      ))}
    </group>
  )
}

// 3 tinh thể lơ lửng, xoay và trôi lên xuống
function Crystals({ color }) {
  const ref = useRef()

  useFrame((state) => {
    const t = state.clock.elapsedTime
    ref.current?.children.forEach((m, i) => {
      m.position.y = 0.85 + Math.sin(t * 1.2 + i * 1.1) * 0.14
      m.rotation.y = t * 0.7 + i
    })
  })

  return (
    <group ref={ref}>
      {[[-0.6, 0.35], [0, 0.5], [0.6, 0.3]].map(([px, s], i) => (
        <mesh key={i} position={[px, 0.85, 0]} scale={s}>
          <octahedronGeometry args={[1, 0]} />
          <meshStandardMaterial color={color} emissive={color} emissiveIntensity={0.7} roughness={0.2} metalness={0.4} />
        </mesh>
      ))}
    </group>
  )
}

// Tấm thumbnail project lơ lửng trên đảo
function Billboard({ project, active }) {
  const ref = useRef()
  const map = useTexture(getThumb(project), (t) => { t.colorSpace = THREE.SRGBColorSpace })

  useFrame((state, dt) => {
    const m = ref.current
    if (!m) return
    const t = state.clock.elapsedTime
    m.position.y = 1.1 + Math.sin(t * 1.1) * 0.08
    // hướng mặt về camera iso (azimuth 45°), hover thì quay thẳng hơn
    m.rotation.y = damp(m.rotation.y, Math.PI / 4 + (active ? 0 : -0.2), 4, dt)
  })

  return (
    <mesh ref={ref} position={[0, 1.1, 0]} rotation={[-0.35, Math.PI / 4 - 0.2, 0]}>
      <planeGeometry args={[1.9, 1.07]} />
      <meshStandardMaterial
        map={map}
        emissive={project.color}
        emissiveMap={map}
        emissiveIntensity={active ? 0.45 : 0.2}
        roughness={0.5}
        side={THREE.DoubleSide}
      />
    </mesh>
  )
}
