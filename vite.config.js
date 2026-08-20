import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// base './' -> chạy được cả ở root domain lẫn subfolder (GitHub Pages /repo-name/)
export default defineConfig({ base: './', plugins: [react(), tailwindcss()] })
