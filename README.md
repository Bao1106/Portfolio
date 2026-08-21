# Portfolio — Võ Quốc Bảo (Unity Developer)

Thế giới **isometric** tương tác: 8 hòn đảo nổi (Experience, Skills + 6 project), nhân vật chibi tự
đi lại, kéo để pan bản đồ, click đảo để mở panel chi tiết.

React Three Fiber + Drei + TailwindCSS v4 + Vite. Màu/font theo design Figma.

## Chạy

```bash
npm install
npm run dev
```

Build: `npm run build` → `dist/`. Push lên `main` là GitHub Actions tự deploy (xem `.github/workflows/deploy.yml`).

## Thêm ảnh thumbnail

1. Copy ảnh vào `public/thumbnails/` (JPG/WebP, tỉ lệ **16:9**, ~1024×576, < 500 KB).
2. Mở `src/data/portfolio.js`, sửa `image: null` thành đường dẫn:

```js
{
  id: 'tower-defense',
  image: '/thumbnails/tower-defense.jpg',  // đường dẫn tính từ thư mục public/
  ...
}
```

Ảnh này dùng cho cả tấm billboard 3D trên đảo lẫn ảnh lớn trong panel. Để `image: null` thì tự sinh
placeholder gradient bằng canvas — app vẫn chạy, không lỗi thiếu file.

## Cập nhật nội dung

Tất cả nằm trong `src/data/portfolio.js`:

- `profile` — tên, vai trò, email, phone, LinkedIn, GitHub, About.
- `experience` — 4 công việc (đảo **Experience Town**).
- `skillGroups` — kỹ năng chia nhóm (đảo **Skills Forge**).
- `projects` — 6 project. Mỗi cái có `category`, `title`, `role`, `period`, `color` (màu đảo + glow),
  `description`, `highlights`, `metrics` (ô số liệu, không bắt buộc), `tech`, `demo`, `github`.
- `zones` — sơ đồ bản đồ. Layout lưới 4×2 (`GRID`), muốn đổi vị trí đảo thì sửa toạ độ ở đây.
  Thêm project mới vào `projects` là tự có đảo, nhớ thêm một ô vào `GRID`.

**Còn thiếu, cần điền tay:**
- `paw-voyage.period` đang `null` — file idea không ghi thời gian.
- `demo` của Tower Defense (link gameplay) và Rehab Platform (video MediaPipe Pose Tracking).
- Nút Play Demo / GitHub để `null` thì hiện dạng mờ, không bấm được.

## Cấu trúc

```
src/
  App.jsx                  # Header + World + hint + panel; state zone hover/selected
  index.css                # Token @theme: font Inter + Plus Jakarta Sans, màu, nền gradient
  data/portfolio.js        # Toàn bộ nội dung + sơ đồ zones + getThumb()
  components/
    World.jsx              # Canvas, camera orthographic (isometric), lưới nền, kéo-pan, danh sách zone
    Zone.jsx               # 1 hòn đảo: bệ + props theo kind (toà nhà / tinh thể / billboard) + nhãn
    Character.jsx          # Nhân vật chibi tự đi giữa các đảo, đi thẳng tới đảo được chọn
    InfoPanel.jsx          # Panel kính mờ: project / experience / skills
```

## Tương tác

| | |
|---|---|
| Kéo chuột (hoặc vuốt) | Pan bản đồ, giới hạn ±9 / ±7 đơn vị |
| Hover đảo | Đảo nhấc lên, bệ sáng, vầng sáng dưới chân loe ra, tên đảo hiện dưới màn hình |
| Click đảo | Mở panel bên phải, các đảo khác mờ đi, nhân vật đi tới đảo đó |
| **ESC** hoặc **×** | Đóng panel |

Camera isometric đặt ở `(12,12,12)` nhìn về gốc, dùng `OrthographicCamera` nên không có phối cảnh —
đúng chất isometric game. Zoom tự co theo bề rộng màn hình (`zoomForWidth`).

## Design token (từ Figma)

| | |
|---|---|
| Nền | `#070B18` + `linear-gradient(140.67deg, …)` + 3 blob radial |
| Accent | `#6C63FF` (brand) · `#00D4FF` (glow) · mỗi đảo một màu riêng trong `zones` |
| Chữ | `#E8EAF6` — Plus Jakarta Sans (H1 800/52) + Inter (body, label) |
| Panel | glass `rgba(255,255,255,.04)`, backdrop-blur 10, radius 20, viền `rgba(255,255,255,.07)` |

Đổi màu/font: sửa block `@theme` trong `src/index.css`.
