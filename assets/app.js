/* ─────────────────────────────────────────────────────────────────────────────
   Toàn bộ nội dung portfolio (lấy từ CV Võ Quốc Bảo) + phần render.
   Sửa nội dung ở các hằng số bên dưới là trang tự đổi theo.
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
  { num: 4, label: 'years exp' },
  { num: 4, label: 'shipped projects' },
  { num: 2, label: 'personal builds' },
]

const EXPERIENCE = [
  {
    role: 'Unity Developer / Software Engineer',
    company: 'Taggle Pte Ltd · Singapore',
    date: '07/2024 – 07/2026',
    points: [
      'Physical therapy &amp; rehabilitation games running on healthcare kiosks, PC and mobile',
      'Architected real-time skeletal tracking with MediaPipe, Nuitrack and Kinect for pose estimation',
      'Exercise monitoring logic: movement accuracy, goal tracking, live feedback on improper posture or obstacles',
      'Improved stability and frame rate of real-time motion analysis across PCs and Android kiosks',
      'Healthcare management apps for home-based patient care and medical records',
      'Collaborated directly with partners in Singapore inside a 23-person team',
    ],
  },
  {
    role: 'Unity Developer',
    company: 'KBG Studio',
    date: '02/2023 – 05/2024',
    points: [
      'Blockchain game with multiple mini games and complex management systems (marketplace, shop, mint, inventory) in a 15-person team',
      'Optimized game performance, build size and resolved technical issues on mobile',
      'Worked with artists, designers and QA to deliver on schedule',
    ],
  },
  {
    role: 'Unity Developer',
    company: 'Playground., Ltd',
    date: '01/2022 – 02/2023',
    points: [
      'NFT games (Monopoly, Bingo) for Android and WebGL',
      'Gameplay mechanics and features, content creation and maintenance',
      'Released: Creature Hunter NFT, Bingo NFT',
    ],
  },
  {
    role: 'Software Developer',
    company: 'Hitachi Vantara VN',
    date: '09/2020 – 09/2021',
    points: [
      'High-performance UI/WPF applications',
      'Analyzed customer requirements, defined and implemented solutions',
      'Wrote test cases',
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
}

const SKILLS = [
  { name: 'Unity Engine', icon: ICON.cube, value: 85, tags: ['2D/3D', 'UGUI', 'URP', 'Asset Bundles', 'Multi-platform'] },
  { name: 'C# & Architecture', icon: ICON.code, value: 82, tags: ['OOP', 'SOLID', 'Design Patterns', 'Event-driven'] },
  { name: 'Motion Tracking', icon: ICON.globe, value: 78, tags: ['MediaPipe', 'Nuitrack', 'Kinect', 'Pose Estimation'] },
  { name: 'Performance', icon: ICON.bolt, value: 80, tags: ['Unity Profiler', 'Draw Calls', 'Memory', 'GC Alloc'] },
  { name: 'Networking', icon: ICON.monitor, value: 72, tags: ['REST API', 'WebSocket', 'JSON', 'Firebase'] },
  { name: 'Tools', icon: ICON.tool, value: 75, tags: ['Git', 'Sourcetree', 'Jira', 'Rider', 'Photoshop', 'DOTween', 'Spine'] },
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
    tags: [{ t: 'Motion Tracking' }, { t: 'Healthcare Kiosk', sec: true }, { t: 'PC / Mobile', sec: true }],
    sub: 'Unity Developer · Taggle Pte Ltd · 07/2024 – 07/2026',
    media: { video: 'assets/media/rehab-platform-demo.mp4', poster: 'assets/media/rehab-platform-poster.jpg', wide: true },
    body: `
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
      <div class="hl-box"><p><strong>Why it mattered:</strong> the same exercise logic had to stay accurate on a depth-sensor kiosk and on a phone camera — the tracking layer is swappable, the scoring layer is not.</p></div>
    `,
    tech: ['Unity 3D', 'C#', 'MediaPipe', 'Nuitrack', 'Kinect', 'UGUI', 'Unity Profiler'],
  },
  {
    id: 'health',
    title: 'Healthcare Management Ecosystem',
    meta: 'Taggle Pte Ltd · Unity Mobile · Asset Bundles · REST API · 07/2024 – 07/2026',
    screenClass: 'sc-health',
    screen: healthScreen,
    tags: [{ t: 'Mobile App' }, { t: 'Asset Bundles', sec: true }, { t: 'REST API', sec: true }],
    sub: 'Unity Developer / Software Engineer · Taggle Pte Ltd · 07/2024 – 07/2026',
    body: `
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
    `,
    tech: ['Unity (Mobile)', 'C#', 'Asset Bundles', 'RESTful API', 'JSON', 'Web Storage'],
  },
  {
    id: 'runnow',
    title: 'RunNow.io',
    meta: 'KBG Studio · Unity 2D/3D · WebSocket · Android / iOS · 02/2023 – 05/2024',
    screenClass: 'sc-run',
    screen: runScreen,
    tags: [{ t: 'Blockchain' }, { t: 'Multiplayer', sec: true }, { t: 'Spine', sec: true }],
    sub: 'Unity Developer · KBG Studio · 02/2023 – 05/2024',
    body: `
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
    tech: ['Unity 2D/3D', 'C#', 'REST / WebSocket', 'Android SDK', 'iOS SDK', 'Spine'],
  },
  {
    id: 'nft',
    title: 'Playground NFT Games',
    meta: 'Playground., Ltd · Unity 2D · Android / WebGL · Firebase · 01/2022 – 02/2023',
    screenClass: 'sc-nft',
    screen: nftScreen,
    tags: [{ t: 'NFT Board Game' }, { t: 'Android / WebGL', sec: true }, { t: 'Firebase', sec: true }],
    sub: 'Unity Developer · Playground., Ltd · 01/2022 – 02/2023',
    body: `
      <p>NFT board games — Monopoly and Bingo — shipped for Android and WebGL. Released titles: Creature Hunter NFT and Bingo NFT.</p>
      <h4>What I built</h4>
      <ul>
        <li>Player controls and game mechanics in C# for NFT-based board games</li>
        <li>2D assets and Spine animations integrated into the UI/UX</li>
        <li>Client-server socket API for real-time multiplayer and blockchain transactions</li>
        <li>Maintained and extended content creation; delivered final content by the testing deadline</li>
      </ul>
    `,
    tech: ['Unity 2D', 'Android', 'WebGL', 'Firebase SDK', 'Blockchain', 'REST / WebSocket'],
  },
]

/* ── Project cá nhân (phần Portfolio trong CV) ─────────────────────────────── */

const PERSONAL_PROJECTS = [
  {
    id: 'paw',
    title: 'Paw Voyage: Pet Sort',
    meta: 'Solo · Unity 6 (URP) · Portrait Mobile · 07/2026 – Present',
    screenClass: 'sc-paw',
    screen: pawScreen,
    tags: [{ t: 'Mobile Puzzle' }, { t: '50 Levels', sec: true }, { t: 'Google Play', sec: true }],
    sub: 'Solo Developer · Unity 6 (URP) · Portrait Mobile · 07/2026 – Present · Android closed testing on Google Play',
    media: { video: 'assets/media/paw-voyage-demo.mp4', poster: 'assets/media/paw-voyage-poster.jpg' },
    body: `
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
    tech: ['Unity 6', 'URP', 'C#', 'Editor Tooling', 'Automated Playtest', 'Level Design'],
  },
  {
    id: 'tower',
    title: 'Tower Defense (3D Sci-Fi)',
    meta: 'Solo · Unity 2022 (URP) · DOTween · 05/2026 – 06/2026',
    screenClass: 'sc-tower',
    screen: towerScreen,
    tags: [{ t: '3D Sci-Fi' }, { t: 'MVC + Event Bus', sec: true }, { t: 'Procedural', sec: true }],
    sub: 'Solo Developer · Unity 2022 (URP) · DOTween · 05/2026 – 06/2026',
    link: { label: 'View on GitHub', href: PROFILE.github },
    media: { video: 'assets/media/tower-defense-demo.mp4', poster: 'assets/media/tower-defense-poster.jpg', wide: true },
    body: `
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
    tech: ['Unity 2022', 'URP', 'C#', 'DOTween', 'Shader Graph', 'A*', 'Object Pooling'],
  },
  {
    id: 'pose',
    title: 'Motion Tracking & Pose Estimation',
    meta: 'Demo · MediaPipe · Real-time skeletal analysis',
    screenClass: 'sc-pose',
    screen: () => poseScreen(false),
    tags: [{ t: 'MediaPipe' }, { t: 'Balance', sec: true }, { t: 'Reach', sec: true }],
    sub: 'Personal demo · MediaPipe · Unity',
    media: { video: 'assets/media/motion-tracking-demo.mp4', poster: 'assets/media/motion-tracking-poster.jpg', wide: true },
    body: `
      <p>A demo of real-time skeletal analysis, built while working on rehabilitation games — the exercise scoring runs entirely on an RGB camera feed. Clip below: a Hip Abduction exercise, live skeleton overlay bottom-right tracking form in real time.</p>
      <h4>Demos</h4>
      <ul>
        <li>Mediapipe Pose Tracking — <strong>Balance</strong>: holding a stable posture, warning on drift and on leaning against support</li>
        <li>Mediapipe Pose Tracking — <strong>Reach</strong>: reach distance and range of motion scored per repetition</li>
      </ul>
    `,
    tech: ['MediaPipe', 'Unity', 'C#', 'Pose Estimation'],
  },
]

/* ─────────────────────────────────────────────────────────────────────────────
   Render
   ───────────────────────────────────────────────────────────────────────────── */

const el = (id) => document.getElementById(id)
const svg = (paths, size = 15) =>
  `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" width="${size}" height="${size}">${paths}</svg>`

// Stats + contact
el('stats').innerHTML = STATS.map(
  (s) => `<div class="stat"><div class="stat-num" data-target="${s.num}">${s.num}</div><div class="stat-label">${s.label}</div></div>`
).join('')

el('contact').innerHTML = [
  { href: `mailto:${PROFILE.email}`, label: 'Email', title: PROFILE.email, icon: '<path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/>' },
  { href: `tel:${PROFILE.phoneRaw}`, label: PROFILE.phone, icon: '<path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6A19.79 19.79 0 0 1 2.12 4.18 2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.13.96.36 1.9.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.91.34 1.85.57 2.81.7A2 2 0 0 1 22 16.92z"/>' },
  { href: PROFILE.github, label: 'GitHub', ext: true, icon: '<path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"/>' },
  { href: PROFILE.linkedin, label: 'LinkedIn', ext: true, icon: '<path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-4 0v7h-4v-7a6 6 0 0 1 6-6z"/><rect x="2" y="9" width="4" height="12"/><circle cx="4" cy="4" r="2"/>' },
]
  .map((c) => `<a class="contact-chip" href="${c.href}"${c.title ? ` title="${c.title}"` : ''}${c.ext ? ' target="_blank" rel="noreferrer"' : ''}>${svg(c.icon)}${c.label}</a>`)
  .join('')

el('refs').textContent =
  'References available upon request — ' + PROFILE.references.map((r) => `${r.name} (${r.role})`).join(' · ')

// Timeline
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
      <div class="tl-toggle"><span>Details</span>${svg('<polyline points="6 9 12 15 18 9"/>', 12)}</div>
      <div class="tl-desc"><ul>${e.points.map((p) => `<li>${p}</li>`).join('')}</ul></div>
    </button>
  </div>`
).join('')

el('timeline').addEventListener('click', (ev) => {
  const card = ev.target.closest('.tl-card')
  if (!card) return
  const open = card.classList.toggle('expanded')
  card.setAttribute('aria-expanded', String(open))
})

// Skills
el('skills').innerHTML = SKILLS.map(
  (s) => `
  <div class="sk-item">
    <div class="sk-head">
      <span class="sk-name">${svg(s.icon, 16)}${s.name}</span>
      <span class="sk-val">${s.value}%</span>
    </div>
    <div class="sk-bar-bg"><div class="sk-bar-fill" data-width="${s.value}"></div></div>
    <div class="sk-tags">${s.tags.map((t) => `<span class="sk-tag">${t}</span>`).join('')}</div>
  </div>`
).join('')

// Project cards
const ALL_PROJECTS = [...WORK_PROJECTS, ...PERSONAL_PROJECTS]

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

const cardHtml = (p) => `
  <button class="pr-card" type="button" data-project="${p.id}" aria-label="Xem chi tiết ${p.title}">
    <div class="pr-inner">
      <div class="pr-screen ${p.screenClass}">
        ${p.screen()}
        <div class="pr-overlay"><div class="pr-play">${svg('<path d="M8 5v14l11-7z"/>', 20).replace('fill="none"', 'fill="white"')}</div></div>
      </div>
      <div class="pr-info">
        <h3>${p.title}</h3>
        ${metaHtml(p.meta)}
        <div class="pr-tags">${p.tags.map((t) => `<span class="pr-tag${t.sec ? ' sec' : ''}">${t.t}</span>`).join('')}</div>
      </div>
    </div>
  </button>`

el('workProjects').innerHTML = WORK_PROJECTS.map(cardHtml).join('')
el('personalProjects').innerHTML = PERSONAL_PROJECTS.map(cardHtml).join('')

/* ── Modal ────────────────────────────────────────────────────────────────── */

const overlay = el('modalOv')
let lastFocus = null

function openModal(id) {
  const p = ALL_PROJECTS.find((x) => x.id === id)
  if (!p) return
  lastFocus = document.activeElement
  el('mTitle').textContent = p.title
  el('mSub').textContent = p.sub
  // preload="none": video 10 MB chỉ tải khi người xem thật sự bấm play
  const video = p.media
    ? `<video class="modal-video${p.media.wide ? ' wide' : ''}" controls playsinline preload="none" poster="${p.media.poster}">
         <source src="${p.media.video}" type="video/mp4" />
         Trình duyệt không phát được video — <a href="${p.media.video}">tải xuống</a>.
       </video>`
    : ''

  el('mBody').innerHTML = video + p.body + `<h4>Tech stack</h4><div class="sk-tags">${p.tech.map((t) => `<span class="sk-tag">${t}</span>`).join('')}</div>`
  el('mFoot').innerHTML =
    (p.media ? '<button class="btn" data-play-demo type="button">▶ Watch gameplay demo</button>' : '') +
    (p.link
      ? `<a class="btn" href="${p.link.href}" target="_blank" rel="noreferrer">${p.link.label}</a>`
      : '') +
    (!p.media && !p.link ? '<span class="btn" aria-disabled="true" title="Liên hệ để xem demo">Demo on request</span>' : '') +
    `<a href="mailto:${PROFILE.email}?subject=${encodeURIComponent(p.title)}" class="btn pri">Ask me about this project</a>`
  overlay.classList.add('active')
  document.body.style.overflow = 'hidden'
  el('mClose').focus()
}

function closeModal() {
  overlay.querySelector('video')?.pause() // đóng modal thì tắt tiếng luôn
  overlay.classList.remove('active')
  document.body.style.overflow = ''
  lastFocus?.focus()
}

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

/* ── Hiệu ứng nghiêng thẻ theo chuột ──────────────────────────────────────── */

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

/* ── Scroll reveal + đếm số + thanh skill ─────────────────────────────────── */

const countUp = (node) => {
  const target = +node.dataset.target
  const t0 = performance.now()
  const tick = (now) => {
    const p = Math.min((now - t0) / 900, 1)
    node.textContent = Math.round(target * (1 - Math.pow(1 - p, 3))) // ease-out
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
