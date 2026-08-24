# Vo Quoc Bao — Portfolio 3D (Unity WebGL)

Bản 3D của portfolio, build thẳng từ Unity (project nguồn ở `PortfolioWebGL/Portfolio` trên máy,
không nằm trong repo này) — WebGL 2.0, nén Brotli.

> Branch này chỉ chứa **output đã build**, không phải source Unity. Sửa nội dung/gameplay thì làm
> trong project Unity rồi build lại, xem [Cập nhật bản build](#cập-nhật-bản-build) bên dưới.
>
> Bản 2D (thuần HTML/CSS/JS) nằm ở branch `2d_web`.

## Chạy

Cần một server tĩnh thật sự (không mở thẳng `index.html` bằng `file://` — Unity loader chặn vì
brotli/gzip không giải nén được qua `file://`):

```bash
npx serve .
```

## Cấu trúc

```
index.html          # Loader Unity: canvas, thanh loading, cấu hình devicePixelRatio theo màn hình
Build/
  Build.data.unityweb        # Asset (nén Brotli)
  Build.framework.js.unityweb
  Build.wasm.unityweb
  Build.loader.js             # Không nén — script khởi động, tự giải nén phía client nếu server
                               # không gửi header Content-Encoding đúng (trường hợp GitHub Pages)
StreamingAssets/
  *.mp4              # 4 video demo, game tự load khi cần trong scene
```

## Cập nhật bản build

1. Mở project Unity, build lại target WebGL (Player Settings đã bật Compression Format = Brotli,
   **không** bật Decompression Fallback trong Player Settings vì loader tự lo phần này — xem dưới).
2. Build ra một thư mục tạm, copy đè `Build/`, `StreamingAssets/`, `index.html` vào branch này.
3. `git add -A && git commit && git push` — hoặc nhờ tôi làm nếu đang làm việc chung phiên.

## Vì sao deploy được lên GitHub Pages dù file .unityweb là nén Brotli

GitHub Pages không hỗ trợ set header `Content-Encoding` tuỳ ý cho từng file (khác Netlify/Vercel),
nên bình thường build Brotli/gzip sẽ không tự giải nén được. Nhưng `Build.loader.js` của bản build
này có sẵn cơ chế **UnityMarker**: nó đọc 4 byte đầu file, nếu thấy marker "UnityWeb Compressed
Content" thì tự giải nén bằng JS ngay trong trình duyệt, không cần server hỗ trợ gì thêm — chỉ chậm
hơn một chút so với server gửi đúng header. Đã kiểm tra: build không dùng WebGL threads/pthread nên
không cần header `Cross-Origin-Opener-Policy` / `Cross-Origin-Embedder-Policy` mà Pages cũng không
set được.

## Deploy

Repo chỉ có một site GitHub Pages nên workflow (`.github/workflows/deploy.yml`, giống hệt nhau ở cả
hai branch) checkout cả hai branch và gom thành một site:

| Đường dẫn | Bản | Nguồn |
|---|---|---|
| https://bao1106.github.io/Portfolio/ | 2D | branch `2d_web` (file tĩnh) |
| https://bao1106.github.io/Portfolio/3d/ | 3D (Unity WebGL) | branch `3d_web` (file tĩnh, không build step) |

Push branch nào cũng deploy đủ cả hai bản.

> Environment `github-pages` trên repo hiện chỉ cho branch mặc định (`3d_web`) trigger deploy. Push
> `2d_web` mà workflow báo *"Branch is not allowed to deploy"* thì kích lại bằng một commit rỗng trên
> `3d_web` — workflow của nó checkout cả hai nên vẫn gom đủ nội dung mới. Muốn hết vướng thì bật thêm
> `2d_web` trong Settings → Environments → github-pages → Deployment branches and tags.
