// Kiểm tra clip đã retarget có bind được vào skeleton trong GLB không.
// Dựng lại hệ xương từ JSON chunk của GLB rồi cho AnimationMixer chạy thử,
// nếu tên track sai thì three sẽ bind hụt và không xương nào đổi tư thế.
//
//   node scripts/check-anim.mjs
import fs from 'node:fs'
import * as THREE from 'three'

const GLB = 'src/assets/chibi.glb'
const CLIP = 'src/assets/walking.json'

const gb = fs.readFileSync(GLB)
const gltf = JSON.parse(gb.toString('utf8', 20, 20 + gb.readUInt32LE(12)))

// dựng cây Object3D theo đúng tên + rest pose của GLB
const objs = gltf.nodes.map((n) => {
  const o = new THREE.Object3D()
  o.name = n.name
  if (n.rotation) o.quaternion.fromArray(n.rotation)
  if (n.translation) o.position.fromArray(n.translation)
  return o
})
const isChild = new Set()
gltf.nodes.forEach((n, i) => (n.children ?? []).forEach((c) => { objs[i].add(objs[c]); isChild.add(c) }))
const root = new THREE.Object3D()
objs.forEach((o, i) => { if (!isChild.has(i)) root.add(o) })

const clip = THREE.AnimationClip.parse(JSON.parse(fs.readFileSync(CLIP, 'utf8')))
const rest = new Map(objs.map((o) => [o.name, o.quaternion.clone()]))

const mixer = new THREE.AnimationMixer(root)
mixer.clipAction(clip).play()
mixer.setTime(clip.duration * 0.45) // giữa chu kỳ bước, tư thế phải khác rest nhiều nhất

let moved = 0
let maxDeg = 0
const missing = []
for (const track of clip.tracks) {
  const name = track.name.slice(0, track.name.lastIndexOf('.'))
  const obj = objs.find((o) => o.name === name)
  if (!obj) { missing.push(name); continue }
  const deg = obj.quaternion.angleTo(rest.get(name)) * 180 / Math.PI
  if (deg > 0.5) moved++
  maxDeg = Math.max(maxDeg, deg)
}

console.log(`clip "${clip.name}" ${clip.duration.toFixed(3)}s, ${clip.tracks.length} tracks`)
console.log(`bind được: ${clip.tracks.length - missing.length}/${clip.tracks.length}`)
console.log(`xương đổi tư thế: ${moved} (lệch lớn nhất ${maxDeg.toFixed(1)}°)`)
if (missing.length) console.log('KHÔNG khớp tên:', missing.join(', '))

// ── Đo bước chân để suy ra tốc độ mà clip "ăn khớp mặt đất" ─────────────────
// Đi nhanh hơn tốc độ này thì phải tăng timeScale, không thì chân trượt trên băng.
// Con số in ra ở đây chính là CLIP_SPEED trong src/components/Character.jsx.
const foot = (side) => objs.find((o) => new RegExp(`^${side}_?Foot`, 'i').test(o.name))
const [lf, rf] = [foot('Left'), foot('Right')]
const head = objs.find((o) => /HeadTop/i.test(o.name))
const hip = objs.find((o) => /^Hips/i.test(o.name))

if (lf && rf && head && hip) {
  const a = new THREE.Vector3(); const b = new THREE.Vector3()
  let stride = 0
  for (let i = 0; i <= 40; i++) {
    mixer.setTime((clip.duration * i) / 40)
    root.updateMatrixWorld(true)
    lf.getWorldPosition(a); rf.getWorldPosition(b)
    stride = Math.max(stride, Math.abs(a.z - b.z)) // 2 bàn chân cách nhau xa nhất = độ dài 1 bước
  }
  mixer.setTime(0); root.updateMatrixWorld(true)
  head.getWorldPosition(a)
  const modelH = a.y // chiều cao model trong đơn vị scene
  const perCycle = 2 * stride // 1 chu kỳ = 2 bước
  console.log(`bước chân: ${stride.toFixed(4)} / model cao ${modelH.toFixed(4)} đơn vị scene`)
  console.log(`=> CLIP_SPEED = ${((perCycle / modelH) / clip.duration).toFixed(3)} × HEIGHT (đơn vị/giây)`)
}

const ok = missing.length === 0 && moved >= 15 && maxDeg > 10
console.log(ok ? 'OK — animation sẽ chạy trên model' : 'LỖI — clip không tác động lên skeleton')
process.exit(ok ? 0 : 1)
