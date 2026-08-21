import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// base './' -> chạy được cả ở root domain lẫn subfolder (GitHub Pages /repo-name/)
export default defineConfig({
  base: './',
  plugins: [react(), tailwindcss()],
  // model chibi (115 KB) + clip animation được nhúng thẳng vào bundle dưới dạng data URI
  // -> bản build 1 file HTML vẫn có nhân vật, không cần server phục vụ file rời
  build: { assetsInlineLimit: 400_000 },
})
