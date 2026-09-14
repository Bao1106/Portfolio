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
| `PERSONAL_PROJECTS` | 4 project cá nhân (phần Portfolio của CV) |

Project có video demo thì thêm `media: { video, poster, wide? }` — `wide: true` cho clip quay ngang (tràn hết modal), bỏ trống cho clip quay dọc (bó 280px).

Mỗi project gồm `title`, `meta`, `tags`, `screenClass` + `screen()` (ảnh minh hoạ CSS),
và phần modal: `sub`, `body` (HTML), `tech`, `link` (không có thì nút hiện "Demo on request").

Repo private (không có `link`) mà vẫn muốn giải thích vì sao thì thêm `linkNote` — hiện thành
badge mờ thay vì bặt tăm ("Demo on request" chỉ còn là phao cuối khi thiếu cả `media`, `link` lẫn
`linkNote"). Xem `paw` (`Android closed testing — Google Play`) làm ví dụ.

`STATS` nhận thêm `prefix`/`suffix` tuỳ chọn (vd `{ num: 68, prefix: '−', suffix: '%' }` ra `−68%`) —
`num` vẫn phải là số thuần vì `countUp()` animate bằng phép tính, chỉ prefix/suffix là chữ dán vào.

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
- **Hash routing**: mở project nào thì URL đổi thành `#/p/<id>` (`pushProjectRoute`), đóng thì xoá hash
  (`clearProjectRoute`). `syncFromUrl()` chạy lúc script tải (đọc hash hiện có) và mỗi lần `popstate`
  (nút Back/Forward) — nên paste thẳng link `.../#/p/vr` là mở đúng modal, và Back đóng modal thay vì
  rời trang. `openModal`/`closeModal` nhận cờ `{ skipPush: true }` để tự đồng bộ mà không đẩy thêm
  entry vào history (tránh vòng lặp). Hash không có trong `ALL_PROJECTS` thì trang hiển thị bình
  thường, không vỡ.
- Ngày tháng trong `meta` (`... · 07/2024 – 07/2026`) luôn đứng riêng 1 hàng dưới dòng mô tả — `metaHtml()` tách bằng regex nên không cần sửa chỗ khác khi đổi format ngày.

## Ngôn ngữ (EN / VI)

Nút "VI"/"EN" góc trên phải, mặc định EN, nhớ lựa chọn qua `localStorage` (`lang`).

- Field nào khác nhau giữa 2 ngôn ngữ thì viết `{ en, vi }` (vd `label: { en: 'countries deployed', vi: 'quốc gia đã triển khai' }`); field nào là jargon/tên riêng (tên project, tech stack, hầu hết tag ngắn) thì để nguyên 1 chuỗi dùng chung cho cả hai — hàm `t(v)` tự nhận diện và lấy `v[LANG]` hoặc trả `v` nguyên văn.
- Bản dịch tiếng Việt **không** dịch cứng nhắc toàn bộ — thuật ngữ (Object Pool, SRP Batcher, Singleton, GC Alloc...) và tên riêng giữ nguyên tiếng Anh, chỉ câu văn/ngữ pháp là tiếng Việt, đúng kiểu dân kỹ thuật VN vẫn viết.
- Chữ khung tĩnh trong `index.html` (hero, About, section heading, CTA...) gắn `data-i18n="key"` (hoặc `data-i18n-attr="thuộc-tính:key"` cho attribute như `aria-label`) — `applyStaticI18n()` trong `app.js` quét toàn bộ và đổ chữ theo `I18N[key]`.
- Nội dung động (STATS, EXPERIENCE, SKILLS, WORK_PROJECTS, PERSONAL_PROJECTS) được **render lại toàn bộ** mỗi lần đổi ngôn ngữ (`renderAll()` trong `applyLang()`), vì các section này vốn dĩ được `innerHTML` một lần lúc tải trang. Listener dạng delegation (click card, toggle timeline) gắn trên node cha cố định nên không cần gắn lại; riêng hiệu ứng nghiêng thẻ (`wireCardTilt`) gắn trực tiếp lên từng `.pr-card` nên phải gọi lại sau mỗi lần render.
- `--tw-steps` (CSS) được JS đặt = độ dài chuỗi hiện tại của `.typewriter`, vì tiếng Việt dài/ngắn khác tiếng Anh nên số bước của hiệu ứng gõ chữ (`steps()`) không thể hard-code cố định.
- Thêm project/skill mới: chỉ cần viết field nào cần dịch dưới dạng `{ en, vi }`, không cần sửa hàm render nào khác.

## Theme (dark / light)

Nút 🌙/☀️ góc trên phải, mặc định dark (đúng bản sắc gốc của trang — không tự đổi theo `prefers-color-scheme` của hệ điều hành, chỉ đổi khi người xem bấm), nhớ lựa chọn qua `localStorage` (`theme`). Một script inline nhỏ ở đầu `<head>` áp theme đã lưu **trước khi trang vẽ khung hình đầu tiên**, tránh flash sáng→tối lúc tải trang.

- Toàn bộ màu là CSS custom property định nghĩa 1 lần ở `:root`, light mode đè lại đúng các biến đó trong `:root[data-theme="light"]` — không có rule nào set màu cứng ngoài 2 khối đó (trừ ảnh minh hoạ project, xem dưới).
- `--fg-mix` (rgb triple) thay cho việc hard-code `rgba(255,255,255,alpha)` ở mọi viền/nền mờ — dark dùng `255,255,255` (trắng mờ), light dùng một bộ số tối (đen mờ). Alpha giữ nguyên như cũ, chỉ màu nền của alpha đổi hướng.
- `--accent-rgb` tương tự, dùng cho glow/shadow chrome-level viết dạng `rgba(var(--accent-rgb), alpha)`.
- `--on-accent` là màu chữ nằm TRÊN nền tô đặc `--accent` (nút `.btn.pri`) — tách riêng khỏi `--bg` vì accent đổi độ đậm giữa 2 theme (sáng hơn ở dark để nổi trên nền tối, đậm hơn ở light để đọc được trên nền sáng), nên màu chữ-trên-accent cũng phải đổi theo, không thể dùng chung `--bg`.
- Ảnh minh hoạ project (`.sc-paw`, `.sc-pose`, `.sc-health`...) **cố tình giữ tối cố định** ở cả 2 theme — đây là mini-screen mô phỏng UI trong game, không phải chrome của trang, y như cách `.pr-overlay`/`.modal-ov` (scrim/backdrop) cũng luôn tối bất kể theme.
- Đã đo contrast WCAG thật (không chỉ nhìn màu bằng mắt) cho light mode: text-tertiary/bg, accent/bg, accent/bg-card, on-accent/accent — tất cả đều ≥ 5.3:1, qua ngưỡng AA (4.5) có biên an toàn.
