import { useEffect, useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import { Html, RoundedBox } from '@react-three/drei'
import * as THREE from 'three'
import ZoneProps from './ZoneProps'

const { damp } = THREE.MathUtils

/**
 * Một hòn đảo trên bản đồ: bệ + đồ trang trí + nhãn HTML.
 * hover: đảo nhấc lên, viền sáng mạnh, nhãn sáng trắng.
 * click: bung một vòng sáng rồi mở panel.
 */
export default function Zone({ zone, hovered, selected, onSelect, onHover }) {
  const group = useRef()
  const edge = useRef()
  const glow = useRef()
  const burst = useRef()
  const burstT = useRef(999)
  const [x, z] = zone.pos
  const active = hovered || selected

  // click -> chạy lại hiệu ứng bung vòng sáng
  useEffect(() => { if (selected) burstT.current = 0 }, [selected])

  useFrame((_, dt) => {
    const g = group.current
    if (!g) return

    g.position.y = damp(g.position.y, active ? 0.3 : 0, 7, dt)
    if (edge.current) edge.current.material.opacity = damp(edge.current.material.opacity, active ? 0.95 : 0.45, 7, dt)
    if (glow.current) glow.current.material.opacity = damp(glow.current.material.opacity, active ? 0.3 : 0.09, 7, dt)

    if (burst.current && burstT.current < 1) {
      burstT.current += dt * 1.6
      const p = Math.min(burstT.current, 1)
      burst.current.scale.setScalar(0.6 + p * 2.2)
      burst.current.material.opacity = (1 - p) * 0.5
      burst.current.visible = true
    } else if (burst.current) {
      burst.current.visible = false
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
      {/* quầng sáng dưới đảo */}
      <mesh ref={glow} rotation-x={-Math.PI / 2} position-y={-0.3}>
        <circleGeometry args={[3.1, 40]} />
        <meshBasicMaterial color={zone.color} transparent opacity={0.09} depthWrite={false} />
      </mesh>

      {/* vòng sáng bung ra khi click */}
      <mesh ref={burst} rotation-x={-Math.PI / 2} position-y={0.24} visible={false}>
        <ringGeometry args={[0.9, 1.05, 40]} />
        <meshBasicMaterial color={zone.color} transparent opacity={0} depthWrite={false} />
      </mesh>

      {/* bệ đảo + viền phát sáng */}
      <RoundedBox args={[3.4, 0.42, 3.4]} radius={0.1} smoothness={4}>
        <meshStandardMaterial color="#141a2a" roughness={0.65} metalness={0.2} />
      </RoundedBox>
      <mesh ref={edge} rotation-x={-Math.PI / 2} position-y={0.222}>
        <ringGeometry args={[1.62, 1.72, 4, 1, Math.PI / 4]} />
        <meshBasicMaterial color={zone.color} transparent opacity={0.45} side={THREE.DoubleSide} />
      </mesh>

      <ZoneProps kind={zone.kind} color={zone.color} active={active} />

      <Html center position={[0, -0.55, 2.35]} style={{ pointerEvents: 'none' }} zIndexRange={[9, 0]}>
        <div
          className={`whitespace-nowrap rounded-lg border px-3 py-1 text-[13px] font-semibold transition-colors duration-300
            ${active ? 'text-white' : 'text-ink2'}`}
          style={{
            borderColor: active ? zone.color : 'rgba(255,255,255,0.10)',
            background: 'rgba(11,15,26,0.72)',
            boxShadow: active ? `0 0 18px ${zone.color}55` : 'none',
          }}
        >
          {zone.label}
        </div>
      </Html>
    </group>
  )
}
