# Portfolio 3D — Võ Quốc Bảo (Unity Developer)

React Three Fiber + Drei + TailwindCSS v4 + Vite. Layout & token theo design Figma.

## Chạy

```bash
npm install
npm run dev
```

Build: `npm run build` → `dist/` (deploy thẳng lên Vercel / Netlify / GitHub Pages).

## Thêm ảnh thumbnail

1. Copy ảnh vào `public/thumbnails/` (JPG/WebP, tỉ lệ **16:9**, ~1024×576, < 500 KB).
2. Mở `src/data/projects.js`, sửa `image: null` thành đường dẫn tương ứng:

```js
{
  id: 'tower-defense',
  image: '/thumbnails/tower-defense.jpg',  // đường dẫn tính từ thư mục public/
  ...
}
```

Đường dẫn bắt đầu bằng `/` (không phải `./public/...`). Vite tự phục vụ mọi thứ trong `public/`.

Nếu để `image: null`, card tự vẽ ảnh placeholder gradient + tên project bằng canvas — app vẫn chạy
bình thường, không lỗi thiếu file.

## Cập nhật nội dung

Toàn bộ nằm trong `src/data/projects.js`:

- `profile` — tên, vai trò, email, phone, LinkedIn, GitHub, About, skills.
- `projects` — 5 project (lấy từ CV). Mỗi project có `category` (dòng chữ nhỏ màu accent trên card),
  `title`, `role`, `period`, `color` (accent của card + glow 3D), `description`, `highlights`,
  `tech`, `demo`, `github`.
- `demo` / `github` để `null` thì nút hiện dạng mờ (disabled). Điền link vào là nút chạy ngay:
  - Tower Defense: link gameplay demo
  - Rehab Platform: link video "Mediapipe Pose Tracking Balance / Reach"

## Cấu trúc

```
src/
  App.jsx                  # Layout theo Figma: header + 2 cột card + stage giữa, state hover/select
  index.css                # Token @theme: font Inter + Plus Jakarta Sans, màu, nền gradient + blob
  data/projects.js         # Toàn bộ nội dung + getThumb() sinh ảnh placeholder
  components/
    Stage.jsx              # Sân khấu giữa: HUD vòng tròn + chấm quay + Canvas R3F + empty state
    ShowcaseCard.jsx       # Card 3D ở giữa: texture project, parallax theo chuột, glow màu accent
    ProjectCard.jsx        # Card HTML 280x278 (ảnh 16:9 + vạch accent + eyebrow + title + tag)
    InfoPanel.jsx          # Panel kính mờ trượt từ phải, nút Play Demo / GitHub
```

Tương tác: **hover** card → stage 3D preview project đó (card sáng viền tím + nhấc lên);
**click** → mở panel chi tiết bên phải. Đóng bằng nút **×** hoặc phím **ESC**.

## Design token (từ Figma)

| | |
|---|---|
| Nền | `#070B18` + `linear-gradient(140.67deg, #070B18 → #0C0E28 40% → #0A0820 70% → #07091A)` + 3 blob blur |
| Accent | `#6C63FF` (brand) · `#00D4FF` (glow) · `#A855F7` · `#F472B6` · `#2DD4BF` |
| Chữ | `#E8EAF6` — Plus Jakarta Sans (H1 800/52, title 700/19) + Inter (body, label) |
| Card | 280×278, radius 20, `rgba(255,255,255,.04)` + backdrop-blur 10, viền `rgba(255,255,255,.07)` |
| Card active | viền `rgba(108,99,255,.35)` + shadow `0 20px 60px rgba(0,0,0,.5), 0 0 30px rgba(108,99,255,.2)` |
| Tag | pill radius 999, `bg rgba(108,99,255,.13)`, viền `.28`, chữ `#B4B0FF` 11px |

Đổi màu/font: sửa block `@theme` trong `src/index.css`.
