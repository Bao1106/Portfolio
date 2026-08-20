// ─────────────────────────────────────────────────────────────────────────────
// Toàn bộ nội dung portfolio nằm ở file này (lấy từ CV Võ Quốc Bảo).
// THAY ẢNH: bỏ file vào public/thumbnails/ rồi sửa `image` thành '/thumbnails/ten-file.jpg'
// Để `image: null` thì card tự dùng placeholder màu (vẽ bằng canvas, không cần file).
// ─────────────────────────────────────────────────────────────────────────────

export const profile = {
  name: 'Quốc Bảo',
  fullName: 'Võ Quốc Bảo',
  role: 'Unity Developer',
  tagline: '4 năm kinh nghiệm game mobile & ứng dụng 3D tương tác',
  email: 'baovo110699@gmail.com',
  phone: '0989387642',
  location: 'Việt Nam',
  github: 'https://github.com/Bao1106',
  linkedin: 'https://www.linkedin.com/in/qu%E1%BB%91c-b%E1%BA%A3o-v%C3%B5-7767862ba/',
  about:
    'Unity Developer với 4 năm kinh nghiệm phát triển game mobile và ứng dụng 3D tương tác. ' +
    'Chuyên sâu về tích hợp motion tracking (MediaPipe, Nuitrack, Kinect) và tối ưu hiệu năng game. ' +
    'Đã ship 4+ dự án mobile trong mảng gaming và healthcare.',
  skills: [
    'Unity 2D/3D', 'C# / OOP / SOLID', 'Design Patterns', 'URP & Shader',
    'MediaPipe', 'Nuitrack', 'Kinect', 'UGUI', 'Asset Bundles',
    'REST / WebSocket', 'Unity Profiler', 'Git',
  ],
}

export const projects = [
  {
    id: 'tower-defense',
    title: 'Tower Defense (3D Sci-Fi)',
    role: 'Solo Developer — Personal Project',
    period: '05/2026 – 06/2026',
    color: '#6c63ff',
    category: 'Personal Project · Solo Dev',
    image: null, // ví dụ: '/thumbnails/tower-defense.jpg'
    description:
      'Game thủ trấn 3D sci-fi làm một mình trên Unity 2022 (URP): kiến trúc MVC tách rời với ' +
      'static Event Bus, deploy 2 pha kiểu Arknights (kéo thả + chọn hướng), maze sinh procedural ' +
      'và pathfinding A*.',
    highlights: [
      'MVC + Event Bus; Strategy (4 chế độ gán gate), Flyweight (ScriptableObject config), Object Pool, State Machine',
      'URP Renderer Feature: toon shading + geometry outline, shader custom depth-test cho HP bar world-space',
      'Procedural maze bằng Recursive Backtracker + A* (Manhattan), 6 layout map, multi-gate cách ly đường đi',
      'Giảm 60% build size (255 → 102 MB), giảm 68% draw call (2792 → 887 batches), runtime zero-alloc',
    ],
    tech: ['Unity 2022', 'URP', 'C#', 'DOTween', 'Shader Graph', 'A*', 'Object Pooling'],
    demo: null, // dán link gameplay demo vào đây
    github: 'https://github.com/Bao1106',
  },
  {
    id: 'rehab-platform',
    title: 'Multi-Game Rehabilitation Platform',
    role: 'Unity Developer — Taggle Pte Ltd',
    period: '07/2024 – 07/2026',
    color: '#00d4ff',
    category: 'Healthcare · Motion Tracking',
    image: null,
    description:
      'Bộ game vận động dành cho vật lý trị liệu, chạy trên kiosk y tế và PC/Mobile. Mỗi game bám ' +
      'một phác đồ phục hồi chức năng riêng, chấm điểm động tác bằng skeletal tracking real-time.',
    highlights: [
      'Kiến trúc tracking lai: depth sensor (Kinect, Nuitrack) cho độ chính xác + MediaPipe RGB cho mobile',
      'Exercise Logic Engine: tính góc khớp, range of motion, bám mục tiêu trị liệu theo từng game mode',
      'Feedback real-time: cảnh báo sai tư thế, phát hiện vật cản / bệnh nhân tì vào điểm tựa',
      'Tối ưu bằng Unity Profiler: nén texture giảm draw call, load async, cache component để hạ GC Alloc',
      'UI UGUI responsive cho màn hình kiosk, thiết kế cho bệnh nhân hạn chế vận động',
    ],
    tech: ['Unity 3D', 'C#', 'MediaPipe', 'Nuitrack', 'Kinect', 'UGUI', 'Unity Profiler'],
    demo: null, // link video "Mediapipe Pose Tracking Balance / Reach"
    github: null,
  },
  {
    id: 'healthcare-app',
    title: 'Healthcare Management Ecosystem',
    role: 'Unity Developer / Software Engineer — Taggle Pte Ltd',
    period: '07/2024 – 07/2026',
    color: '#a855f7',
    category: 'Mobile · Healthcare Suite',
    image: null,
    description:
      'Bộ ứng dụng mobile chăm sóc bệnh nhân tại nhà và quản lý hồ sơ y tế, kiến trúc module cho phép ' +
      'tải về các mini-app sức khoẻ theo đúng vấn đề của từng bệnh nhân.',
    highlights: [
      'Modular content delivery: mini-app đóng gói Asset Bundle lưu trên web server, tải theo nhu cầu',
      'Quản lý vòng đời asset: download, cache, dọn dẹp để tối ưu dung lượng máy',
      'Tích hợp RESTful API đồng bộ hồ sơ và lịch sử khám với backend bệnh viện',
      'Data visualization: chart và progress tracker theo dõi tiến trình hồi phục',
      'Tối ưu parse JSON và memory cho tập dữ liệu y tế lớn, thao tác async mượt',
    ],
    tech: ['Unity Mobile', 'C#', 'Asset Bundles', 'RESTful API', 'JSON', 'Web Storage'],
    demo: null,
    github: null,
  },
  {
    id: 'runnow',
    title: 'RunNow.io',
    role: 'Unity Developer — KBG Studio',
    period: '02/2023 – 05/2024',
    color: '#f472b6',
    category: 'Blockchain · Multiplayer',
    image: null,
    description:
      'Dự án game blockchain nhiều mini game kèm hệ thống quản lý phức tạp (marketplace, shop, mint, ' +
      'inventory), phát triển trong team 15 người.',
    highlights: [
      'Game multiplayer real-time, đồng bộ client-server qua WebSocket API',
      'Làm VFX và animation bằng particle system, tích hợp Spine animation cùng team art',
      'Tối ưu mobile: nén texture, quản lý memory, giảm build size để publish',
      'Phối hợp cross-functional với artist, designer và QA để kịp deadline',
    ],
    tech: ['Unity 2D/3D', 'C#', 'REST / WebSocket', 'Android SDK', 'iOS SDK', 'Spine'],
    demo: null,
    github: null,
  },
  {
    id: 'nft-board-games',
    title: 'NFT Board Games — Creature Hunter & Bingo',
    role: 'Unity Developer — Playground., ltd',
    period: '01/2022 – 02/2023',
    color: '#2dd4bf',
    category: 'NFT Board Game',
    image: null,
    description:
      'Các game NFT board (Monopoly, Bingo) cho Android và WebGL, đã release Creature Hunter NFT và Bingo NFT.',
    highlights: [
      'Cài đặt player control và gameplay mechanic cho board game NFT bằng C#',
      'Tích hợp asset 2D và Spine animation cho UI/UX',
      'Socket API client-server cho multiplayer real-time và giao dịch blockchain',
      'Bảo trì và mở rộng content, đảm bảo bàn giao đúng deadline test',
    ],
    tech: ['Unity 2D', 'Android', 'WebGL', 'Firebase SDK', 'Blockchain', 'REST / WebSocket'],
    demo: null,
    github: null,
  },
]

// ── Placeholder: vẽ ảnh gradient + tên project bằng canvas, trả về data URL ──
// Nhờ vậy app chạy được ngay cả khi chưa có ảnh thật; có ảnh thật thì chỉ cần set `image`.
const cache = new Map()

export function getThumb(p) {
  if (p.image) return p.image
  if (cache.has(p.id)) return cache.get(p.id)

  const c = document.createElement('canvas')
  c.width = 1024
  c.height = 576
  const ctx = c.getContext('2d')

  const g = ctx.createLinearGradient(0, 0, c.width, c.height)
  g.addColorStop(0, p.color)
  g.addColorStop(1, '#0b1026')
  ctx.fillStyle = g
  ctx.fillRect(0, 0, c.width, c.height)

  // lưới mờ cho đỡ phẳng
  ctx.strokeStyle = 'rgba(255,255,255,0.08)'
  ctx.lineWidth = 2
  for (let x = 0; x < c.width; x += 64) { ctx.beginPath(); ctx.moveTo(x, 0); ctx.lineTo(x, c.height); ctx.stroke() }
  for (let y = 0; y < c.height; y += 64) { ctx.beginPath(); ctx.moveTo(0, y); ctx.lineTo(c.width, y); ctx.stroke() }

  ctx.fillStyle = 'rgba(255,255,255,0.95)'
  ctx.font = 'bold 54px system-ui, sans-serif'
  ctx.textAlign = 'center'
  wrapText(ctx, p.title, c.width / 2, c.height / 2 - 10, c.width - 120, 66)

  ctx.font = '28px system-ui, sans-serif'
  ctx.fillStyle = 'rgba(255,255,255,0.6)'
  ctx.fillText('PLACEHOLDER — thay ảnh ở public/thumbnails/', c.width / 2, c.height - 60)

  const url = c.toDataURL('image/png')
  cache.set(p.id, url)
  return url
}

function wrapText(ctx, text, x, y, maxWidth, lineHeight) {
  const words = text.split(' ')
  const lines = []
  let line = ''
  for (const w of words) {
    const test = line ? line + ' ' + w : w
    if (ctx.measureText(test).width > maxWidth && line) { lines.push(line); line = w }
    else line = test
  }
  lines.push(line)
  const startY = y - ((lines.length - 1) * lineHeight) / 2
  lines.forEach((l, i) => ctx.fillText(l, x, startY + i * lineHeight))
}
