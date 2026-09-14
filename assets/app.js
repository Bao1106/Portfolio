/* ─────────────────────────────────────────────────────────────────────────────
   Toàn bộ nội dung portfolio (lấy từ CV Võ Quốc Bảo) + phần render.
   Sửa nội dung ở các hằng số bên dưới là trang tự đổi theo.

   Song ngữ: field nào khác nhau giữa 2 ngôn ngữ thì viết { en, vi }, field nào
   là jargon/tên riêng (tên project, tech stack, tag ngắn...) thì để nguyên 1
   chuỗi dùng chung — hàm t() bên dưới tự nhận diện và xử lý cả hai kiểu.
   ───────────────────────────────────────────────────────────────────────────── */

const PROFILE = {
  email: 'baovo110699@gmail.com',
  phone: '0989 387 642',
  phoneRaw: '+84989387642',
  github: 'https://github.com/Bao1106',
  linkedin: 'https://www.linkedin.com/in/qbv1106/',
  references: [
    { name: 'Toan Le', role: 'Mobile Lead, Taggle Pte Ltd' },
    { name: 'Nguyễn Ngô Minh Trí', role: 'Unity Lead, KBG Group' },
  ],
}

const STATS = [
  { num: 68, prefix: '−', suffix: '%', label: { en: 'draw calls (Tower Defense)', vi: 'draw calls (Tower Defense)' } },
  { num: 0, suffix: ' B', label: { en: 'alloc per shot (VR)', vi: 'alloc mỗi phát bắn (VR)' } },
  { num: 2, label: { en: 'countries deployed', vi: 'quốc gia đã triển khai' } },
]

const EXPERIENCE = [
  {
    role: 'Unity Developer / Software Engineer',
    company: 'Taggle Pte Ltd · Singapore',
    date: '07/2024 – 07/2026',
    points: [
      {
        en: 'Owned 3 motion-based rehabilitation games end-to-end — kiosk, PC and mobile — and supported them on-site at health exhibitions in Singapore and the Philippines',
        vi: 'Own end-to-end 3 game motion-based rehabilitation — kiosk, PC và mobile — và support on-site tại các triển lãm y tế ở Singapore và Philippines',
      },
      {
        en: 'Architected real-time skeletal tracking with MediaPipe, Nuitrack and Kinect for pose estimation',
        vi: 'Kiến trúc skeletal tracking real-time với MediaPipe, Nuitrack và Kinect cho pose estimation',
      },
      {
        en: 'Exercise monitoring logic: movement accuracy, goal tracking, live feedback on improper posture or obstacles',
        vi: 'Logic theo dõi bài tập: tính accuracy động tác, goal tracking, feedback real-time khi sai tư thế hoặc vướng vật cản',
      },
      {
        en: 'Profiled motion analysis on PC and Android kiosks — texture compression, async loading, event-driven logic with cached lookups to cut GC alloc in the per-frame path',
        vi: 'Profile motion analysis trên PC và kiosk Android — nén texture, async loading, logic event-driven kèm cache lookup để giảm GC alloc trong per-frame path',
      },
      {
        en: 'Healthcare management app deployed across hospital systems in Singapore and the Philippines — home-based patient care, medical records, Asset Bundle content delivery',
        vi: 'App quản lý y tế deploy vào hệ thống bệnh viện ở Singapore và Philippines — chăm sóc bệnh nhân tại nhà, hồ sơ bệnh án, content delivery bằng Asset Bundle',
      },
      {
        en: 'Collaborated directly with partners in Singapore inside a 23-person team',
        vi: 'Làm việc trực tiếp với đối tác ở Singapore trong team 23 người',
      },
    ],
  },
  {
    role: 'Unity Developer',
    company: 'KBG Studio',
    date: '02/2023 – 05/2024',
    points: [
      {
        en: 'Blockchain game with multiple mini games and complex management systems (marketplace, shop, mint, inventory) in a 15-person team',
        vi: 'Game blockchain gồm nhiều mini game và hệ thống quản lý phức tạp (marketplace, shop, mint, inventory) trong team 15 người',
      },
      {
        en: 'Optimized game performance, build size and resolved technical issues on mobile',
        vi: 'Tối ưu hiệu năng game, build size và xử lý các vấn đề kỹ thuật trên mobile',
      },
      {
        en: 'Worked with artists, designers and QA to deliver on schedule',
        vi: 'Phối hợp với artist, designer và QA để deliver đúng tiến độ',
      },
    ],
  },
  {
    role: 'Unity Developer',
    company: 'Playground., Ltd',
    date: '01/2022 – 02/2023',
    points: [
      { en: 'NFT games (Monopoly, Bingo) for Android and WebGL', vi: 'Game NFT (Monopoly, Bingo) cho Android và WebGL' },
      {
        en: 'Gameplay mechanics and features, content creation and maintenance',
        vi: 'Xây dựng gameplay mechanic và feature, tạo và maintain content',
      },
      { en: 'Released: Creature Hunter NFT, Bingo NFT', vi: 'Đã release: Creature Hunter NFT, Bingo NFT' },
    ],
  },
  {
    role: 'Software Developer',
    company: 'Hitachi Vantara VN',
    date: '09/2020 – 09/2021',
    points: [
      { en: 'High-performance UI/WPF applications', vi: 'Ứng dụng UI/WPF hiệu năng cao' },
      {
        en: 'Analyzed customer requirements, defined and implemented solutions',
        vi: 'Phân tích yêu cầu khách hàng, định nghĩa và triển khai giải pháp',
      },
      { en: 'Wrote test cases', vi: 'Viết test case' },
    ],
  },
]

const ICON = {
  cube: '<polygon points="12 2 2 7 12 12 22 7 12 2"/><polyline points="2 17 12 22 22 17"/><polyline points="2 12 12 17 22 12"/>',
  code: '<polyline points="16 18 22 12 16 6"/><polyline points="8 6 2 12 8 18"/>',
  globe: '<circle cx="12" cy="12" r="10"/><line x1="2" y1="12" x2="22" y2="12"/><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/>',
  bolt: '<polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/>',
  monitor: '<rect x="2" y="3" width="20" height="14" rx="2" ry="2"/><line x1="8" y1="21" x2="16" y2="21"/><line x1="12" y1="17" x2="12" y2="21"/>',
  tool: '<path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z"/>',
  vr: '<rect x="2" y="7" width="20" height="10" rx="3"/><circle cx="8" cy="12" r="2"/><circle cx="16" cy="12" r="2"/><path d="M10 12h4"/>',
}

const SKILLS = [
  { name: { en: 'Unity Engine', vi: 'Unity Engine' }, icon: ICON.cube, value: 85, tags: ['2D/3D', 'UGUI', 'URP', 'Asset Bundles', 'Multi-platform'] },
  { name: { en: 'XR / VR', vi: 'XR / VR' }, icon: ICON.vr, value: 65, tags: ['XR Interaction Toolkit', 'OpenXR', 'XR Device Simulator', 'Android/Quest'] },
  { name: { en: 'C# & Architecture', vi: 'C# & Architecture' }, icon: ICON.code, value: 82, tags: ['OOP', 'SOLID', 'Design Patterns', 'Event-driven'] },
  { name: { en: 'Motion Tracking', vi: 'Motion Tracking' }, icon: ICON.globe, value: 78, tags: ['MediaPipe', 'Nuitrack', 'Kinect', 'Pose Estimation'] },
  { name: { en: 'Performance', vi: 'Hiệu năng' }, icon: ICON.bolt, value: 80, tags: ['Unity Profiler', 'Draw Calls', 'Memory', 'GC Alloc'] },
  { name: { en: 'Networking', vi: 'Networking' }, icon: ICON.monitor, value: 72, tags: ['REST API', 'WebSocket', 'JSON', 'Firebase'] },
  { name: { en: 'Tools', vi: 'Công cụ' }, icon: ICON.tool, value: 75, tags: ['Git', 'Sourcetree', 'Jira', 'Rider', 'Photoshop', 'DOTween', 'Spine'] },
]

/* ── Ảnh minh hoạ mỗi project, dựng bằng CSS thuần ─────────────────────────── */

// Paw Voyage có icon thật nên dùng luôn thay vì vẽ lưới giả
const pawScreen = () => `
  <img class="pr-icon" src="assets/media/paw-voyage-icon.webp" alt="Icon game Paw Voyage: Pet Sort"
       width="512" height="512" loading="lazy" decoding="async" />`

const towerScreen = () => `
  <div class="tower-map">
    <div class="tower-path" style="left:10px;top:10px;width:110px;height:7px"></div>
    <div class="tower-path" style="left:113px;top:10px;width:7px;height:110px"></div>
    <div class="tower-path" style="left:10px;top:113px;width:110px;height:7px"></div>
    <div class="tower-path" style="left:10px;top:10px;width:7px;height:110px"></div>
    ${[[28, 28], [88, 28], [28, 88], [88, 88]].map(([l, t]) => `<div class="tower-turret" style="left:${l}px;top:${t}px"></div>`).join('')}
    <div class="tower-enemy"></div>
  </div>`

// Khung xương: vẽ khớp + nối xương bằng cách xoay từng thanh
const poseScreen = (rings = true) => {
  const J = {
    head: [60, 20], neck: [60, 40], hip: [60, 82],
    shL: [40, 46], shR: [80, 46], elL: [28, 68], elR: [92, 68], hdL: [24, 92], hdR: [96, 92],
    hipL: [48, 84], hipR: [72, 84], knL: [44, 112], knR: [76, 112], ftL: [40, 140], ftR: [80, 140],
  }
  const BONES = [
    ['neck', 'hip'], ['shL', 'shR'], ['neck', 'shL'], ['neck', 'shR'],
    ['shL', 'elL'], ['elL', 'hdL'], ['shR', 'elR'], ['elR', 'hdR'],
    ['hip', 'hipL'], ['hip', 'hipR'], ['hipL', 'knL'], ['knL', 'ftL'], ['hipR', 'knR'], ['knR', 'ftR'],
  ]
  const bones = BONES.map(([a, b]) => {
    const [x1, y1] = J[a]; const [x2, y2] = J[b]
    const len = Math.hypot(x2 - x1, y2 - y1)
    const deg = (Math.atan2(y2 - y1, x2 - x1) * 180) / Math.PI
    return `<span class="pose-bone" style="left:${x1}px;top:${y1}px;width:${len}px;transform:rotate(${deg}deg)"></span>`
  }).join('')
  const joints = Object.entries(J).map(([k, [x, y]], i) => {
    const big = k === 'head' ? 'width:18px;height:18px;margin:-9px 0 0 -9px;' : ''
    return `<span class="pose-joint" style="left:${x}px;top:${y}px;${big}animation-delay:${(i * 0.11).toFixed(2)}s"></span>`
  }).join('')
  const ring = rings ? '<span class="pose-ring" style="left:6px;top:-2px;width:108px;height:108px"></span>' : ''
  return `<div class="pose-fig">${ring}${bones}${joints}</div>`
}

const healthScreen = () => `
  <div class="health-ui">
    <div class="health-chart">
      ${[34, 52, 40, 68, 58, 82].map((h) => `<div class="health-bar" style="height:${h}px"></div>`).join('')}
    </div>
    <div class="health-cards">
      ${['on', '', 'on', '', ''].map((c) => `<div class="health-row ${c}"></div>`).join('')}
    </div>
  </div>`

const runScreen = () => `
  <div class="run-track">
    <div class="run-dot"></div>
    ${[[20, 8], [120, 20], [70, 74], [10, 60]].map(([l, t], i) => `<div class="run-coin" style="left:${l}px;top:${t}px;animation-delay:${i * 0.4}s"></div>`).join('')}
  </div>`

const nftScreen = () => {
  const on = new Set([0, 3, 6, 8, 12, 14, 16, 18, 21, 24])
  return `<div class="nft-board">${Array.from({ length: 25 }, (_, i) => `<div class="nft-cell ${on.has(i) ? 'on' : ''}"></div>`).join('')}</div>`
}

/* ── Project ở công ty (phần Projects trong CV) ────────────────────────────── */

const WORK_PROJECTS = [
  {
    id: 'rehab',
    title: 'Multi-Game Rehabilitation Platform',
    meta: 'Taggle Pte Ltd · Unity 3D · MediaPipe / Nuitrack / Kinect · 07/2024 – 07/2026',
    screenClass: 'sc-pose',
    screen: poseScreen,
    tags: [{ t: 'Motion Tracking' }, { t: { en: 'Healthcare Kiosk', vi: 'Healthcare Kiosk' }, sec: true }, { t: 'PC / Mobile', sec: true }],
    sub: { en: 'Unity Developer · Taggle Pte Ltd · 07/2024 – 07/2026', vi: 'Unity Developer · Taggle Pte Ltd · 07/2024 – 07/2026' },
    media: { video: 'assets/media/rehab-platform-demo.mp4', poster: 'assets/media/rehab-platform-poster.jpg', wide: true },
    body: {
      en: `
      <p>A suite of interactive motion-based games tailored for physical therapy protocols on healthcare kiosks and PC/mobile. Each game targets specific rehabilitation needs through real-time skeletal tracking.</p>
      <h4>Hybrid tracking architecture</h4>
      <ul>
        <li>3D depth sensors (Kinect, Nuitrack) for high-precision spatial analysis</li>
        <li>RGB-based computer vision (MediaPipe) for accessible 2D tracking on mobile devices</li>
      </ul>
      <h4>Exercise logic &amp; feedback</h4>
      <ul>
        <li>Modular engine calculating movement accuracy — joint angles, range of motion — against per-game therapy goals</li>
        <li>Feedback layer that detects and warns about improper posture or environmental obstacles, e.g. a user leaning on external support</li>
      </ul>
      <h4>Performance &amp; UX</h4>
      <ul>
        <li>Unity Profiler to find bottlenecks; texture compression to cut draw calls and memory footprint</li>
        <li>Async loading and efficient resource management for faster start-up</li>
        <li>Event-driven logic and cached components to minimise GC alloc — kiosks run for long stretches without restarts</li>
        <li>Responsive UGUI built for kiosk screens and patients with limited mobility</li>
      </ul>
      <div class="metric-row">
        <div class="metric-box"><div class="num">3</div><div class="label">tracking SDKs</div></div>
        <div class="metric-box"><div class="num">3</div><div class="label">games on-site</div></div>
        <div class="metric-box"><div class="num">2</div><div class="label">countries</div></div>
      </div>
      <div class="hl-box"><p><strong>Why it mattered:</strong> the same exercise logic had to stay accurate on a depth-sensor kiosk and on a phone camera — the tracking layer is swappable, the scoring layer is not.</p></div>
    `,
      vi: `
      <p>Bộ game motion-based cho các phác đồ vật lý trị liệu, chạy trên healthcare kiosk và PC/mobile. Mỗi game nhắm vào một nhu cầu rehabilitation cụ thể bằng skeletal tracking real-time.</p>
      <h4>Kiến trúc tracking lai</h4>
      <ul>
        <li>Depth sensor 3D (Kinect, Nuitrack) cho phân tích không gian độ chính xác cao</li>
        <li>Computer vision dựa trên RGB (MediaPipe) để tracking 2D dễ tiếp cận trên thiết bị mobile</li>
      </ul>
      <h4>Logic bài tập &amp; feedback</h4>
      <ul>
        <li>Engine module tính accuracy động tác — góc khớp, range of motion — so với mục tiêu trị liệu của từng game</li>
        <li>Lớp feedback phát hiện và cảnh báo tư thế sai hoặc vật cản môi trường, ví dụ khi bệnh nhân tựa vào vật hỗ trợ bên ngoài</li>
      </ul>
      <h4>Hiệu năng &amp; UX</h4>
      <ul>
        <li>Dùng Unity Profiler để tìm bottleneck; nén texture để giảm draw call và memory footprint</li>
        <li>Async loading và quản lý resource hiệu quả để start-up nhanh hơn</li>
        <li>Logic event-driven và cache component để giảm GC alloc — kiosk chạy liên tục thời gian dài không restart</li>
        <li>UGUI responsive xây riêng cho màn hình kiosk và bệnh nhân hạn chế vận động</li>
      </ul>
      <div class="metric-row">
        <div class="metric-box"><div class="num">3</div><div class="label">tracking SDK</div></div>
        <div class="metric-box"><div class="num">3</div><div class="label">game triển lãm on-site</div></div>
        <div class="metric-box"><div class="num">2</div><div class="label">quốc gia</div></div>
      </div>
      <div class="hl-box"><p><strong>Vì sao quan trọng:</strong> cùng một logic bài tập phải chính xác như nhau trên kiosk gắn depth-sensor lẫn trên camera điện thoại — lớp tracking có thể đổi, lớp chấm điểm thì không.</p></div>
    `,
    },
    tech: ['Unity 3D', 'C#', 'MediaPipe', 'Nuitrack', 'Kinect', 'UGUI', 'Unity Profiler'],
  },
  {
    id: 'health',
    title: 'Healthcare Management Ecosystem',
    meta: 'Taggle Pte Ltd · Unity Mobile · Asset Bundles · REST API · 07/2024 – 07/2026',
    screenClass: 'sc-health',
    screen: healthScreen,
    tags: [{ t: { en: 'Mobile App', vi: 'Mobile App' } }, { t: 'Asset Bundles', sec: true }, { t: 'REST API', sec: true }],
    sub: { en: 'Unity Developer / Software Engineer · Taggle Pte Ltd · 07/2024 – 07/2026', vi: 'Unity Developer / Software Engineer · Taggle Pte Ltd · 07/2024 – 07/2026' },
    body: {
      en: `
      <p>A mobile application suite for home-based patient care and medical record management, with a modular architecture that delivers specialised health mini-apps on demand.</p>
      <h4>Modular content delivery</h4>
      <ul>
        <li>Dynamic Asset Bundle system pulling mini-apps from web servers, so each patient only gets the tools their condition needs</li>
        <li>Managed download, caching and lifecycle of modular assets to keep phone storage under control</li>
      </ul>
      <h4>Data &amp; visualization</h4>
      <ul>
        <li>RESTful API integration syncing patient records and medical history with the hospital backend</li>
        <li>Custom charts and progress trackers so patients and doctors can read recovery trends at a glance</li>
      </ul>
      <h4>Performance</h4>
      <ul>
        <li>Refined JSON parsing and data handling for large medical datasets</li>
        <li>Async operations and careful memory management of dynamic resources</li>
      </ul>
      <div class="metric-row">
        <div class="metric-box"><div class="num">2</div><div class="label">countries deployed</div></div>
        <div class="metric-box"><div class="num">✓</div><div class="label">hospital systems</div></div>
        <div class="metric-box"><div class="num">✓</div><div class="label">Asset Bundle delivery</div></div>
      </div>
    `,
      vi: `
      <p>Bộ app mobile cho chăm sóc bệnh nhân tại nhà và quản lý hồ sơ y tế, kiến trúc modular giao mini-app y tế theo nhu cầu.</p>
      <h4>Content delivery modular</h4>
      <ul>
        <li>Hệ thống Asset Bundle động kéo mini-app từ web server, mỗi bệnh nhân chỉ nhận đúng tool họ cần</li>
        <li>Quản lý download, cache và lifecycle của asset modular để kiểm soát dung lượng máy</li>
      </ul>
      <h4>Data &amp; visualization</h4>
      <ul>
        <li>Tích hợp RESTful API đồng bộ hồ sơ bệnh nhân và lịch sử khám với backend bệnh viện</li>
        <li>Chart và progress tracker riêng để bệnh nhân và bác sĩ đọc xu hướng hồi phục nhanh</li>
      </ul>
      <h4>Hiệu năng</h4>
      <ul>
        <li>Tối ưu parse JSON và xử lý dữ liệu cho dataset y tế lớn</li>
        <li>Thao tác async và quản lý memory kỹ cho resource động</li>
      </ul>
      <div class="metric-row">
        <div class="metric-box"><div class="num">2</div><div class="label">quốc gia triển khai</div></div>
        <div class="metric-box"><div class="num">✓</div><div class="label">hospital systems</div></div>
        <div class="metric-box"><div class="num">✓</div><div class="label">Asset Bundle delivery</div></div>
      </div>
    `,
    },
    tech: ['Unity (Mobile)', 'C#', 'Asset Bundles', 'RESTful API', 'JSON', 'Web Storage'],
  },
  {
    id: 'runnow',
    title: 'RunNow.io',
    meta: 'KBG Studio · Unity 2D/3D · WebSocket · Android / iOS · 02/2023 – 05/2024',
    screenClass: 'sc-run',
    screen: runScreen,
    tags: [{ t: { en: 'Blockchain', vi: 'Blockchain' } }, { t: { en: 'Multiplayer', vi: 'Multiplayer' }, sec: true }, { t: 'Spine', sec: true }],
    sub: { en: 'Unity Developer · KBG Studio · 02/2023 – 05/2024', vi: 'Unity Developer · KBG Studio · 02/2023 – 05/2024' },
    body: {
      en: `
      <p>Blockchain-based multiplayer games inside a larger product with marketplace, shop, mint and inventory systems, built with a 15-person team.</p>
      <h4>Gameplay &amp; networking</h4>
      <ul>
        <li>Real-time client-server synchronization over a WebSocket API</li>
        <li>Visual effects and animations with particle systems; integrated complex Spine animations with the art team</li>
      </ul>
      <h4>Mobile optimization</h4>
      <ul>
        <li>Texture compression, memory management and build size reduction for smooth publishing</li>
        <li>Resolved platform-specific technical issues ahead of store releases</li>
      </ul>
    `,
      vi: `
      <p>Game multiplayer blockchain nằm trong một sản phẩm lớn hơn gồm hệ thống marketplace, shop, mint và inventory, làm cùng team 15 người.</p>
      <h4>Gameplay &amp; networking</h4>
      <ul>
        <li>Đồng bộ client-server real-time qua WebSocket API</li>
        <li>VFX và animation bằng particle system; tích hợp Spine animation phức tạp cùng team art</li>
      </ul>
      <h4>Tối ưu mobile</h4>
      <ul>
        <li>Nén texture, quản lý memory và giảm build size để publish mượt</li>
        <li>Xử lý các vấn đề kỹ thuật riêng từng platform trước khi release lên store</li>
      </ul>
    `,
    },
    tech: ['Unity 2D/3D', 'C#', 'REST / WebSocket', 'Android SDK', 'iOS SDK', 'Spine'],
  },
  {
    id: 'nft',
    title: 'Playground NFT Games',
    meta: 'Playground., Ltd · Unity 2D · Android / WebGL · Firebase · 01/2022 – 02/2023',
    screenClass: 'sc-nft',
    screen: nftScreen,
    tags: [{ t: { en: 'NFT Board Game', vi: 'NFT Board Game' } }, { t: 'Android / WebGL', sec: true }, { t: 'Firebase', sec: true }],
    sub: { en: 'Unity Developer · Playground., Ltd · 01/2022 – 02/2023', vi: 'Unity Developer · Playground., Ltd · 01/2022 – 02/2023' },
    body: {
      en: `
      <p>NFT board games — Monopoly and Bingo — shipped for Android and WebGL. Released titles: Creature Hunter NFT and Bingo NFT.</p>
      <h4>What I built</h4>
      <ul>
        <li>Player controls and game mechanics in C# for NFT-based board games</li>
        <li>2D assets and Spine animations integrated into the UI/UX</li>
        <li>Client-server socket API for real-time multiplayer and blockchain transactions</li>
        <li>Maintained and extended content creation; delivered final content by the testing deadline</li>
      </ul>
    `,
      vi: `
      <p>Game board NFT — Monopoly và Bingo — ship cho Android và WebGL. Đã release: Creature Hunter NFT và Bingo NFT.</p>
      <h4>Những gì đã làm</h4>
      <ul>
        <li>Player control và gameplay mechanic bằng C# cho board game NFT</li>
        <li>Tích hợp asset 2D và Spine animation vào UI/UX</li>
        <li>Client-server socket API cho multiplayer real-time và giao dịch blockchain</li>
        <li>Maintain và mở rộng content creation; deliver content cuối đúng deadline test</li>
      </ul>
    `,
    },
    tech: ['Unity 2D', 'Android', 'WebGL', 'Firebase SDK', 'Blockchain', 'REST / WebSocket'],
  },
]

/* ── Project cá nhân (phần Portfolio trong CV) ─────────────────────────────── */

const PERSONAL_PROJECTS = [
  {
    id: 'vr',
    title: 'VR Shooting Range',
    meta: 'Solo · Unity 2022.3 (URP 14) · XR Interaction Toolkit / OpenXR · 08/2026 – 09/2026',
    screenClass: 'sc-vr',
    screen: () => '',
    tags: [{ t: { en: 'VR / XR', vi: 'VR / XR' } }, { t: { en: 'Zero to Demo in 3 Days', vi: 'Zero đến Demo trong 3 ngày' }, sec: true }, { t: 'Zero-Alloc', sec: true }],
    sub: { en: 'Solo Developer · Unity 2022.3 (URP 14), XR Interaction Toolkit 2.6.5, OpenXR · 08/2026 – 09/2026', vi: 'Solo Developer · Unity 2022.3 (URP 14), XR Interaction Toolkit 2.6.5, OpenXR · 08/2026 – 09/2026' },
    link: { label: { en: 'View on GitHub', vi: 'Xem trên GitHub' }, href: 'https://github.com/Bao1106/DemoVR' },
    media: { video: 'assets/media/vr-shooting-demo.mp4', poster: 'assets/media/vr-shooting-poster.jpg', wide: true },
    body: {
      en: `
      <p>A self-directed introduction to VR, built in 3 days on the XR Device Simulator — no headset on hand. Android/Quest pipeline configured and verified across 3 builds.</p>
      <h4>VR interaction &amp; locomotion</h4>
      <ul>
        <li>Grabbable hitscan weapon on XRI/OpenXR: <code>XRGrabInteractable</code> with a tuned attach pose, fire ray along a barrel axis derived from grip → muzzle, haptic impulse routed to whichever interactor pulled the trigger</li>
        <li>Teleport locomotion fenced behind the firing line via a dedicated interaction layer, plus snap turn and a tunnelling vignette</li>
        <li>World-space HUD and a wrist-mounted panel that reveals on wrist rotation</li>
      </ul>
      <h4>System architecture</h4>
      <ul>
        <li>Decoupled MVC + static Event Bus (Observer) with a single Singleton owning round rules</li>
        <li>An <code>IShootable</code> interface keeps the weapon independent of any target class — adding feedback (audio, haptics, VFX) is one new listener, never an edit to code that already works</li>
      </ul>
      <h4>Performance optimization</h4>
      <ul>
        <li>Cut build assets 30% (32.6 → 22.7 MB; APK 45.6 → 41.0 MB) via ASTC 6x6 with resolution caps, particle-shader consolidation, and trimming unused post-processing textures</li>
        <li>0 B allocation per shot (from 860 B) by pooling shell casings and impact VFX — measured with <code>GC.GetTotalMemory</code> around the call, 200 shots per path</li>
        <li>Diagnosed 8 particle materials silently skipped by Unity's URP converter from a shader-name mismatch, which were breaking SRP Batcher compatibility</li>
      </ul>
      <h4>Editor tooling</h4>
      <ul>
        <li>Five editor commands regenerate the whole scene from the raw asset pack — URP material conversion, weapon prefab assembly with third-party script stripping, procedural range layout with static-batching flags, and pooled effect prefabs</li>
        <li>No part of the scene was assembled by hand</li>
      </ul>
      <div class="metric-row">
        <div class="metric-box"><div class="num">3</div><div class="label">days, zero to demo</div></div>
        <div class="metric-box"><div class="num">0 B</div><div class="label">alloc / shot</div></div>
        <div class="metric-box"><div class="num">−30%</div><div class="label">build assets</div></div>
      </div>
      <div class="hl-box"><p><strong>Key takeaway:</strong> the pattern that keeps repeating across projects — motion tracking, blockchain, now VR — is shipping in unfamiliar tech fast by keeping the architecture (interfaces, event bus, pooling) the same and only swapping the input/rendering layer underneath it.</p></div>
    `,
      vi: `
      <p>Bước vào VR tự học, làm trong 3 ngày trên XR Device Simulator — chưa có headset trong tay. Pipeline Android/Quest đã setup và verify qua 3 lần build.</p>
      <h4>VR interaction &amp; locomotion</h4>
      <ul>
        <li>Súng hitscan grabbable trên XRI/OpenXR: <code>XRGrabInteractable</code> với attach pose đã tune, fire ray theo trục nòng súng tính từ grip → muzzle, haptic impulse route về đúng interactor đang bóp cò</li>
        <li>Teleport locomotion bị chặn sau firing line bằng một interaction layer riêng, cộng snap turn và tunnelling vignette</li>
        <li>HUD world-space và panel đeo cổ tay hiện ra khi xoay cổ tay</li>
      </ul>
      <h4>Kiến trúc hệ thống</h4>
      <ul>
        <li>MVC decoupled + static Event Bus (Observer) với một Singleton duy nhất quản lý round rules</li>
        <li>Interface <code>IShootable</code> giữ khẩu súng độc lập với mọi target class — thêm feedback (audio, haptics, VFX) chỉ là một listener mới, không bao giờ phải sửa code đang chạy tốt</li>
      </ul>
      <h4>Tối ưu hiệu năng</h4>
      <ul>
        <li>Giảm 30% build asset (32.6 → 22.7 MB; APK 45.6 → 41.0 MB) bằng ASTC 6x6 kèm giới hạn resolution, gộp particle-shader, và cắt texture post-processing không dùng tới</li>
        <li>0 B allocation mỗi phát bắn (từ 860 B) bằng cách pool vỏ đạn và impact VFX — đo bằng <code>GC.GetTotalMemory</code> quanh lệnh gọi, 200 phát bắn mỗi path</li>
        <li>Phát hiện 8 particle material bị URP converter của Unity âm thầm bỏ qua do lệch tên shader, khiến chúng phá compatibility với SRP Batcher</li>
      </ul>
      <h4>Editor tooling</h4>
      <ul>
        <li>5 lệnh editor tự dựng lại toàn bộ scene từ asset pack thô — convert material URP, ráp weapon prefab kèm strip script third-party, dựng layout range bằng thuật toán với flag static-batching, và pooled effect prefab</li>
        <li>Không phần nào của scene được ráp tay</li>
      </ul>
      <div class="metric-row">
        <div class="metric-box"><div class="num">3</div><div class="label">ngày, zero đến demo</div></div>
        <div class="metric-box"><div class="num">0 B</div><div class="label">alloc / phát bắn</div></div>
        <div class="metric-box"><div class="num">−30%</div><div class="label">build assets</div></div>
      </div>
      <div class="hl-box"><p><strong>Điều rút ra:</strong> pattern lặp lại qua các project — motion tracking, blockchain, rồi đến VR — là ship được công nghệ lạ nhanh bằng cách giữ nguyên kiến trúc (interface, event bus, pooling) và chỉ đổi lớp input/rendering bên dưới.</p></div>
    `,
    },
    tech: ['Unity 2022.3', 'URP 14', 'C#', 'XR Interaction Toolkit', 'OpenXR', 'Android/Quest'],
  },
  {
    id: 'paw',
    title: 'Paw Voyage: Pet Sort',
    meta: 'Solo · Unity 6 (URP) · Portrait Mobile · 07/2026 – Present',
    screenClass: 'sc-paw',
    screen: pawScreen,
    tags: [{ t: { en: 'Mobile Puzzle', vi: 'Mobile Puzzle' } }, { t: { en: '50 Levels', vi: '50 Level' }, sec: true }, { t: 'Google Play', sec: true }],
    sub: {
      en: 'Solo Developer · Unity 6 (URP) · Portrait Mobile · 07/2026 – Present · Android closed testing on Google Play',
      vi: 'Solo Developer · Unity 6 (URP) · Portrait Mobile · 07/2026 – Present · Đang closed testing trên Google Play',
    },
    linkNote: { en: 'Android closed testing — Google Play', vi: 'Đang closed testing — Google Play' },
    media: { video: 'assets/media/paw-voyage-demo.mp4', poster: 'assets/media/paw-voyage-poster.jpg' },
    body: {
      en: `
      <p>A sorting puzzle (Bus-Sort style) designed and shipped solo — from core loop to meta progression.</p>
      <h4>End-to-end game ownership</h4>
      <ul>
        <li>50 levels, a level map with stars and chest rewards, boosters, onboarding, win/lose flow, UI, VFX and audio</li>
      </ul>
      <h4>Difficulty curve &amp; pacing</h4>
      <ul>
        <li>Owned progression across all 50 levels — when each new idea is introduced and how much pressure the board applies</li>
        <li>Validated with data instead of gut feel: every level is auto-playtested and only ships if a careful player clears it at least 95% of the time</li>
      </ul>
      <h4>Level design tooling</h4>
      <ul>
        <li>Authoring tool a designer actually works in: set a handful of tuning values and it generates, validates and rates the board</li>
        <li>New content takes minutes and can never ship unsolvable or soft-locked</li>
      </ul>
      <h4>Automated playtesting</h4>
      <ul>
        <li>A bot plays the game and records video, so any balance change is verified across the whole game before it reaches players</li>
        <li>36/36 levels cleared, no stalls</li>
      </ul>
      <h4>Game feel &amp; art integration</h4>
      <ul>
        <li>Stylized water the boats sit and roll on, pet hops and reactions, boarding/booster effects that stay readable on a small screen</li>
      </ul>
      <h4>Release pipeline</h4>
      <ul>
        <li>Handled the full Android release path solo — signed build, Play Console setup, store listing, data safety declaration, and closed testing on real devices</li>
      </ul>
      <div class="metric-row">
        <div class="metric-box"><div class="num">50</div><div class="label">levels</div></div>
        <div class="metric-box"><div class="num">95%</div><div class="label">clear rate</div></div>
        <div class="metric-box"><div class="num">36/36</div><div class="label">bot pass</div></div>
      </div>
      <div class="hl-box"><p><strong>Key takeaway:</strong> data-driven balance plus automated playtesting means shipping without relying on gut feel — and a design log that records why every call was made.</p></div>
    `,
      vi: `
      <p>Puzzle sắp xếp (kiểu Bus-Sort) tự thiết kế và ship một mình — từ core loop đến meta progression.</p>
      <h4>Own toàn bộ game end-to-end</h4>
      <ul>
        <li>50 level, level map kèm sao và chest reward, booster, onboarding, win/lose flow, UI, VFX và audio</li>
      </ul>
      <h4>Difficulty curve &amp; pacing</h4>
      <ul>
        <li>Own progression xuyên suốt 50 level — khi nào giới thiệu ý tưởng mới và board tạo áp lực bao nhiêu</li>
        <li>Validate bằng data thay vì cảm tính: mọi level đều auto-playtest và chỉ ship nếu người chơi cẩn thận clear được ít nhất 95% số lần</li>
      </ul>
      <h4>Level design tooling</h4>
      <ul>
        <li>Authoring tool designer dùng thật: chỉnh vài tuning value là tool tự generate, validate và chấm điểm board</li>
        <li>Content mới ra đời trong vài phút và không bao giờ ship được board unsolvable hay soft-locked</li>
      </ul>
      <h4>Automated playtesting</h4>
      <ul>
        <li>Bot tự chơi game và ghi video, nên mọi thay đổi balance đều được verify xuyên suốt game trước khi tới tay người chơi</li>
        <li>Clear 36/36 level, không stall</li>
      </ul>
      <h4>Game feel &amp; art integration</h4>
      <ul>
        <li>Nước stylized để thuyền nổi và lắc, pet nhảy và phản ứng, hiệu ứng boarding/booster vẫn rõ trên màn hình nhỏ</li>
      </ul>
      <h4>Release pipeline</h4>
      <ul>
        <li>Tự lo trọn con đường release Android — signed build, setup Play Console, store listing, khai báo data safety, và closed testing trên thiết bị thật</li>
      </ul>
      <div class="metric-row">
        <div class="metric-box"><div class="num">50</div><div class="label">level</div></div>
        <div class="metric-box"><div class="num">95%</div><div class="label">clear rate</div></div>
        <div class="metric-box"><div class="num">36/36</div><div class="label">bot pass</div></div>
      </div>
      <div class="hl-box"><p><strong>Điều rút ra:</strong> balance dựa trên data cộng automated playtesting nghĩa là ship được mà không cần dựa vào cảm tính — kèm một design log ghi lại lý do cho từng quyết định.</p></div>
    `,
    },
    tech: ['Unity 6', 'URP', 'C#', 'Editor Tooling', 'Automated Playtest', 'Level Design'],
  },
  {
    id: 'tower',
    title: 'Tower Defense (3D Sci-Fi)',
    meta: 'Solo · Unity 2022 (URP) · DOTween · 05/2026 – 06/2026',
    screenClass: 'sc-tower',
    screen: towerScreen,
    tags: [{ t: { en: '3D Sci-Fi', vi: '3D Sci-Fi' } }, { t: 'MVC + Event Bus', sec: true }, { t: { en: 'Procedural', vi: 'Procedural' }, sec: true }],
    sub: { en: 'Solo Developer · Unity 2022 (URP) · DOTween · 05/2026 – 06/2026', vi: 'Solo Developer · Unity 2022 (URP) · DOTween · 05/2026 – 06/2026' },
    link: { label: { en: 'View on GitHub', vi: 'Xem trên GitHub' }, href: 'https://github.com/Bao1106/TowerDefense/tree/develop' },
    media: { video: 'assets/media/tower-defense-demo.mp4', poster: 'assets/media/tower-defense-poster.jpg', wide: true },
    body: {
      en: `
      <p>A 3D sci-fi tower defense with decoupled architecture, procedural maze generation and aggressive performance work.</p>
      <h4>System architecture</h4>
      <ul>
        <li><strong>MVC + static Event Bus</strong> for cross-system communication</li>
        <li><strong>Strategy:</strong> operator behaviours and gate assignment across 4 modes</li>
        <li><strong>Flyweight:</strong> shared unit configs via ScriptableObject</li>
        <li><strong>Object Pool:</strong> entities, VFX and SFX reused for a zero-allocation runtime</li>
        <li><strong>State Machine:</strong> Arknights-style 2-phase deploy — drag-to-place, then direction select</li>
      </ul>
      <h4>Graphics &amp; rendering (URP)</h4>
      <ul>
        <li>Stylized toon-shading and geometry outlines via custom URP Renderer Features</li>
        <li>Custom depth-testing shaders so world-space HP bars render correctly over 3D geometry</li>
      </ul>
      <h4>Algorithms &amp; procedural generation</h4>
      <ul>
        <li>Procedural maze generation with an iterative Recursive Backtracker</li>
        <li>A* pathfinding with Manhattan heuristic</li>
        <li>Multi-gate system with section-based placement, cross-gate path isolation and 6 configurable map layouts</li>
      </ul>
      <h4>Performance optimization</h4>
      <ul>
        <li>Build size 255 → 102 MB via shader variant stripping and ASTC 6x6 compression</li>
        <li>Draw calls 2792 → 887 batches with Static Batching</li>
        <li>Zero-alloc runtime: Object Pooling plus an async wave loop (async/await + CancellationToken + PauseAwareDelay)</li>
      </ul>
      <div class="metric-row">
        <div class="metric-box"><div class="num">−60%</div><div class="label">build size</div></div>
        <div class="metric-box"><div class="num">−68%</div><div class="label">draw calls</div></div>
        <div class="metric-box"><div class="num">0</div><div class="label">GC alloc</div></div>
      </div>
    `,
      vi: `
      <p>Tower defense 3D sci-fi với kiến trúc decoupled, sinh maze procedural và tối ưu hiệu năng mạnh tay.</p>
      <h4>Kiến trúc hệ thống</h4>
      <ul>
        <li><strong>MVC + static Event Bus</strong> cho giao tiếp giữa các hệ thống</li>
        <li><strong>Strategy:</strong> hành vi operator và gán gate trên 4 mode</li>
        <li><strong>Flyweight:</strong> config unit dùng chung qua ScriptableObject</li>
        <li><strong>Object Pool:</strong> entity, VFX và SFX tái dùng cho runtime zero-allocation</li>
        <li><strong>State Machine:</strong> deploy 2 pha kiểu Arknights — drag-to-place rồi chọn hướng</li>
      </ul>
      <h4>Graphics &amp; rendering (URP)</h4>
      <ul>
        <li>Toon-shading stylized và geometry outline qua URP Renderer Feature tự viết</li>
        <li>Shader custom depth-testing để HP bar world-space render đúng phía trên geometry 3D</li>
      </ul>
      <h4>Thuật toán &amp; procedural generation</h4>
      <ul>
        <li>Sinh maze procedural bằng Recursive Backtracker lặp</li>
        <li>Pathfinding A* với heuristic Manhattan</li>
        <li>Hệ thống multi-gate với đặt vị trí theo section, cô lập path giữa các gate và 6 layout map cấu hình được</li>
      </ul>
      <h4>Tối ưu hiệu năng</h4>
      <ul>
        <li>Build size 255 → 102 MB nhờ strip shader variant và nén ASTC 6x6</li>
        <li>Draw call 2792 → 887 batch nhờ Static Batching</li>
        <li>Runtime zero-alloc: Object Pooling cộng async wave loop (async/await + CancellationToken + PauseAwareDelay)</li>
      </ul>
      <div class="metric-row">
        <div class="metric-box"><div class="num">−60%</div><div class="label">build size</div></div>
        <div class="metric-box"><div class="num">−68%</div><div class="label">draw calls</div></div>
        <div class="metric-box"><div class="num">0</div><div class="label">GC alloc</div></div>
      </div>
    `,
    },
    tech: ['Unity 2022', 'URP', 'C#', 'DOTween', 'Shader Graph', 'A*', 'Object Pooling'],
  },
  {
    id: 'pose',
    title: 'Motion Tracking & Pose Estimation',
    meta: 'Demo · MediaPipe · Real-time skeletal analysis',
    screenClass: 'sc-pose',
    screen: () => poseScreen(false),
    tags: [{ t: 'MediaPipe' }, { t: { en: 'Balance', vi: 'Balance' }, sec: true }, { t: { en: 'Reach', vi: 'Reach' }, sec: true }],
    sub: { en: 'Personal demo · MediaPipe · Unity', vi: 'Demo cá nhân · MediaPipe · Unity' },
    media: { video: 'assets/media/motion-tracking-demo.mp4', poster: 'assets/media/motion-tracking-poster.jpg', wide: true },
    body: {
      en: `
      <p>A demo of real-time skeletal analysis, built while working on rehabilitation games — the exercise scoring runs entirely on an RGB camera feed. Clip below: a Hip Abduction exercise, live skeleton overlay bottom-right tracking form in real time.</p>
      <h4>Demos</h4>
      <ul>
        <li>Mediapipe Pose Tracking — <strong>Balance</strong>: holding a stable posture, warning on drift and on leaning against support</li>
        <li>Mediapipe Pose Tracking — <strong>Reach</strong>: reach distance and range of motion scored per repetition</li>
      </ul>
    `,
      vi: `
      <p>Demo skeletal analysis real-time, làm trong lúc phát triển game rehabilitation — chấm điểm bài tập chạy hoàn toàn trên camera RGB. Clip dưới: bài tập Hip Abduction, overlay khung xương góc dưới phải tracking form theo thời gian thực.</p>
      <h4>Demo</h4>
      <ul>
        <li>Mediapipe Pose Tracking — <strong>Balance</strong>: giữ tư thế ổn định, cảnh báo khi lệch hoặc tựa vào vật hỗ trợ</li>
        <li>Mediapipe Pose Tracking — <strong>Reach</strong>: chấm điểm khoảng với tay và range of motion theo từng lần lặp</li>
      </ul>
    `,
    },
    tech: ['MediaPipe', 'Unity', 'C#', 'Pose Estimation'],
  },
]

/* ─────────────────────────────────────────────────────────────────────────────
   i18n: chữ khung (không nằm trong data ở trên) + trạng thái ngôn ngữ hiện tại
   ───────────────────────────────────────────────────────────────────────────── */

const I18N = {
  heroBadge: { en: 'Available for opportunities', vi: 'Đang mở cho cơ hội mới' },
  heroRole: { en: 'Unity Developer · 4+ Years Experience', vi: 'Unity Developer · 4+ năm kinh nghiệm' },
  heroTagline: {
    en: 'Shipping mobile games &amp; interactive 3D apps. Specialized in motion tracking, performance optimization, and end-to-end game development.',
    vi: 'Phát triển game mobile &amp; ứng dụng 3D tương tác. Chuyên về motion tracking, tối ưu hiệu năng và phát triển game end-to-end.',
  },
  versionSwitch: { en: '🎮 View the 3D build (Unity WebGL) →', vi: '🎮 Xem bản 3D (Unity WebGL) →' },
  secAbout: { en: 'About', vi: 'Giới thiệu' },
  secExperience: { en: 'Experience', vi: 'Kinh nghiệm' },
  secSkills: { en: 'Skills', vi: 'Kỹ năng' },
  secWork: { en: 'Work Projects', vi: 'Dự án đi làm' },
  secPersonal: { en: 'Personal Projects', vi: 'Dự án cá nhân' },
  aboutWhatTitle: { en: 'What I do', vi: 'Tôi làm gì' },
  aboutWhatBody: {
    en: 'Unity Developer with 4+ years shipping mobile games and interactive 3D applications. Specialized in performance optimization, system architecture, and real-time interactive systems. Repeatedly moved into unfamiliar technology and shipped with it — skeletal tracking (MediaPipe, Nuitrack, Kinect) for clinical rehabilitation, blockchain game systems, and most recently VR: a self-directed XR Interaction Toolkit / OpenXR project taken from zero to a working, profiled demo in 3 days. Owning features end-to-end from design through release, working with teams of up to 23 people and partners in Singapore.',
    vi: 'Unity Developer với 4+ năm ship game mobile và ứng dụng 3D tương tác. Chuyên về tối ưu hiệu năng, kiến trúc hệ thống, và hệ thống tương tác real-time. Liên tục nhảy vào công nghệ lạ và vẫn ship được — skeletal tracking (MediaPipe, Nuitrack, Kinect) cho rehabilitation lâm sàng, hệ thống game blockchain, và gần nhất là VR: một project XR Interaction Toolkit / OpenXR tự học, đi từ zero đến một demo chạy được, đã profile trong 3 ngày. Own feature end-to-end từ design đến release, làm việc với team lên tới 23 người và đối tác ở Singapore.',
  },
  aboutCoreTitle: { en: 'Core strengths', vi: 'Thế mạnh' },
  aboutCoreList: [
    { en: 'End-to-end game development (core loop → meta)', vi: 'Phát triển game end-to-end (core loop → meta)' },
    { en: 'Real-time skeletal tracking &amp; pose estimation', vi: 'Skeletal tracking &amp; pose estimation real-time' },
    { en: 'VR/XR interaction — XR Interaction Toolkit, OpenXR', vi: 'Tương tác VR/XR — XR Interaction Toolkit, OpenXR' },
    { en: 'Performance: draw calls, memory, GC alloc', vi: 'Hiệu năng: draw calls, memory, GC alloc' },
    { en: 'Clean architecture: SOLID, patterns, event-driven', vi: 'Kiến trúc sạch: SOLID, design pattern, event-driven' },
    { en: 'Cross-functional &amp; international collaboration', vi: 'Phối hợp cross-functional &amp; làm việc quốc tế' },
  ],
  aboutEduTitle: { en: 'Education', vi: 'Học vấn' },
  aboutEduMajor: { en: 'Communications and Computer Networks', vi: 'Truyền thông và Mạng máy tính' },
  aboutEduSchool: { en: 'University of Information Technology — HCM', vi: 'Đại học Công nghệ Thông tin (UIT) — TP.HCM' },
  aboutLangTitle: { en: 'Languages &amp; ways of working', vi: 'Ngôn ngữ &amp; cách làm việc' },
  aboutLangList: [
    { en: 'Fluent English for day-to-day team collaboration', vi: 'Tiếng Anh thành thạo, giao tiếp hằng ngày với team quốc tế' },
    { en: 'Design log: every gameplay/balance call written down with its reasoning', vi: 'Design log: mọi quyết định gameplay/balance đều ghi lại kèm lý do' },
    { en: 'Comfortable owning a feature from spec to store build', vi: 'Thoải mái own một feature từ spec đến bản build lên store' },
  ],
  ctaTitle: { en: "Let's build something together", vi: 'Cùng làm điều gì đó hay ho' },
  ctaBody: {
    en: "Interested in collaborating or have a project in mind? I'm open to new opportunities.",
    vi: 'Quan tâm hợp tác hay có sẵn ý tưởng dự án? Mình luôn sẵn sàng đón nhận cơ hội mới.',
  },
  ctaButton: { en: 'Get in touch', vi: 'Liên hệ ngay' },
  modalClose: { en: 'Close', vi: 'Đóng' },
  modalPlaceholder: { en: 'Project', vi: 'Dự án' },
  tlDetails: { en: 'Details', vi: 'Chi tiết' },
  cardViewDetails: { en: 'View details of', vi: 'Xem chi tiết' },
  watchDemo: { en: '▶ Watch gameplay demo', vi: '▶ Xem video gameplay' },
  askAbout: { en: 'Ask me about this project', vi: 'Liên hệ hỏi về dự án này' },
  demoOnRequest: { en: 'Demo on request', vi: 'Demo theo yêu cầu' },
  demoOnRequestTitle: { en: 'Get in touch to see a demo', vi: 'Liên hệ để xem demo' },
  videoFallback: { en: "Your browser can't play this video — ", vi: 'Trình duyệt không phát được video — ' },
  videoDownload: { en: 'download it', vi: 'tải xuống' },
  refsPrefix: { en: 'References available upon request — ', vi: 'Thông tin người tham chiếu có khi cần — ' },
  langToggleLabel: { en: 'Switch to Vietnamese', vi: 'Chuyển sang tiếng Anh' },
  themeToggleToLight: { en: 'Switch to light mode', vi: 'Chuyển sang light mode' },
  themeToggleToDark: { en: 'Switch to dark mode', vi: 'Chuyển sang dark mode' },
}

const LANG_KEY = 'lang'
const THEME_KEY = 'theme'
let LANG = 'en'

// v có thể là chuỗi thường (jargon/tên riêng, dùng chung 2 ngôn ngữ) hoặc { en, vi }.
// Truyền thẳng vào mọi nơi hiện chữ thay vì đọc field gốc trực tiếp.
const t = (v) => {
  if (v == null) return ''
  if (typeof v === 'object' && ('en' in v || 'vi' in v)) return v[LANG] ?? v.en ?? v.vi ?? ''
  return v
}

/* ─────────────────────────────────────────────────────────────────────────────
   Render
   ───────────────────────────────────────────────────────────────────────────── */

const el = (id) => document.getElementById(id)
const svg = (paths, size = 15) =>
  `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" width="${size}" height="${size}">${paths}</svg>`

// meta luôn kết thúc bằng một khoảng ngày ("07/2024 – 07/2026" / "07/2026 – Present").
// Tách nó ra khỏi phần chữ để đặt riêng một hàng — nhét chung dòng thì hay bị bẻ giữa cụm ngày.
const DATE_RE = /\s·\s(\d{2}\/\d{4}\s[–-]\s(?:\d{2}\/\d{4}|Present))$/
const metaHtml = (meta) => {
  const m = meta.match(DATE_RE)
  if (!m) return `<div class="pr-meta">${meta}</div>`
  return `<div class="pr-meta">
    <span class="pr-meta-info">${meta.slice(0, m.index)}</span>
    <span class="pr-meta-date">${m[1]}</span>
  </div>`
}

function renderStats() {
  el('stats').innerHTML = STATS.map(
    (s) => `<div class="stat"><div class="stat-num" data-target="${s.num}" data-prefix="${s.prefix || ''}" data-suffix="${s.suffix || ''}">${s.prefix || ''}${s.num}${s.suffix || ''}</div><div class="stat-label">${t(s.label)}</div></div>`
  ).join('')
}

function renderContact() {
  el('contact').innerHTML = [
    { href: `mailto:${PROFILE.email}`, label: 'Email', title: PROFILE.email, icon: '<path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/>' },
    { href: `tel:${PROFILE.phoneRaw}`, label: PROFILE.phone, icon: '<path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6A19.79 19.79 0 0 1 2.12 4.18 2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.13.96.36 1.9.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.91.34 1.85.57 2.81.7A2 2 0 0 1 22 16.92z"/>' },
    { href: PROFILE.github, label: 'GitHub', ext: true, icon: '<path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"/>' },
    { href: PROFILE.linkedin, label: 'LinkedIn', ext: true, icon: '<path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-4 0v7h-4v-7a6 6 0 0 1 6-6z"/><rect x="2" y="9" width="4" height="12"/><circle cx="4" cy="4" r="2"/>' },
  ]
    .map((c) => `<a class="contact-chip" href="${c.href}"${c.title ? ` title="${c.title}"` : ''}${c.ext ? ' target="_blank" rel="noreferrer"' : ''}>${svg(c.icon)}${c.label}</a>`)
    .join('')
}

function renderRefs() {
  el('refs').textContent = t(I18N.refsPrefix) + PROFILE.references.map((r) => `${r.name} (${r.role})`).join(' · ')
}

// aboutCoreList/aboutLangList là MẢNG {en,vi} nên không đi qua applyStaticI18n()
// (hàm đó chỉ xử lý 1 chuỗi cho 1 node) — render riêng ra <li> ở đây.
function renderAboutLists() {
  el('aboutCoreList').innerHTML = I18N.aboutCoreList.map((item) => `<li>${t(item)}</li>`).join('')
  el('aboutLangList').innerHTML = I18N.aboutLangList.map((item) => `<li>${t(item)}</li>`).join('')
}

function renderTimeline() {
  el('timeline').innerHTML = EXPERIENCE.map(
    (e) => `
    <div class="tl-item">
      <div class="tl-node"></div>
      <button class="tl-card" type="button" aria-expanded="false">
        <div class="tl-head">
          <div>
            <div class="tl-role">${e.role}</div>
            <div class="tl-comp">${e.company}</div>
          </div>
          <div class="tl-date">${e.date}</div>
        </div>
        <div class="tl-toggle"><span>${t(I18N.tlDetails)}</span>${svg('<polyline points="6 9 12 15 18 9"/>', 12)}</div>
        <div class="tl-desc"><ul>${e.points.map((p) => `<li>${t(p)}</li>`).join('')}</ul></div>
      </button>
    </div>`
  ).join('')
}

// Toggle mở/đóng dùng event delegation trên #timeline (node cha không đổi khi
// renderTimeline() chạy lại) nên chỉ cần gắn một lần, không phải gắn lại mỗi lần đổi ngôn ngữ.
el('timeline').addEventListener('click', (ev) => {
  const card = ev.target.closest('.tl-card')
  if (!card) return
  const open = card.classList.toggle('expanded')
  card.setAttribute('aria-expanded', String(open))
})

function renderSkills() {
  el('skills').innerHTML = SKILLS.map(
    (s) => `
    <div class="sk-item">
      <div class="sk-head">
        <span class="sk-name">${svg(s.icon, 16)}${t(s.name)}</span>
        <span class="sk-val">${s.value}%</span>
      </div>
      <div class="sk-bar-bg"><div class="sk-bar-fill" data-width="${s.value}"></div></div>
      <div class="sk-tags">${s.tags.map((tag) => `<span class="sk-tag">${tag}</span>`).join('')}</div>
    </div>`
  ).join('')
}

// Project cards
const ALL_PROJECTS = [...WORK_PROJECTS, ...PERSONAL_PROJECTS]

const cardHtml = (p) => `
  <button class="pr-card" type="button" data-project="${p.id}" aria-label="${t(I18N.cardViewDetails)} ${p.title}">
    <div class="pr-inner">
      <div class="pr-screen ${p.screenClass}">
        ${p.screen()}
        <div class="pr-overlay"><div class="pr-play">${svg('<path d="M8 5v14l11-7z"/>', 20).replace('fill="none"', 'fill="white"')}</div></div>
      </div>
      <div class="pr-info">
        <h3>${p.title}</h3>
        ${metaHtml(p.meta)}
        <div class="pr-tags">${p.tags.map((tag) => `<span class="pr-tag${tag.sec ? ' sec' : ''}">${t(tag.t)}</span>`).join('')}</div>
      </div>
    </div>
  </button>`

function renderProjectCards() {
  el('workProjects').innerHTML = WORK_PROJECTS.map(cardHtml).join('')
  el('personalProjects').innerHTML = PERSONAL_PROJECTS.map(cardHtml).join('')
}

/* ── Hiệu ứng nghiêng thẻ theo chuột ──────────────────────────────────────── */
// Listener trực tiếp trên từng .pr-card (không delegation) nên phải gắn lại
// mỗi lần renderProjectCards() thay mới các node này.
function wireCardTilt() {
  document.querySelectorAll('.pr-card').forEach((card) => {
    const inner = card.querySelector('.pr-inner')
    card.addEventListener('mousemove', (e) => {
      const r = card.getBoundingClientRect()
      const rx = ((e.clientY - r.top) / r.height - 0.5) * -12
      const ry = ((e.clientX - r.left) / r.width - 0.5) * 12
      inner.style.transform = `rotateX(${rx}deg) rotateY(${ry}deg)`
    })
    card.addEventListener('mouseleave', () => { inner.style.transform = '' })
  })
}

/* ── Modal ────────────────────────────────────────────────────────────────── */

const overlay = el('modalOv')
let lastFocus = null

function openModal(id, { skipPush = false } = {}) {
  const p = ALL_PROJECTS.find((x) => x.id === id)
  if (!p) return
  if (!skipPush) pushProjectRoute(id)
  lastFocus = document.activeElement
  el('mTitle').textContent = p.title
  el('mSub').textContent = t(p.sub)
  // preload="none": video 10 MB chỉ tải khi người xem thật sự bấm play
  const video = p.media
    ? `<video class="modal-video${p.media.wide ? ' wide' : ''}" controls playsinline preload="none" poster="${p.media.poster}">
         <source src="${p.media.video}" type="video/mp4" />
         ${t(I18N.videoFallback)}<a href="${p.media.video}">${t(I18N.videoDownload)}</a>.
       </video>`
    : ''

  el('mBody').innerHTML = video + t(p.body) + `<h4>Tech stack</h4><div class="sk-tags">${p.tech.map((tag) => `<span class="sk-tag">${tag}</span>`).join('')}</div>`

  // Không có link repo thì hiện lý do cụ thể (linkNote) thay vì im lặng bỏ qua —
  // "Demo on request" chỉ còn là phao cuối khi không có cả media, link lẫn lời giải thích nào.
  el('mFoot').innerHTML =
    (p.media ? `<button class="btn" data-play-demo type="button">${t(I18N.watchDemo)}</button>` : '') +
    (p.link
      ? `<a class="btn" href="${p.link.href}" target="_blank" rel="noreferrer">${t(p.link.label)}</a>`
      : p.linkNote
        ? `<span class="btn" aria-disabled="true">${t(p.linkNote)}</span>`
        : !p.media
          ? `<span class="btn" aria-disabled="true" title="${t(I18N.demoOnRequestTitle)}">${t(I18N.demoOnRequest)}</span>`
          : '') +
    `<a href="mailto:${PROFILE.email}?subject=${encodeURIComponent(p.title)}" class="btn pri">${t(I18N.askAbout)}</a>`
  overlay.classList.add('active')
  document.body.style.overflow = 'hidden'
  el('mClose').focus()
}

function closeModal({ skipPush = false } = {}) {
  overlay.querySelector('video')?.pause() // đóng modal thì tắt tiếng luôn
  overlay.classList.remove('active')
  document.body.style.overflow = ''
  lastFocus?.focus()
  if (!skipPush) clearProjectRoute()
}

/* ── Hash routing: mỗi project một URL riêng, gửi thẳng được, Back đóng modal ── */

function pushProjectRoute(id) {
  history.pushState(null, '', '#/p/' + id)
}

function clearProjectRoute() {
  history.pushState(null, '', location.pathname + location.search)
}

function syncFromUrl() {
  const m = location.hash.match(/^#\/p\/([\w-]+)$/)
  if (m && ALL_PROJECTS.some((p) => p.id === m[1])) {
    openModal(m[1], { skipPush: true })
  } else {
    closeModal({ skipPush: true })
  }
}

window.addEventListener('popstate', syncFromUrl)

// Nút trong footer: cuộn tới video rồi phát
el('mFoot').addEventListener('click', (ev) => {
  if (!ev.target.closest('[data-play-demo]')) return
  const v = el('mBody').querySelector('video')
  if (!v) return
  v.scrollIntoView({ behavior: 'smooth', block: 'center' })
  v.play()
})

document.addEventListener('click', (ev) => {
  const card = ev.target.closest('[data-project]')
  if (card) openModal(card.dataset.project)
})
overlay.addEventListener('click', (ev) => { if (ev.target === overlay) closeModal() })
el('mClose').addEventListener('click', closeModal)
document.addEventListener('keydown', (ev) => { if (ev.key === 'Escape' && overlay.classList.contains('active')) closeModal() })

/* ── Áp chữ khung tĩnh (data-i18n trong index.html) ───────────────────────── */

function applyStaticI18n() {
  document.querySelectorAll('[data-i18n]').forEach((node) => {
    const key = node.dataset.i18n
    if (I18N[key] !== undefined) node.innerHTML = t(I18N[key])
  })
  document.querySelectorAll('[data-i18n-attr]').forEach((node) => {
    // format: "attr:key" — vd data-i18n-attr="aria-label:modalClose"
    node.dataset.i18nAttr.split(';').forEach((pair) => {
      const [attr, key] = pair.split(':')
      if (I18N[key] !== undefined) node.setAttribute(attr, t(I18N[key]))
    })
  })
  el('mTitle').textContent = t(I18N.modalPlaceholder)

  // steps() của hiệu ứng gõ chữ phải khớp độ dài chuỗi hiện tại, nếu không
  // chữ tiếng Việt (dài/ngắn khác tiếng Anh) sẽ gõ hụt hoặc thừa khoảng trắng.
  const tw = document.querySelector('.typewriter')
  if (tw) tw.style.setProperty('--tw-steps', tw.textContent.length)
}

/* ── Theme: dark (mặc định) / light, nhớ lựa chọn qua localStorage ─────────── */

function safeStorage(fn, fallback) {
  try { return fn() } catch { return fallback }
}

function applyTheme(theme) {
  if (theme === 'light') document.documentElement.setAttribute('data-theme', 'light')
  else document.documentElement.removeAttribute('data-theme')
  const btn = el('themeToggle')
  if (!btn) return
  btn.textContent = theme === 'light' ? '☀️' : '🌙'
  // Nhãn mô tả HÀNH ĐỘNG nút sẽ làm (đổi sang theme kia), không phải theme hiện tại
  btn.setAttribute('aria-label', t(theme === 'light' ? I18N.themeToggleToDark : I18N.themeToggleToLight))
  btn.setAttribute('aria-pressed', String(theme === 'light'))
}

function initTheme() {
  const saved = safeStorage(() => localStorage.getItem(THEME_KEY), null)
  applyTheme(saved === 'light' ? 'light' : 'dark')
  el('themeToggle')?.addEventListener('click', () => {
    const next = document.documentElement.getAttribute('data-theme') === 'light' ? 'dark' : 'light'
    safeStorage(() => localStorage.setItem(THEME_KEY, next))
    applyTheme(next)
  })
}

/* ── Ngôn ngữ: EN (mặc định) / VI, đổi thì render lại toàn bộ nội dung động ── */

function renderAll() {
  renderStats()
  renderContact()
  renderRefs()
  renderTimeline()
  renderSkills()
  renderProjectCards()
  wireCardTilt()
  applyStaticI18n()
  renderAboutLists()
}

function applyLang(lang) {
  LANG = lang === 'vi' ? 'vi' : 'en'
  document.documentElement.lang = LANG
  const wasRevealed = !!document.querySelector('.reveal.visible')
  renderAll()
  // Nếu section đã hiện ra rồi (người dùng đang cuộn giữa trang) thì áp lại
  // trạng thái "đã hiện" ngay, không để nó reset về ẩn rồi phải cuộn lại mới thấy.
  if (wasRevealed) reveals.forEach(activate)
  const btn = el('langToggle')
  if (btn) {
    btn.textContent = LANG === 'vi' ? 'EN' : 'VI'
    btn.setAttribute('aria-label', t(I18N.langToggleLabel))
  }
}

function initLang() {
  const saved = safeStorage(() => localStorage.getItem(LANG_KEY), null)
  applyLang(saved === 'vi' ? 'vi' : 'en')
  el('langToggle')?.addEventListener('click', () => {
    const next = LANG === 'vi' ? 'en' : 'vi'
    safeStorage(() => localStorage.setItem(LANG_KEY, next))
    applyLang(next)
  })
}

/* ── Scroll reveal + đếm số + thanh skill ─────────────────────────────────── */

const countUp = (node) => {
  const target = +node.dataset.target
  const prefix = node.dataset.prefix || ''
  const suffix = node.dataset.suffix || ''
  const t0 = performance.now()
  const tick = (now) => {
    const p = Math.min((now - t0) / 900, 1)
    node.textContent = prefix + Math.round(target * (1 - Math.pow(1 - p, 3))) + suffix // ease-out
    if (p < 1) requestAnimationFrame(tick)
  }
  requestAnimationFrame(tick)
}

const activate = (node) => {
  node.classList.add('visible')
  node.querySelectorAll('.sk-bar-fill').forEach((bar) => { bar.style.width = bar.dataset.width + '%' })
  node.querySelectorAll('.stat-num').forEach(countUp)
}

const reveals = [...document.querySelectorAll('.reveal')]
reveals.forEach((n) => n.classList.add('armed'))

const io = new IntersectionObserver((entries, obs) => {
  entries.forEach((entry) => {
    if (!entry.isIntersecting) return
    activate(entry.target)
    obs.unobserve(entry.target) // chỉ chạy 1 lần, cuộn lên cuộn xuống không nhảy lại
  })
}, { threshold: 0.12 })

reveals.forEach((n) => io.observe(n))

// Phao cứu sinh: observer không bắn (tab mở ở nền, trình duyệt chặn...) thì hiện hết ra,
// thà mất hiệu ứng còn hơn recruiter nhìn thấy trang trống.
setTimeout(() => {
  if (!document.querySelector('.reveal.visible')) reveals.forEach(activate)
}, 2500)
document.querySelectorAll('.hero .stat-num').forEach(countUp)

/* ── Khởi động: theme trước (tránh flash), rồi nội dung + ngôn ngữ, rồi hash ── */
initTheme()
initLang()
syncFromUrl() // vào thẳng bằng link có sẵn hash — script này đã chạy sau khi DOM dựng xong

/* ── Bụi sáng nền ─────────────────────────────────────────────────────────── */

const canvas = el('particles')
const ctx = canvas.getContext('2d')
const reduceMotion = matchMedia('(prefers-reduced-motion: reduce)').matches
let W = 0
let H = 0
let dots = []

function seed() {
  W = canvas.width = innerWidth
  H = canvas.height = innerHeight
  const count = Math.round(Math.min(70, (W * H) / 26000)) // màn nhỏ thì ít hạt lại
  dots = Array.from({ length: count }, () => ({
    x: Math.random() * W,
    y: Math.random() * H,
    r: Math.random() * 1.5 + 0.5,
    dx: (Math.random() - 0.5) * 0.4,
    dy: (Math.random() - 0.5) * 0.4,
  }))
}
seed()
addEventListener('resize', seed)

function drawDots() {
  ctx.clearRect(0, 0, W, H)
  ctx.fillStyle = 'rgba(160, 163, 177, 0.5)'
  for (const p of dots) {
    p.x += p.dx; p.y += p.dy
    if (p.x < 0 || p.x > W) p.dx *= -1
    if (p.y < 0 || p.y > H) p.dy *= -1
    ctx.beginPath()
    ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2)
    ctx.fill()
  }
  requestAnimationFrame(drawDots)
}

if (reduceMotion) {
  // vẫn vẽ 1 khung tĩnh cho có không khí, nhưng không chạy vòng lặp
  ctx.fillStyle = 'rgba(160, 163, 177, 0.5)'
  dots.forEach((p) => { ctx.beginPath(); ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2); ctx.fill() })
} else {
  drawDots()
}
