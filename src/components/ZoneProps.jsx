import { useMemo, useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import { Html } from '@react-three/drei'
import * as THREE from 'three'
import { experience, skills } from '../data/portfolio'

/**
 * Đồ trang trí đứng trên mỗi đảo. Tất cả dựng bằng primitive (box/cylinder/octahedron…)
 * cho nhẹ, không cần model ngoài.
 */
export default function ZoneProps({ kind, color, active }) {
  if (kind === 'profile') return <Pedestal color={color} active={active} />
  if (kind === 'experience') return <Town color={color} />
  if (kind === 'skills') return <Forge color={color} />
  if (kind === 'projects') return <Arena color={color} />
  return <Lab color={color} />
}

// ── Profile Plaza: bệ phát sáng + cột ánh sáng ──────────────────────────────
function Pedestal({ color, active }) {
  const ring = useRef()
  const beam = useRef()

  useFrame((state) => {
    const t = state.clock.elapsedTime
    if (ring.current) ring.current.rotation.z = t * 0.6
    if (beam.current) beam.current.material.opacity = (active ? 0.16 : 0.1) + Math.sin(t * 1.8) * 0.03
  })

  return (
    <group>
      <mesh position-y={0.14}>
        <cylinderGeometry args={[0.75, 0.9, 0.28, 6]} />
        <meshStandardMaterial color="#1a1f2e" emissive={color} emissiveIntensity={0.35} roughness={0.4} metalness={0.3} />
      </mesh>
      <mesh ref={ring} rotation-x={-Math.PI / 2} position-y={0.29}>
        <ringGeometry args={[0.55, 0.78, 6]} />
        <meshBasicMaterial color={color} transparent opacity={0.55} side={THREE.DoubleSide} />
      </mesh>
      {/* cột sáng chiếu lên trời */}
      <mesh ref={beam} position-y={1.6}>
        <cylinderGeometry args={[0.95, 0.6, 2.6, 12, 1, true]} />
        <meshBasicMaterial color={color} transparent opacity={0.1} side={THREE.DoubleSide} depthWrite={false} />
      </mesh>
    </group>
  )
}

// ── Experience Town: 4 toà nhà = 4 công ty, cột cờ mang chữ cái đầu ─────────
function Town({ color }) {
  const group = useRef()
  const spots = [[-0.85, -0.5], [0.15, -0.75], [-0.35, 0.55], [0.9, 0.35]]

  useFrame((state) => {
    const t = state.clock.elapsedTime
    group.current?.children.forEach((b, i) => {
      const mat = b.children[0]?.material
      if (mat) mat.emissiveIntensity = 0.5 + Math.sin(t * 1.5 + i * 0.9) * 0.35
    })
  })

  return (
    <group ref={group}>
      {experience.map((e, i) => (
        <group key={e.company} position={[spots[i][0], 0, spots[i][1]]}>
          <mesh position-y={e.height / 2}>
            <boxGeometry args={[0.42, e.height, 0.42]} />
            <meshStandardMaterial
              color="#0f172a"
              emissive={color}
              emissiveIntensity={0.5}
              roughness={0.35}
              metalness={0.2}
            />
          </mesh>
          {/* cột cờ + chữ công ty */}
          <mesh position-y={e.height + 0.22}>
            <cylinderGeometry args={[0.015, 0.015, 0.44, 6]} />
            <meshBasicMaterial color={color} />
          </mesh>
          <Html center position={[0, e.height + 0.5, 0]} style={{ pointerEvents: 'none' }} zIndexRange={[8, 0]}>
            <span
              className="rounded px-1.5 py-0.5 text-[10px] font-bold leading-none"
              style={{ background: color, color: '#08131a' }}
            >
              {e.flag}
            </span>
          </Html>
        </group>
      ))}
    </group>
  )
}

// ── Skills Forge: 5 tinh thể xoay quanh, mỗi cái mang 1 icon ────────────────
function Forge({ color }) {
  const group = useRef()

  useFrame((state) => {
    const t = state.clock.elapsedTime
    if (!group.current) return
    group.current.rotation.y = t * 0.25
    group.current.children.forEach((c, i) => {
      c.position.y = 1.15 + Math.sin(t * 1.3 + i * 1.2) * 0.16
      c.rotation.y = t * 0.9 + i
    })
  })

  return (
    <group ref={group}>
      {skills.map((s, i) => {
        const a = (i / skills.length) * Math.PI * 2
        return (
          <group key={s.name} position={[Math.cos(a) * 0.95, 1.15, Math.sin(a) * 0.95]}>
            <mesh scale={[0.16, 0.34, 0.16]}>
              <octahedronGeometry args={[1, 0]} />
              <meshStandardMaterial
                color={color}
                emissive={color}
                emissiveIntensity={0.85}
                roughness={0.15}
                metalness={0.5}
                transparent
                opacity={0.9}
              />
            </mesh>
            <Html center position={[0, 0.48, 0]} style={{ pointerEvents: 'none' }} zIndexRange={[8, 0]}>
              <span className="text-[11px] font-semibold leading-none" style={{ color, textShadow: '0 0 8px currentColor' }}>
                {s.icon}
              </span>
            </Html>
          </group>
        )
      })}
    </group>
  )
}

// ── Project Arena: công trường — cần cẩu, giàn giáo, hologram bản vẽ ────────
function Arena({ color }) {
  const holo = useRef()
  const tex = useMemo(() => gridTexture('#f8d68b'), [])

  useFrame((state) => {
    const t = state.clock.elapsedTime
    if (!holo.current) return
    holo.current.position.y = 0.95 + Math.sin(t * 1.1) * 0.06
    holo.current.material.opacity = 0.5 + Math.sin(t * 2.4) * 0.08
  })

  return (
    <group>
      <Crane color={color} position={[-0.95, 0, -0.55]} rotation-y={0.4} scale={1} />
      <Crane color={color} position={[0.95, 0, 0.35]} rotation-y={-2.2} scale={0.78} />

      {/* giàn giáo */}
      <group position={[0.15, 0, -0.75]}>
        {[0, 0.34, 0.68].map((y) => (
          <mesh key={y} position-y={y + 0.16}>
            <boxGeometry args={[0.9, 0.03, 0.5]} />
            <meshStandardMaterial color={color} emissive={color} emissiveIntensity={0.3} roughness={0.5} />
          </mesh>
        ))}
        {[[-0.42, -0.22], [0.42, -0.22], [-0.42, 0.22], [0.42, 0.22]].map(([x, z]) => (
          <mesh key={`${x}${z}`} position={[x, 0.5, z]}>
            <boxGeometry args={[0.035, 1, 0.035]} />
            <meshStandardMaterial color={color} emissive={color} emissiveIntensity={0.25} roughness={0.5} />
          </mesh>
        ))}
      </group>

      {/* hologram bản vẽ nằm ngang */}
      <mesh ref={holo} rotation-x={-Math.PI / 2} position={[0, 0.95, 0.3]}>
        <planeGeometry args={[1.5, 1]} />
        <meshBasicMaterial map={tex} color={color} transparent opacity={0.5} side={THREE.DoubleSide} depthWrite={false} />
      </mesh>
    </group>
  )
}

function Crane({ color, ...props }) {
  return (
    <group {...props}>
      <mesh position-y={0.85}>
        <boxGeometry args={[0.07, 1.7, 0.07]} />
        <meshStandardMaterial color={color} emissive={color} emissiveIntensity={0.35} roughness={0.4} metalness={0.3} />
      </mesh>
      <mesh position={[0.42, 1.68, 0]}>
        <boxGeometry args={[1.15, 0.06, 0.06]} />
        <meshStandardMaterial color={color} emissive={color} emissiveIntensity={0.35} roughness={0.4} metalness={0.3} />
      </mesh>
      {/* dây cáp + móc */}
      <mesh position={[0.85, 1.35, 0]}>
        <boxGeometry args={[0.012, 0.62, 0.012]} />
        <meshBasicMaterial color={color} />
      </mesh>
      <mesh position={[0.85, 1.0, 0]}>
        <boxGeometry args={[0.1, 0.1, 0.1]} />
        <meshStandardMaterial color={color} emissive={color} emissiveIntensity={0.6} />
      </mesh>
    </group>
  )
}

// ── Personal Lab: bình thí nghiệm, dây điện xẹt, màn hình game ──────────────
function Lab({ color }) {
  const liquids = useRef()
  const screen = useRef()
  const tex = useMemo(() => gridTexture('#ffc0e0'), [])

  useFrame((state) => {
    const t = state.clock.elapsedTime
    liquids.current?.children.forEach((m, i) => {
      m.material.emissiveIntensity = 0.7 + Math.sin(t * 2.2 + i * 1.4) * 0.4
    })
    if (screen.current) screen.current.material.opacity = 0.55 + Math.sin(t * 3.1) * 0.07
  })

  return (
    <group>
      {/* 3 trạm = 3 project cá nhân */}
      <group ref={liquids}>
        {[[-0.8, -0.3, 0.3], [-0.25, -0.6, 0.42], [0.3, -0.15, 0.26]].map(([x, z, h], i) => (
          <mesh key={i} position={[x, h / 2 + 0.12, z]}>
            <cylinderGeometry args={[0.13, 0.17, h, 12]} />
            <meshStandardMaterial
              color={color}
              emissive={color}
              emissiveIntensity={0.8}
              roughness={0.2}
              metalness={0.1}
              transparent
              opacity={0.85}
            />
          </mesh>
        ))}
      </group>

      {/* bệ máy + ống dẫn */}
      <mesh position={[0.55, 0.35, -0.35]}>
        <cylinderGeometry args={[0.22, 0.26, 0.7, 10]} />
        <meshStandardMaterial color="#2a1830" emissive={color} emissiveIntensity={0.3} roughness={0.45} metalness={0.35} />
      </mesh>
      <mesh position={[0.55, 0.78, -0.35]}>
        <torusGeometry args={[0.14, 0.03, 8, 16]} />
        <meshStandardMaterial color={color} emissive={color} emissiveIntensity={0.9} />
      </mesh>

      {/* màn hình game hologram */}
      <mesh ref={screen} position={[0.15, 1.25, -0.9]} rotation={[-0.12, Math.PI / 4, 0]}>
        <planeGeometry args={[1.5, 0.95]} />
        <meshBasicMaterial map={tex} color={color} transparent opacity={0.55} side={THREE.DoubleSide} depthWrite={false} />
      </mesh>
    </group>
  )
}

// Texture lưới vẽ bằng canvas — dùng cho hologram bản vẽ và màn hình game
function gridTexture(lineColor) {
  const c = document.createElement('canvas')
  c.width = c.height = 128
  const ctx = c.getContext('2d')
  ctx.fillStyle = 'rgba(0,0,0,0)'
  ctx.fillRect(0, 0, 128, 128)
  ctx.strokeStyle = lineColor
  ctx.lineWidth = 2
  ctx.globalAlpha = 0.55
  for (let i = 0; i <= 128; i += 16) {
    ctx.beginPath(); ctx.moveTo(i, 0); ctx.lineTo(i, 128); ctx.stroke()
    ctx.beginPath(); ctx.moveTo(0, i); ctx.lineTo(128, i); ctx.stroke()
  }
  ctx.globalAlpha = 1
  ctx.strokeRect(6, 6, 116, 116)
  const tex = new THREE.CanvasTexture(c)
  tex.colorSpace = THREE.SRGBColorSpace
  return tex
}
