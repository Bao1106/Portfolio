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

const ok = missing.length === 0 && moved >= 15 && maxDeg > 10
console.log(ok ? 'OK — animation sẽ chạy trên model' : 'LỖI — clip không tác động lên skeleton')
process.exit(ok ? 0 : 1)
