// ─────────────────────────────────────────────────────────────────────────────
// Toàn bộ nội dung portfolio (lấy từ CV Võ Quốc Bảo) + sơ đồ 5 zone của bản đồ.
// Sửa nội dung ở đây là web đổi theo, không phải đụng vào component.
// ─────────────────────────────────────────────────────────────────────────────

export const profile = {
  name: 'Vo Quoc Bao',
  subtitle: 'Unity Developer · 4+ Years · Mobile · Healthcare · Blockchain',
  tagline:
    'Shipped 4+ projects across gaming and healthcare. Specialized in motion tracking & performance optimization.',
  email: 'baovo110699@gmail.com',
  phone: '0989 387 642',
  phoneRaw: '+84989387642',
  github: 'https://github.com/Bao1106',
  linkedin: 'https://www.linkedin.com/in/qu%E1%BB%91c-b%E1%BA%A3o-v%C3%B5-7767862ba/',
  objective:
    'Dedicated Unity Developer with 4 years of experience in mobile games and interactive 3D applications. ' +
    'Specialized in motion tracking integration (MediaPipe, Nuitrack, Kinect) and game performance optimization.',
  education: {
    major: 'Communications and Computer Networks',
    school: 'University of Information Technology — HCM',
    period: '08/2017 – 08/2022',
  },
  references: [
    { name: 'Toan Le', role: 'Mobile Lead, Taggle Pte Ltd' },
    { name: 'Nguyễn Ngô Minh Trí', role: 'Unity Lead, KBG Group' },
  ],
}

// Đảo Experience Town: mỗi toà nhà = 1 công ty, `flag` là chữ trên cột cờ
export const experience = [
  {
    flag: 'T',
    role: 'Unity Developer / Software Engineer',
    company: 'Taggle Pte Ltd',
    period: '07/2024 – 07/2026',
    height: 1.5,
    points: [
      'Motion-based rehab games for healthcare kiosks and PC/Mobile, dùng MediaPipe, Nuitrack và Kinect',
      'Ứng dụng quản lý y tế: chăm sóc bệnh nhân tại nhà, hồ sơ bệnh án, mini-app theo Asset Bundle',
      'Tối ưu frame rate và độ ổn định cho motion analysis real-time trên PC lẫn kiosk Android',
      'Làm việc trực tiếp với đối tác Singapore trong team 23 người',
    ],
  },
  {
    flag: 'K',
    role: 'Unity Developer',
    company: 'KBG Studio',
    period: '02/2023 – 05/2024',
    height: 1.15,
    points: [
      'Game blockchain nhiều mini game + marketplace, shop, mint, inventory (team 15 người)',
      'Multiplayer real-time đồng bộ client-server qua WebSocket',
      'Tối ưu hiệu năng, build size và xử lý lỗi kỹ thuật cho mobile',
    ],
  },
  {
    flag: 'P',
    role: 'Unity Developer',
    company: 'Playground., Ltd',
    period: '01/2022 – 02/2023',
    height: 0.85,
    points: [
      'Game NFT (Monopoly, Bingo) cho Android và WebGL',
      'Gameplay mechanic, tích hợp asset 2D và Spine animation',
      'Release: Creature Hunter NFT, Bingo NFT',
    ],
  },
  {
    flag: 'H',
    role: 'Software Developer',
    company: 'Hitachi Vantara VN',
    period: '09/2020 – 09/2021',
    height: 1.3,
    points: [
      'Ứng dụng UI/WPF hiệu năng cao',
      'Phân tích yêu cầu khách hàng, thiết kế và cài đặt giải pháp',
      'Viết test case',
    ],
  },
]

// Đảo Skills Forge: 5 tinh thể, mỗi cái 1 icon + 1 thanh skill
export const skills = [
  { icon: '</>', name: 'Unity Engine', value: 95 },
  { icon: '⚙', name: 'C# & Architecture', value: 92 },
  { icon: '◉', name: 'Motion Tracking', value: 88 },
  { icon: '⚡', name: 'Performance Optimization', value: 90 },
  { icon: '≋', name: 'Networking & APIs', value: 82 },
]

export const skillTags = [
  'UGUI', 'URP', 'Asset Bundles', 'MediaPipe', 'Nuitrack', 'Kinect', 'SOLID',
  'Design Patterns', 'WebSocket', 'REST API', 'Firebase', 'Git', 'Jira', 'Rider', 'DOTween', 'Spine',
]

// Đảo Project Arena: 4 project làm ở công ty
export const companyProjects = [
  {
    name: 'Multi-Game Rehabilitation Platform',
    company: 'Taggle Pte Ltd',
    period: '07/2024 – 07/2026',
    summary:
      'Bộ game vận động cho vật lý trị liệu trên kiosk y tế và PC/Mobile, chấm động tác bằng skeletal tracking real-time.',
    points: [
      'Kiến trúc tracking lai: Kinect/Nuitrack (depth) cho độ chính xác + MediaPipe (RGB) cho mobile',
      'Exercise Logic Engine: tính góc khớp, range of motion, bám mục tiêu trị liệu từng game mode',
      'Feedback real-time: cảnh báo sai tư thế, phát hiện bệnh nhân tì vào điểm tựa',
      'Tối ưu bằng Unity Profiler: nén texture, load async, cache component để hạ GC Alloc',
    ],
    tech: ['Unity 3D', 'C#', 'MediaPipe', 'Nuitrack', 'Kinect', 'UGUI'],
  },
  {
    name: 'Healthcare Management Ecosystem',
    company: 'Taggle Pte Ltd',
    period: '07/2024 – 07/2026',
    summary:
      'Ứng dụng mobile chăm sóc bệnh nhân tại nhà và quản lý hồ sơ y tế, kiến trúc module tải mini-app theo nhu cầu.',
    points: [
      'Asset Bundle lưu trên web server: tải, cache và dọn dẹp mini-app theo vấn đề sức khoẻ từng bệnh nhân',
      'RESTful API đồng bộ hồ sơ và lịch sử khám với backend bệnh viện',
      'Chart và progress tracker theo dõi tiến trình hồi phục',
      'Tối ưu parse JSON và memory cho tập dữ liệu y tế lớn',
    ],
    tech: ['Unity Mobile', 'C#', 'Asset Bundles', 'RESTful API', 'JSON'],
  },
  {
    name: 'RunNow.io',
    company: 'KBG Studio',
    period: '02/2023 – 05/2024',
    summary: 'Game blockchain multiplayer với hệ thống marketplace, shop, mint và inventory.',
    points: [
      'Đồng bộ client-server real-time qua WebSocket API',
      'VFX và animation bằng particle system, tích hợp Spine cùng team art',
      'Tối ưu mobile: nén texture, quản lý memory, giảm build size để publish',
    ],
    tech: ['Unity 2D/3D', 'C#', 'WebSocket', 'Android SDK', 'iOS SDK', 'Spine'],
  },
  {
    name: 'Playground NFT Games',
    company: 'Playground., Ltd',
    period: '01/2022 – 02/2023',
    summary: 'Board game NFT (Monopoly, Bingo) cho Android và WebGL — đã release Creature Hunter NFT và Bingo NFT.',
    points: [
      'Player control và gameplay mechanic bằng C#',
      'Asset 2D và Spine animation cho UI/UX',
      'Socket API cho multiplayer real-time và giao dịch blockchain',
    ],
    tech: ['Unity 2D', 'Android', 'WebGL', 'Firebase SDK', 'Blockchain'],
  },
]

// Đảo Personal Lab: 3 project cá nhân, mỗi cái 1 "trạm" trên đảo
export const personalProjects = [
  {
    name: 'Paw Voyage: Pet Sort',
    tagline: 'Mobile Puzzle · Solo Developer',
    period: '07/2026 – Present',
    stack: 'Unity 6 (URP), C#, Portrait Mobile',
    summary:
      'Game puzzle sắp xếp kiểu Bus-Sort làm một mình từ core loop tới meta: 50 level, level map có sao và rương, booster, onboarding, win/lose flow, UI, VFX, audio.',
    points: [
      'Difficulty curve xác thực bằng dữ liệu: mọi level đều auto-playtest, chỉ ship khi người chơi cẩn thận clear ≥ 95%',
      'Level design tooling: designer nhập vài thông số, tool tự sinh — validate — chấm độ khó, không thể ship bàn bí hoặc soft-lock',
      'Bot tự chơi và quay video để kiểm chứng mọi thay đổi cân bằng (36/36 level pass, không kẹt)',
      'Game feel: nước stylized cho thuyền dập dềnh, pet nhảy và phản ứng, hiệu ứng lên tàu vẫn đọc được trên màn nhỏ',
      'Design log ghi lại mọi quyết định gameplay và lý do đằng sau',
    ],
    metrics: [
      { num: '50', label: 'levels' },
      { num: '95%', label: 'clear rate' },
      { num: '36/36', label: 'bot pass' },
    ],
    tech: ['Unity 6', 'URP', 'C#', 'Editor Tooling', 'Automated Playtest'],
  },
  {
    name: 'Tower Defense (3D Sci-Fi)',
    tagline: 'Solo Developer',
    period: '05/2026 – 06/2026',
    stack: 'Unity 2022 (URP), C#, DOTween',
    summary:
      'Game thủ trấn 3D sci-fi với kiến trúc tách rời, maze sinh procedural và tối ưu hiệu năng mạnh tay.',
    points: [
      'MVC + static Event Bus; Strategy (4 chế độ gán gate), Flyweight (ScriptableObject), Object Pool, State Machine cho deploy 2 pha kiểu Arknights',
      'URP Renderer Feature: toon shading + geometry outline; shader depth-test riêng cho HP bar world-space',
      'Procedural maze bằng Recursive Backtracker + A* (Manhattan), multi-gate cách ly đường đi, 6 layout map',
      'Shader variant stripping + ASTC 6x6, Static Batching, async wave loop (async/await + CancellationToken)',
    ],
    metrics: [
      { num: '−60%', label: 'build size' },
      { num: '−68%', label: 'draw calls' },
      { num: '0', label: 'GC alloc' },
    ],
    tech: ['Unity 2022', 'URP', 'C#', 'DOTween', 'A*', 'Object Pooling'],
    github: 'https://github.com/Bao1106',
  },
  {
    name: 'Motion Tracking & Pose Estimation',
    tagline: 'Demo real-time skeletal analysis',
    period: null,
    stack: 'MediaPipe, Unity, C#',
    summary: 'Demo phân tích khung xương real-time: bài tập giữ thăng bằng và bài tập với tới.',
    points: [
      'Mediapipe Pose Tracking — Balance',
      'Mediapipe Pose Tracking — Reach',
    ],
    metrics: null,
    tech: ['MediaPipe', 'Unity', 'C#', 'Pose Estimation'],
  },
]

// ── Bản đồ: 5 đảo xếp thành hình thoi, Profile Plaza ở giữa ─────────────────
// Toạ độ [x, z] trong world. Camera iso nên: -x = lên trái, -z = lên phải.
export const zones = [
  { id: 'projects', kind: 'projects', label: 'Project Arena', color: '#f59e0b', pos: [-7, 0] },
  { id: 'lab', kind: 'lab', label: 'Personal Lab', color: '#ec4899', pos: [0, -7] },
  { id: 'profile', kind: 'profile', label: 'Profile Plaza', color: '#00d4aa', pos: [0, 0] },
  { id: 'experience', kind: 'experience', label: 'Experience Town', color: '#10b981', pos: [0, 7] },
  { id: 'skills', kind: 'skills', label: 'Skills Forge', color: '#8b5cf6', pos: [7, 0] },
]
