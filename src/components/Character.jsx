import { useEffect, useMemo, useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import { useGLTF } from '@react-three/drei'
import * as THREE from 'three'
import chibiUrl from '../assets/chibi.glb?url'
import walkingClip from '../assets/walking.json'

import { zones } from '../data/portfolio'

const { damp, dampAngle, clamp } = THREE.MathUtils

// Đứng trong phạm vi một hòn đảo thì cao bằng mặt đảo, ra ngoài thì rơi về mặt lưới.
const PLATFORM_TOP = 0.21
const PLATFORM_HALF = 1.62
const groundY = (x, z) =>
  zones.some((zn) => Math.abs(x - zn.pos[0]) < PLATFORM_HALF && Math.abs(z - zn.pos[1]) < PLATFORM_HALF)
    ? PLATFORM_TOP
    : 0

const MODEL = chibiUrl

const HEIGHT = 1.25      // chiều cao mong muốn trong world (model gốc ~47 đơn vị)
const SPEED = 3.4        // đơn vị/giây
const ARRIVE = 0.25      // tới gần đích cỡ này thì dừng
const BOUND = 11         // không cho đi ra ngoài bản đồ
const IDLE_TIME = 0.22   // frame "hai chân chụm" của clip walk, dùng làm tư thế đứng

// WASD/phím mũi tên -> hướng trên màn hình isometric
// lên màn hình = (-x,-z), phải màn hình = (+x,-z)
const KEY_DIR = {
  KeyW: [-1, -1], ArrowUp: [-1, -1],
  KeyS: [1, 1], ArrowDown: [1, 1],
  KeyA: [-1, 1], ArrowLeft: [-1, 1],
  KeyD: [1, -1], ArrowRight: [1, -1],
}

/**
 * Nhân vật chibi: model GLB + clip Walking đã retarget sẵn (xem scripts/retarget-anim.mjs).
 * Điều khiển bằng WASD, hoặc click vào zone thì tự chạy tới đó.
 */
export default function Character({ target, onArrive, onManualMove }) {
  const root = useRef()
  const model = useRef()
  const keys = useRef(new Set())

  const { scene } = useGLTF(MODEL)
  // clip đã retarget sẵn ra JSON (scripts/retarget-anim.mjs) nên runtime không cần FBXLoader
  const clip = useMemo(() => THREE.AnimationClip.parse(walkingClip), [])

  // scale model về đúng tầm vóc bản đồ, tính từ bounding box thật của file
  const fitScale = useMemo(() => {
    const box = new THREE.Box3().setFromObject(scene)
    const h = box.max.y - box.min.y
    return h > 0 ? HEIGHT / h : 1
  }, [scene])

  const mixer = useMemo(() => new THREE.AnimationMixer(scene), [scene])
  const action = useRef(null)

  useEffect(() => {
    const a = mixer.clipAction(clip)
    a.play()
    action.current = a
    return () => { a.stop(); mixer.uncacheClip(clip) }
  }, [clip, mixer])

  useEffect(() => {
    const down = (e) => {
      if (!KEY_DIR[e.code]) return
      keys.current.add(e.code)
      onManualMove?.() // gõ phím thì bỏ đích click
    }
    const up = (e) => keys.current.delete(e.code)
    window.addEventListener('keydown', down)
    window.addEventListener('keyup', up)
    return () => {
      window.removeEventListener('keydown', down)
      window.removeEventListener('keyup', up)
    }
  }, [onManualMove])

  useFrame((state, dt) => {
    const g = root.current
    if (!g) return
    const step = Math.min(dt, 0.05) // tab chạy nền lâu quay lại không bị nhảy cóc

    // 1. hướng đi: ưu tiên bàn phím, không có thì đi tới đích được click
    let dx = 0
    let dz = 0
    for (const code of keys.current) {
      const d = KEY_DIR[code]
      if (d) { dx += d[0]; dz += d[1] }
    }

    if (dx || dz) {
      const len = Math.hypot(dx, dz)
      dx /= len; dz /= len
    } else if (target) {
      const tx = target[0] - g.position.x
      const tz = target[1] - g.position.z
      const dist = Math.hypot(tx, tz)
      if (dist > ARRIVE) { dx = tx / dist; dz = tz / dist }
      else onArrive?.()
    }

    const moving = dx !== 0 || dz !== 0

    if (moving) {
      g.position.x = clamp(g.position.x + dx * SPEED * step, -BOUND, BOUND)
      g.position.z = clamp(g.position.z + dz * SPEED * step, -BOUND, BOUND)
      // model Mixamo quay mặt về +Z nên atan2(dx, dz) là đúng hướng đi
      g.rotation.y = dampAngle(g.rotation.y, Math.atan2(dx, dz), 9, step)
    }

    // bước lên/xuống đảo cho mượt thay vì nhảy cấp
    g.position.y = damp(g.position.y, groundY(g.position.x, g.position.z), 8, step)

    // 2. animation: đi thì chạy clip, đứng thì khoá ở frame hai chân chụm + nhún thở
    const a = action.current
    if (a) {
      if (moving) {
        a.paused = false
      } else {
        a.paused = true
        a.time = IDLE_TIME
      }
    }
    mixer.update(step) // action.paused lo phần đứng yên

    const t = state.clock.elapsedTime
    model.current.position.y = moving ? 0 : Math.sin(t * 2.2) * 0.015
  })

  return (
    <group ref={root} position={[0, PLATFORM_TOP, 0.95]}>
      {/* bóng đổ giả */}
      <mesh rotation-x={-Math.PI / 2} position-y={0.02}>
        <circleGeometry args={[0.28, 24]} />
        <meshBasicMaterial color="#000000" transparent opacity={0.4} depthWrite={false} />
      </mesh>

      <group ref={model}>
        <primitive object={scene} scale={fitScale} />
      </group>
    </group>
  )
}

useGLTF.preload(MODEL)
