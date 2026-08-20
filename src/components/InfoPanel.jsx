import { useEffect, useState } from 'react'
import { getThumb } from '../data/projects'

/**
 * Panel chi tiết trượt vào từ bên phải (HTML overlay, kính mờ theo token Figma).
 * Luôn nằm trong DOM để animation đóng/mở mượt.
 */
export default function InfoPanel({ project, onClose }) {
  // giữ project cuối để nội dung không biến mất giữa lúc panel đang trượt ra
  const [shown, setShown] = useState(project)
  useEffect(() => { if (project) setShown(project) }, [project])

  const open = Boolean(project)
  const p = shown

  return (
    <aside
      aria-hidden={!open}
      className={`fixed right-0 top-0 z-30 flex h-full w-full flex-col border-l border-white/[0.07]
        bg-panel/85 backdrop-blur-[10px] shadow-[0_20px_60px_rgba(0,0,0,0.5)]
        transition-[translate,opacity] duration-500 ease-out sm:w-[440px]
        ${open ? 'translate-x-0 opacity-100' : 'pointer-events-none translate-x-full opacity-0'}`}
    >
      {!p ? null : (
        <>
          <button
            onClick={onClose}
            aria-label="Đóng"
            className="absolute right-4 top-4 z-10 grid h-9 w-9 place-items-center rounded-full border
              border-white/[0.12] bg-black/40 text-lg text-ink/70 backdrop-blur-[10px] transition
              hover:scale-110 hover:border-brand/35 hover:text-ink"
          >
            ×
          </button>

          {/* Ảnh lớn: cùng anatomy với card (accent line + gradient phủ) */}
          <div className="relative h-[220px] w-full shrink-0 overflow-hidden bg-panel">
            <img src={getThumb(p)} alt={p.title} className="h-full w-full object-cover opacity-[0.78]" />
            <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(7,9,24,0)_30%,rgba(7,9,24,0.9)_100%)]" />
            <div
              className="absolute inset-x-0 top-0 h-[2px]"
              style={{ background: `linear-gradient(90deg, ${p.color}90 0%, ${p.color}00 100%)` }}
            />
          </div>

          {/* min-h-0 + flex-1 để vùng nội dung scroll được bên trong panel cao 100% */}
          <div className="min-h-0 flex-1 overflow-y-auto px-[22px] pb-6 pt-5 scrollbar-none">
            <span
              className="text-[10px] font-semibold uppercase leading-[15px] tracking-[1.2px]"
              style={{ color: p.color }}
            >
              {p.category}
            </span>

            <h2 className="mt-1.5 font-display text-[24px] font-bold leading-[30px] text-ink">{p.title}</h2>
            <p className="mt-1 text-[12px] leading-[18px] tracking-[0.6px] text-ink/40">{p.role} · {p.period}</p>

            <p className="mt-4 text-[13px] leading-relaxed text-ink/75">{p.description}</p>

            <ul className="mt-4 space-y-2">
              {p.highlights.map((h) => (
                <li key={h} className="flex gap-2.5 text-[13px] leading-relaxed text-ink/60">
                  <span className="mt-[7px] h-1 w-1 shrink-0 rounded-full" style={{ background: p.color }} />
                  {h}
                </li>
              ))}
            </ul>

            <div className="mt-5 flex flex-wrap gap-1.5">
              {p.tech.map((t) => (
                <span
                  key={t}
                  className="rounded-full border border-brand/30 bg-brand/15 px-[9.8px] py-[2.8px]
                    text-[11px] font-medium leading-4 tracking-[0.22px] text-[#b4b0ff]"
                >
                  {t}
                </span>
              ))}
            </div>

            <div className="mt-6 flex gap-2.5">
              <PanelLink href={p.demo} primary>▶ Play Demo</PanelLink>
              <PanelLink href={p.github}>GitHub</PanelLink>
            </div>
          </div>
        </>
      )}
    </aside>
  )
}

// Chưa có link thì nút để mờ, không bấm được (thay vì mở tab trống)
function PanelLink({ href, primary, children }) {
  const base = 'flex-1 rounded-full px-4 py-2.5 text-center text-[12px] font-semibold tracking-[0.22px] transition'

  if (!href) {
    return (
      <span
        className={`${base} cursor-not-allowed border border-white/[0.08] bg-white/[0.03] text-ink/25`}
        title="Chưa có link — cập nhật trong src/data/projects.js"
      >
        {children}
      </span>
    )
  }

  return (
    <a
      href={href}
      target="_blank"
      rel="noreferrer"
      className={`${base} hover:scale-[1.03] ${
        primary
          ? 'bg-[linear-gradient(124.19deg,#6c63ff_0%,#00d4ff_100%)] text-[#070918] shadow-[0_0_20px_rgba(108,99,255,0.35)]'
          : 'border border-white/[0.12] bg-white/[0.06] text-ink/80 hover:text-ink'
      }`}
    >
      {children}
    </a>
  )
}
