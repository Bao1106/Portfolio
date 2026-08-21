import { useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'

const { damp } = THREE.MathUtils
const STAND_OFF = 1.9 // đứng trước đảo chứ không đứng đè lên đảo
const AUTO_EVERY = 2.6 // giây

/**
 * Nhân vật chibi tự đi vòng quanh các đảo cho thế giới có sự sống.
 * Có zone được chọn thì đi thẳng tới đảo đó.
 */
export default function Character({ points, target }) {
  const root = useRef()
  const bob = useRef()
  const idx = useRef(0)
  const lastSwitch = useRef(0)

  useFrame((state, dt) => {
    const g = root.current
    if (!g) return
    const t = state.clock.elapsedTime

    // chọn đích: zone đang chọn, hoặc tự luân phiên
    let tx, tz
    if (target) {
      ;[tx, tz] = target
    } else {
      if (t - lastSwitch.current > AUTO_EVERY) {
        lastSwitch.current = t
        idx.current = (idx.current + 1) % points.length
      }
      ;[tx, tz] = points[idx.current]
    }
    tz += STAND_OFF

    const nx = damp(g.position.x, tx, 2.2, dt)
    const nz = damp(g.position.z, tz, 2.2, dt)
    const moving = Math.hypot(nx - g.position.x, nz - g.position.z) > 0.0015

    if (moving) g.rotation.y = Math.atan2(tx - g.position.x, tz - g.position.z)
    g.position.x = nx
    g.position.z = nz

    // đi thì nhảy tưng tưng, đứng yên thì thở nhẹ
    bob.current.position.y = moving ? Math.abs(Math.sin(t * 9)) * 0.1 : Math.sin(t * 2) * 0.02
  })

  return (
    <group ref={root} position={[-5.4, 0, 0]}>
      {/* bóng đổ giả, luôn nằm trên mặt đất */}
      <mesh rotation-x={-Math.PI / 2} position-y={0.01}>
        <circleGeometry args={[0.2, 20]} />
        <meshBasicMaterial color="#000000" transparent opacity={0.35} depthWrite={false} />
      </mesh>

      <group ref={bob}>
        <mesh position-y={0.18}>
          <boxGeometry args={[0.22, 0.24, 0.18]} />
          <meshStandardMaterial color="#6c63ff" emissive="#6c63ff" emissiveIntensity={0.25} roughness={0.5} />
        </mesh>
        <mesh position-y={0.4}>
          <sphereGeometry args={[0.14, 20, 20]} />
          <meshStandardMaterial color="#fbbf24" emissive="#fbbf24" emissiveIntensity={0.45} roughness={0.4} />
        </mesh>
      </group>
    </group>
  )
}
