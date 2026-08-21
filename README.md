# Vo Quoc Bao — Isometric Portfolio

Portfolio dạng bản đồ game isometric: 5 hòn đảo nổi, nhân vật chibi 3D đi lại bằng **WASD** hoặc
click vào đảo, click đảo mở bottom sheet chi tiết.

React Three Fiber + Drei + TailwindCSS v4 + Vite.

## Chạy

```bash
npm install
npm run dev
```

Build: `npm run build` → `dist/`.

## Deploy

Repo chỉ có một site GitHub Pages nên workflow (`.github/workflows/deploy.yml`, giống hệt nhau ở cả
hai branch) checkout cả hai branch và gom thành một site:

| Đường dẫn | Bản | Nguồn |
|---|---|---|
| https://bao1106.github.io/Portfolio/ | 2D | branch `2d_web` (file tĩnh) |
| https://bao1106.github.io/Portfolio/3d/ | 3D | branch `3d_web` (workflow chạy `npm ci && npm run build`) |

Push branch nào cũng deploy đủ cả hai bản. Bản 3D chạy được ở thư mục con nhờ `base: './'` trong
`vite.config.js` — đừng đổi thành `/`.

Lần đầu phải bật thủ công: **Settings → Pages → Source: GitHub Actions**.

## Bản đồ

| Đảo | Màu | Nội dung |
|---|---|---|
| Profile Plaza (giữa) | `#00d4aa` | Objective, education, hướng dẫn điều khiển |
| Experience Town (dưới) | `#10b981` | 4 công việc, mỗi toà nhà 1 công ty, cột cờ T/K/P/H |
| Skills Forge (phải) | `#8b5cf6` | 5 tinh thể xoay + 5 thanh skill chạy từ 0% + tag cloud |
| Project Arena (trái) | `#f59e0b` | Công trường: cần cẩu, giàn giáo, hologram — 4 project công ty |
| Personal Lab (trên) | `#ec4899` | Lab: bình thí nghiệm, màn hình game — 3 project cá nhân |

## Điều khiển

| | |
|---|---|
| `W` `A` `S` `D` / phím mũi tên | Đi bộ theo hướng màn hình (isometric) |
| Click vào đảo | Nhân vật chạy tới đảo đó + mở panel chi tiết |
| Kéo nền | Pan bản đồ (kéo quá 5px thì không tính là click) |
| `ESC` | Đóng panel |

Nhân vật tự bước lên mặt đảo khi đi vào phạm vi đảo, và bị giới hạn trong bán kính 11 đơn vị.

## Nhân vật 3D & animation

- Model: `src/assets/chibi.glb` (Sketchfab, rig kiểu Mixamo — xương `Hips_01`, `Spine_02`…).
- Animation gốc: `Walking.fbx` của Mixamo — xương `mixamorig:Hips`… **không trùng tên** với model,
  rest pose lệch nhau (hông 118°, chân 180°), nên phải retarget.
- `scripts/retarget-anim.mjs` chạy **offline**: đọc FBX bằng FBXLoader, chuyển "độ lệch so với rest
  pose" ở không gian world sang rig chibi, xuất ra `src/assets/walking.json` (~72 KB).
  Runtime chỉ cần `AnimationClip.parse` — không phải kèm FBXLoader hay file FBX 466 KB vào bundle.

Thêm animation mới (Idle, Run… tải từ Mixamo, chọn **Without Skin**):

```bash
node scripts/retarget-anim.mjs "G:/Unity/Idle.fbx" Idle src/assets/idle.json
```

Kiểm tra clip có bind đúng vào skeleton không (chạy được cả trong CI, không cần trình duyệt):

```bash
node scripts/check-anim.mjs
```

> Hiện chỉ có clip Walking, nên tư thế đứng yên là frame "hai chân chụm" của clip đi bộ cộng nhún
> thở nhẹ. Có `Idle.fbx` thì chạy script trên rồi trộn thêm action là thành idle thật.

## Cập nhật nội dung

Tất cả nằm trong `src/data/portfolio.js`:

- `profile` — tên, subtitle, tagline, contact, objective, education, references.
- `experience` — 4 công việc (`flag` là chữ trên cột cờ, `height` là chiều cao toà nhà trên đảo).
- `skills` (5 thanh + icon tinh thể) và `skillTags` (tag cloud).
- `companyProjects` (4) và `personalProjects` (3, có `metrics` hiện thành ô số liệu).
- `zones` — vị trí `[x, z]` của 5 đảo. Camera iso nên: `-x` = lên trái, `-z` = lên phải.

## Cấu trúc

```
src/
  App.jsx                    # Header (tên, contact chip, tagline) + khung bản đồ + hint + panel
  index.css                  # Design token @theme, font Inter, nền void
  data/portfolio.js          # Toàn bộ nội dung + sơ đồ 5 đảo
  assets/chibi.glb           # Model nhân vật (inline vào bundle khi build)
  assets/walking.json        # Clip đi bộ đã retarget
  components/
    World.jsx                # Canvas, OrthographicCamera iso, lưới nền, bụi sáng, kéo-pan
    Zone.jsx                 # 1 đảo: bệ + viền sáng + vòng sáng khi click + nhãn
    ZoneProps.jsx            # Đồ trang trí từng đảo (bệ sáng, toà nhà, tinh thể, cần cẩu, lab)
    Character.jsx            # Model + clip + WASD + đi tới đích + bám mặt đảo
    DetailPanel.jsx          # Bottom sheet, 5 loại nội dung, thanh skill chạy từ 0%
scripts/
  retarget-anim.mjs          # FBX Mixamo -> clip JSON hợp skeleton chibi
  check-anim.mjs             # Kiểm tra clip bind đúng xương
```

## Design token

| | |
|---|---|
| Nền | `#0b0f1a` + 3 lớp radial glow mờ |
| Surface / card | `#1a1f2e` / `#131826` |
| Chữ | `#e6e6e6` · `#a0a3b1` · `#6b6f80` |
| Viền | `1px solid rgba(255,255,255,0.06)` · radius 12 (card) / 16 (panel) |
| Font | Inter |

Đổi màu/font: sửa block `@theme` trong `src/index.css`.
