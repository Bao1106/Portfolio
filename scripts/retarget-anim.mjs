// ─────────────────────────────────────────────────────────────────────────────
// Retarget animation Mixamo (.fbx) sang skeleton của chibi GLB, xuất AnimationClip JSON.
// Chạy offline để runtime không phải kèm FBXLoader + file FBX 466 KB.
//
//   node scripts/retarget-anim.mjs <input.fbx> <tên clip> [output.json]
//   node scripts/retarget-anim.mjs G:/Unity/Walking.fbx Walking src/assets/walking.json
//
// Cách làm: chuyển "độ lệch so với rest pose" ở KHÔNG GIAN WORLD từ rig nguồn sang rig đích.
//   delta      = worldQuat_src(t) * worldRest_src⁻¹
//   worldQuat_dst(t) = delta * worldRest_dst
//   local_dst(t)     = worldQuat_dst(parent)⁻¹ * worldQuat_dst(bone)
// Nhờ vậy 2 rig lệch rest pose (A-pose/T-pose, trục xương ngược) vẫn ra đúng động tác.
// ─────────────────────────────────────────────────────────────────────────────
import fs from 'node:fs'
import * as THREE from 'three'
import { FBXLoader } from 'three/examples/jsm/loaders/FBXLoader.js'

const [, , FBX_IN = 'G:/Unity/Walking.fbx', CLIP_NAME = 'Walking', OUT = 'src/assets/walking.json'] = process.argv
const GLB = 'src/assets/chibi.glb'
const FPS = 30

const norm = (s) =>
  s.replace(/^mixamorig[:_]?/i, '').replace(/_\d+$/, '').replace(/[^a-z0-9]/gi, '').toLowerCase()

// ── 1. Rest pose + hệ phân cấp xương của rig đích, đọc thẳng từ JSON chunk của GLB ──
const gb = fs.readFileSync(GLB)
const gltf = JSON.parse(gb.toString('utf8', 20, 20 + gb.readUInt32LE(12)))
const jointIds = gltf.skins.flatMap((s) => s.joints)

const parentOf = new Map()
gltf.nodes.forEach((n, i) => (n.children ?? []).forEach((c) => parentOf.set(c, i)))

const localRest = new Map() // nodeId -> Quaternion
for (const id of jointIds) {
  const r = gltf.nodes[id].rotation ?? [0, 0, 0, 1]
  localRest.set(id, new THREE.Quaternion(r[0], r[1], r[2], r[3]))
}

// world rest = tích dồn theo chuỗi cha (node ngoài skin coi như identity)
const worldRestDst = new Map()
const worldRestOf = (id) => {
  if (worldRestDst.has(id)) return worldRestDst.get(id)
  const p = parentOf.get(id)
  const parentQ = p !== undefined && localRest.has(p) ? worldRestOf(p) : new THREE.Quaternion()
  const q = parentQ.clone().multiply(localRest.get(id))
  worldRestDst.set(id, q)
  return q
}
jointIds.forEach(worldRestOf)

const dstByName = new Map() // normalized -> nodeId
for (const id of jointIds) {
  const key = norm(gltf.nodes[id].name)
  if (!dstByName.has(key)) dstByName.set(key, id) // tên trùng (ngón tay) -> giữ cái đầu
}

// ── 2. Nạp FBX nguồn, lưu rest pose world ──────────────────────────────────
const buf = fs.readFileSync(FBX_IN)
const src = new FBXLoader().parse(buf.buffer.slice(buf.byteOffset, buf.byteOffset + buf.byteLength), '')
const clip = src.animations[0]
if (!clip) throw new Error('FBX không có animation nào')

const srcBones = []
src.traverse((o) => { if (o.isBone) srcBones.push(o) })
src.updateMatrixWorld(true)

const worldRestSrc = new Map()
for (const b of srcBones) worldRestSrc.set(b, b.getWorldQuaternion(new THREE.Quaternion()))

// ── 3. Lấy mẫu clip theo FPS rồi retarget từng frame ────────────────────────
const mixer = new THREE.AnimationMixer(src)
mixer.clipAction(clip).play()

const frames = Math.max(2, Math.round(clip.duration * FPS))
const times = Array.from({ length: frames + 1 }, (_, i) => (i * clip.duration) / frames)

// xương đích có track: những xương khớp tên với xương nguồn
const pairs = [] // { srcBone, dstId }
for (const b of srcBones) {
  const id = dstByName.get(norm(b.name))
  if (id !== undefined && !pairs.some((p) => p.dstId === id)) pairs.push({ srcBone: b, dstId: id })
}
// xử lý theo thứ tự cha trước con để dùng được world quat của cha
const depth = (id) => { let d = 0, c = id; while (parentOf.has(c)) { c = parentOf.get(c); d++ } return d }
pairs.sort((a, b) => depth(a.dstId) - depth(b.dstId))

const values = new Map(pairs.map((p) => [p.dstId, []]))
const worldDst = new Map()

for (const t of times) {
  mixer.setTime(t)
  src.updateMatrixWorld(true)
  worldDst.clear()

  // xương đích không có track -> giữ nguyên rest local
  const worldOf = (id) => {
    if (worldDst.has(id)) return worldDst.get(id)
    const p = parentOf.get(id)
    const parentQ = p !== undefined && localRest.has(p) ? worldOf(p) : new THREE.Quaternion()
    const q = parentQ.clone().multiply(localRest.get(id))
    worldDst.set(id, q)
    return q
  }

  for (const { srcBone, dstId } of pairs) {
    const wSrc = srcBone.getWorldQuaternion(new THREE.Quaternion())
    const delta = wSrc.clone().multiply(worldRestSrc.get(srcBone).clone().invert())
    const wDst = delta.multiply(worldRestOf(dstId))

    const p = parentOf.get(dstId)
    const parentW = p !== undefined && localRest.has(p) ? worldOf(p) : new THREE.Quaternion()
    const local = parentW.clone().invert().multiply(wDst)

    worldDst.set(dstId, wDst) // con dùng world này làm gốc
    values.get(dstId).push(local.x, local.y, local.z, local.w)
  }
}

// ── 4. Xuất clip ────────────────────────────────────────────────────────────
const round = (v) => Math.round(v * 10000) / 10000
const tracks = pairs.map(({ dstId }) =>
  new THREE.QuaternionKeyframeTrack(`${gltf.nodes[dstId].name}.quaternion`, times.map(round), values.get(dstId).map(round))
)

const json = THREE.AnimationClip.toJSON(new THREE.AnimationClip(CLIP_NAME, clip.duration, tracks))
fs.mkdirSync(OUT.replace(/[\\/][^\\/]+$/, ''), { recursive: true })
fs.writeFileSync(OUT, JSON.stringify(json))

console.log(`clip "${CLIP_NAME}" ${clip.duration.toFixed(3)}s · ${frames + 1} frames`)
console.log(`xương ghép được: ${pairs.length}/${srcBones.length}`)
console.log(`-> ${OUT} (${(fs.statSync(OUT).size / 1024).toFixed(0)} KB)`)

// ── 5. Tự kiểm: dựng lại world quat từ track vừa xuất, so với nguồn ─────────
// Sai số phải ~0, nếu lệch lớn là hệ phân cấp/thứ tự xử lý sai.
let worst = 0
const check = new Map()
const fi = Math.floor(frames / 2) // kiểm ở giữa chu kỳ đi bộ
mixer.setTime(times[fi]); src.updateMatrixWorld(true)

for (const { srcBone, dstId } of pairs) {
  const p = parentOf.get(dstId)
  const parentQ = p !== undefined && check.has(p) ? check.get(p) : worldRestOf(dstId).clone().multiply(localRest.get(dstId).clone().invert())
  const v = values.get(dstId)
  const local = new THREE.Quaternion(v[fi * 4], v[fi * 4 + 1], v[fi * 4 + 2], v[fi * 4 + 3])
  const world = parentQ.clone().multiply(local)
  check.set(dstId, world)

  const expected = srcBone.getWorldQuaternion(new THREE.Quaternion())
    .multiply(worldRestSrc.get(srcBone).clone().invert()).multiply(worldRestOf(dstId))
  worst = Math.max(worst, world.angleTo(expected) * 180 / Math.PI)
}
console.log(`tự kiểm sai số world lớn nhất: ${worst.toFixed(2)}°`)
