# Vo Quoc Bao — Portfolio 2D

Trang portfolio một trang, dark theme: hero glitch + typewriter, timeline kinh nghiệm, thanh skill,
lưới project với ảnh minh hoạ dựng bằng CSS, modal chi tiết, hạt sáng nền.

**Thuần HTML / CSS / JS — không dependency, không build step.**

> Branch này là bản 2D. Bản 3D (Unity WebGL) nằm ở branch `3d_web`.

## Chạy

Mở thẳng `index.html` bằng trình duyệt là xong. Muốn chạy qua server tĩnh:

```bash
npx vite
```

## Cấu trúc

```
index.html         # Khung trang: hero, About, các section rỗng để JS đổ nội dung vào, modal
assets/style.css   # Toàn bộ phần nhìn + ảnh minh hoạ project (CSS thuần)
assets/app.js      # Nội dung (từ CV) + render + tương tác
```

## Cập nhật nội dung

Sửa các hằng số đầu file [`assets/app.js`](assets/app.js):

| Hằng số | Nội dung |
|---|---|
| `PROFILE` | email, phone, GitHub, LinkedIn, references |
| `STATS` | 4 con số chạy ở hero |
| `EXPERIENCE` | 4 công việc trong timeline, mỗi cái một mảng `points` |
| `SKILLS` | 6 thẻ skill: tên, icon, %, tag |
| `WORK_PROJECTS` | 4 project làm ở công ty (phần Projects của CV) |
| `PERSONAL_PROJECTS` | 3 project cá nhân (phần Portfolio của CV) |

Project có video demo thì thêm `media: { video, poster, wide? }` — `wide: true` cho clip quay ngang (tràn hết modal), bỏ trống cho clip quay dọc (bó 280px).

Mỗi project gồm `title`, `meta`, `tags`, `screenClass` + `screen()` (ảnh minh hoạ CSS),
và phần modal: `sub`, `body` (HTML), `tech`, `link` (không có thì nút hiện "Demo on request").

Thêm project mới: thêm một object vào mảng tương ứng, nếu muốn ảnh minh hoạ riêng thì viết một hàm
`screen()` trả về HTML và thêm class nền vào `style.css` (xem `.sc-paw`, `.sc-tower`, `.sc-pose`…).

## Deploy

Repo chỉ có một site GitHub Pages nên workflow gom cả hai bản vào một lần deploy:

| Đường dẫn | Bản | Nguồn |
|---|---|---|
| https://bao1106.github.io/Portfolio/ | 2D | branch `2d_web` (file tĩnh, copy thẳng) |
| https://bao1106.github.io/Portfolio/3d/ | 3D (Unity WebGL) | branch `3d_web` (file tĩnh, build sẵn từ Unity) |

File `.github/workflows/deploy.yml` giống hệt nhau ở cả hai branch và checkout cả hai, nên push
branch nào cũng deploy đủ cả hai bản — không còn cảnh branch này đè branch kia.

Lần đầu phải bật thủ công: **Settings → Pages → Source: GitHub Actions**.

## Ghi chú kỹ thuật

- Thanh skill và số liệu chỉ chạy một lần khi cuộn tới (`IntersectionObserver` + `unobserve`).
- Card project là `<button>` nên bấm được bằng bàn phím; modal trả focus về đúng card khi đóng.
- Tôn trọng `prefers-reduced-motion`: tắt glitch, typewriter, hạt bay và các transition.
- Ảnh minh hoạ project mặc định không dùng file ảnh nào — tất cả là div + CSS. Riêng Paw Voyage dùng icon thật (WebP 512, 33 KB).
- Video demo đặt preload="none" + có poster: 10 MB chỉ tải khi người xem bấm play, không tốn băng thông của khách vãng lai.
- Video nén bằng ffmpeg trước khi commit: Paw Voyage 17.5 MB -> 10.3 MB (dọc, rộng 540, CRF 27), Tower Defense 81 MB -> 8.0 MB (ngang, rộng 1024, 60fps -> 30fps, CRF 29). Đều thêm +faststart để phát ngay khi chưa tải xong.
- Clip dọc và clip ngang dùng chung component: đặt `wide: true` trong `media` thì video tràn hết bề ngang modal, không thì bó lại 280px.
- Ngày tháng trong `meta` (`... · 07/2024 – 07/2026`) luôn đứng riêng 1 hàng dưới dòng mô tả — `metaHtml()` tách bằng regex nên không cần sửa chỗ khác khi đổi format ngày.
