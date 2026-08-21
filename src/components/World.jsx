import { Suspense, useEffect, useMemo, useRef, useState } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { Grid, OrthographicCamera } from '@react-three/drei'
import * as THREE from 'three'
import { zones } from '../data/portfolio'
import Zone from './Zone'
import Character from './Character'

const CAM = [14, 14, 14]        // camera isometric, nhìn về gốc toạ độ
const SQRT_HALF = Math.SQRT1_2
const PAN_LIMIT = { x: 10, z: 8 }

const clamp = (v, m) => Math.max(-m, Math.min(m, v))
const zoomForWidth = (w) => Math.max(20, Math.min(46, w / 30))

/**
 * Bản đồ isometric: kéo để pan, hover/click đảo, nhân vật đi lại bằng WASD hoặc click.
 * Pan ghi thẳng vào ref để không re-render mỗi frame.
 */
export default function World({ selectedId, hoveredId, onSelect, onHover, charTarget, onArrive, onManualMove }) {
  const worldRef = useRef()
  const drag = useRef({ active: false, x: 0, y: 0, moved: false, px: 0, pz: 0 })
  const [zoom, setZoom] = useState(() => zoomForWidth(window.innerWidth))

  useEffect(() => {
    const onResize = () => setZoom(zoomForWidth(window.innerWidth))
    window.addEventListener('resize', onResize)
    return () => window.removeEventListener('resize', onResize)
  }, [])

  const onPointerDown = (e) => {
    drag.current = {
      active: true, moved: false,
      x: e.clientX, y: e.clientY,
      px: worldRef.current?.position.x ?? 0,
      pz: worldRef.current?.position.z ?? 0,
    }
    e.currentTarget.setPointerCapture?.(e.pointerId)
  }

  const onPointerMove = (e) => {
    const d = drag.current
    if (!d.active || !worldRef.current) return
    const dx = e.clientX - d.x
    const dy = e.clientY - d.y
    if (Math.hypot(dx, dy) > 5) d.moved = true // kéo thật thì không tính là click chọn đảo

    // màn hình -> world: phải màn hình = (+x,-z), xuống màn hình = (+x,+z)
    const s = 1 / zoom
    worldRef.current.position.x = clamp(d.px + (dx + dy) * SQRT_HALF * s, PAN_LIMIT.x)
    worldRef.current.position.z = clamp(d.pz + (dy - dx) * SQRT_HALF * s, PAN_LIMIT.z)
  }

  const endDrag = () => { drag.current.active = false }
  const handleSelect = (zone) => { if (!drag.current.moved) onSelect(zone) }

  return (
    <div
      className="absolute inset-0 cursor-grab active:cursor-grabbing"
      style={{ touchAction: 'none' }}
      onPointerDown={onPointerDown}
      onPointerMove={onPointerMove}
      onPointerUp={endDrag}
      onPointerCancel={endDrag}
    >
      <Canvas dpr={[1, 2]} gl={{ antialias: true }}>
        <OrthographicCamera
          makeDefault
          position={CAM}
          zoom={zoom}
          near={-100}
          far={300}
          onUpdate={(c) => c.lookAt(0, 0, 0)}
        />

        <ambientLight intensity={0.8} />
        <directionalLight position={[10, 16, 8]} intensity={1.1} />
        <directionalLight position={[-10, 8, -6]} intensity={0.4} color="#7dd3fc" />

        <group ref={worldRef}>
          {/* sàn lưới hình thoi mờ */}
          <Grid
            args={[80, 80]}
            position-y={-0.24}
            cellSize={1}
            cellThickness={0.5}
            cellColor="#1c2233"
            sectionSize={5}
            sectionThickness={1}
            sectionColor="#2b3550"
            fadeDistance={60}
            fadeStrength={1}
          />

          <Dust />

          {zones.map((z) => (
            <Zone
              key={z.id}
              zone={z}
              hovered={hoveredId === z.id}
              selected={selectedId === z.id}
              onSelect={handleSelect}
              onHover={onHover}
            />
          ))}

          <Suspense fallback={null}>
            <Character target={charTarget} onArrive={onArrive} onManualMove={onManualMove} />
          </Suspense>
        </group>
      </Canvas>
    </div>
  )
}

// Bụi sáng bay lên cho không gian có chiều sâu
function Dust({ count = 180 }) {
  const ref = useRef()

  const { positions, speeds } = useMemo(() => {
    const positions = new Float32Array(count * 3)
    const speeds = new Float32Array(count)
    for (let i = 0; i < count; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 34
      positions[i * 3 + 1] = Math.random() * 9 - 1
      positions[i * 3 + 2] = (Math.random() - 0.5) * 34
      speeds[i] = 0.15 + Math.random() * 0.35
    }
    return { positions, speeds }
  }, [count])

  useFrame((_, dt) => {
    const attr = ref.current?.geometry.attributes.position
    if (!attr) return
    const arr = attr.array
    for (let i = 0; i < count; i++) {
      arr[i * 3 + 1] += speeds[i] * dt
      if (arr[i * 3 + 1] > 8) arr[i * 3 + 1] = -1 // lên cao quá thì thả lại từ dưới
    }
    attr.needsUpdate = true
  })

  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
      </bufferGeometry>
      <pointsMaterial
        size={0.075}
        color="#9fe8d6"
        transparent
        opacity={0.5}
        sizeAttenuation
        depthWrite={false}
        blending={THREE.AdditiveBlending}
      />
    </points>
  )
}
