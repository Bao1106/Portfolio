import { useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import { RoundedBox, useTexture } from '@react-three/drei'
import * as THREE from 'three'
import { getThumb } from '../data/projects'

const { damp } = THREE.MathUtils

/**
 * Tấm card 3D ở giữa stage: hiện project đang hover/chọn.
 * Đổi project -> component remount (key) -> fade + scale từ nhỏ lên cho có chuyển cảnh.
 */
export default function ShowcaseCard({ project }) {
  const ref = useRef()
  const matRef = useRef()
  const map = useTexture(getThumb(project), (t) => { t.colorSpace = THREE.SRGBColorSpace })

  useFrame((state, dt) => {
    const mesh = ref.current
    const mat = matRef.current
    if (!mesh || !mat) return

    const t = state.clock.elapsedTime
    // trôi nhẹ + nghiêng theo con trỏ (parallax)
    mesh.rotation.y = damp(mesh.rotation.y, state.pointer.x * 0.35 + Math.sin(t * 0.35) * 0.1, 3, dt)
    mesh.rotation.x = damp(mesh.rotation.x, -state.pointer.y * 0.2, 3, dt)
    mesh.position.y = Math.sin(t * 0.9) * 0.05

    mat.opacity = damp(mat.opacity, 1, 5, dt)
    mesh.scale.setScalar(damp(mesh.scale.x, 1, 5, dt))
  })

  return (
    <group>
      {/* đèn màu accent hắt từ sau card ra -> viền sáng theo màu project */}
      <pointLight position={[0, 0, -1.6]} color={project.color} intensity={14} distance={7} />

      <RoundedBox ref={ref} args={[2.9, 1.63, 0.07]} radius={0.07} smoothness={4} scale={0.82}>
        <meshStandardMaterial
          ref={matRef}
          map={map}
          emissive={project.color}
          emissiveMap={map}
          emissiveIntensity={0.32}
          roughness={0.4}
          metalness={0.15}
          transparent
          opacity={0}
        />
      </RoundedBox>
    </group>
  )
}
