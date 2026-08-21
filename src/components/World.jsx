import { Suspense, useEffect, useRef, useState } from 'react'
import { Canvas } from '@react-three/fiber'
import { Grid, OrthographicCamera } from '@react-three/drei'
import { zones } from '../data/portfolio'
import Zone from './Zone'
import Character from './Character'

// Camera isometric: đứng ở (12,12,12) nhìn về gốc toạ độ.
const CAM = [12, 12, 12]
const SQRT_HALF = Math.SQRT1_2 // 0.707 — hệ số đổi delta chuột sang trục thế giới
const PAN_LIMIT = { x: 9, z: 7 }

const clamp = (v, m) => Math.max(-m, Math.min(m, v))
const zoomForWidth = (w) => Math.max(24, Math.min(56, w / 26))

/**
 * Thế giới isometric: kéo để pan, hover đảo để nhấc lên, click để mở panel.
 * Pan chạy thẳng vào ref (không qua state) để không re-render mỗi frame.
 */
export default function World({ selectedId, hoveredId, onSelect, onHover }) {
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
    if (Math.hypot(dx, dy) > 5) d.moved = true // quá ngưỡng thì coi là kéo, không tính là click

    // màn hình -> thế giới: trục phải của camera iso là (+x,-z), trục lên là (-x,-z)
    const s = 1 / zoom
    worldRef.current.position.x = clamp(d.px + (dx + dy) * SQRT_HALF * s, PAN_LIMIT.x)
    worldRef.current.position.z = clamp(d.pz + (dy - dx) * SQRT_HALF * s, PAN_LIMIT.z)
  }

  const endDrag = () => { drag.current.active = false }

  // kéo xong không được tính là click chọn zone (moved reset ở lần pointerdown sau)
  const handleSelect = (zone) => { if (!drag.current.moved) onSelect(zone) }

  const selectedZone = zones.find((z) => z.id === selectedId)

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
          far={200}
          onUpdate={(c) => c.lookAt(0, 0, 0)}
        />

        <ambientLight intensity={0.75} />
        <directionalLight position={[8, 14, 6]} intensity={1.15} />
        <directionalLight position={[-8, 6, -4]} intensity={0.45} color="#6c63ff" />

        <group ref={worldRef}>
          {/* mặt đất dạng lưới cho ra chất "bản đồ game" */}
          <Grid
            args={[60, 60]}
            position-y={-0.24}
            cellSize={1}
            cellThickness={0.5}
            cellColor="#242863"
            sectionSize={4}
            sectionThickness={1}
            sectionColor="#6c63ff"
            fadeDistance={46}
            fadeStrength={1}
          />

          <Suspense fallback={null}>
            {zones.map((z) => (
              <Zone
                key={z.id}
                zone={z}
                active={hoveredId === z.id || selectedId === z.id}
                dimmed={Boolean(selectedId) && selectedId !== z.id}
                onSelect={handleSelect}
                onHover={onHover}
              />
            ))}
          </Suspense>

          <Character points={zones.map((z) => z.pos)} target={selectedZone?.pos ?? null} />
        </group>
      </Canvas>
    </div>
  )
}
