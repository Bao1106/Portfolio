// Gộp bản build trong dist/ thành 1 file HTML tự chứa (JS + CSS + model đều inline).
//
//   npm run build && node scripts/build-standalone.mjs
//
// Xuất 2 bản:
//   portfolio-standalone.html  — tài liệu HTML đầy đủ, mở thẳng bằng trình duyệt (file://)
//   dist/artifact-fragment.html — chỉ phần nội dung, dùng để publish Artifact (host tự bọc <html>)
import fs from 'node:fs'
import path from 'node:path'

const html = fs.readFileSync('dist/index.html', 'utf8')
const pick = (re) => path.join('dist', html.match(re)[1].replace(/^[.\/]+/, ''))

const css = fs.readFileSync(pick(/href="([^"]+\.css)"/), 'utf8').replace(/<\/style/gi, '<\\/style')
const js = fs.readFileSync(pick(/src="([^"]+\.js)"/), 'utf8').replace(/<\/script/gi, '<\\/script')

const TITLE = 'Vo Quoc Bao — Unity Developer'
const body = `<style>${css}\n#root{min-height:100dvh}</style>\n<div id="root"></div>\n<script type="module">${js}</script>`

// Bản mở trực tiếp: PHẢI có doctype, thiếu là trình duyệt vào quirks mode và layout vỡ
fs.writeFileSync(
  'portfolio-standalone.html',
  `<!doctype html>
<html lang="vi">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>${TITLE}</title>
</head>
<body>
${body}
</body>
</html>`
)

// Bản cho Artifact: host tự bọc doctype/head/body nên chỉ đưa phần nội dung
fs.writeFileSync('dist/artifact-fragment.html', `<title>Quốc Bảo Portfolio</title>\n${body}`)

for (const f of ['portfolio-standalone.html', 'dist/artifact-fragment.html']) {
  console.log(f, (fs.statSync(f).size / 1024 / 1024).toFixed(2), 'MB')
}
