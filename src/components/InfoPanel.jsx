import { useEffect, useState } from 'react'
import { experience, getThumb, skillGroups } from '../data/portfolio'

/**
 * Panel chi tiết trượt vào từ bên phải. Render 3 loại nội dung theo zone.kind:
 * project (ảnh + highlight + metric + tech) / experience (timeline) / skills (nhóm kỹ năng).
 */
export default function InfoPanel({ zone, onClose }) {
  // giữ zone cuối để nội dung không biến mất giữa lúc panel đang trượt ra
  const [shown, setShown] = useState(zone)
  useEffect(() => { if (zone) setShown(zone) }, [zone])

  const open = Boolean(zone)
  const z = shown

  return (
    <aside
      aria-hidden={!open}
      className={`fixed right-0 top-0 z-30 flex h-full w-full flex-col border-l border-white/[0.07]
        bg-panel/85 backdrop-blur-[10px] shadow-[0_20px_60px_rgba(0,0,0,0.5)]
        transition-[translate,opacity] duration-500 ease-out sm:w-[440px]
        ${open ? 'translate-x-0 opacity-100' : 'pointer-events-none translate-x-full opacity-0'}`}
    >
      {!z ? null : (
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

          <PanelHero zone={z} />

          {/* min-h-0 + flex-1 để vùng nội dung scroll được bên trong panel cao 100% */}
          <div className="min-h-0 flex-1 overflow-y-auto px-[22px] pb-6 pt-5 scrollbar-none">
            {z.kind === 'project' && <ProjectBody p={z.project} />}
            {z.kind === 'experience' && <ExperienceBody />}
            {z.kind === 'skills' && <SkillsBody />}
          </div>
        </>
      )}
    </aside>
  )
}

// Ảnh lớn cho project; zone khác dùng dải màu + tên zone
function PanelHero({ zone }) {
  const accent = zone.color

  if (zone.kind === 'project') {
    return (
      <div className="relative h-[200px] w-full shrink-0 overflow-hidden bg-panel">
        <img src={getThumb(zone.project)} alt={zone.project.title} className="h-full w-full object-cover opacity-[0.78]" />
        <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(7,9,24,0)_30%,rgba(7,9,24,0.9)_100%)]" />
        <div className="absolute inset-x-0 top-0 h-[2px]"
          style={{ background: `linear-gradient(90deg, ${accent}90 0%, ${accent}00 100%)` }} />
      </div>
    )
  }

  return (
    <div className="relative h-[120px] w-full shrink-0 overflow-hidden"
      style={{ background: `linear-gradient(135deg, ${accent}33 0%, rgba(8,10,28,0.9) 70%)` }}>
      <div className="absolute inset-x-0 top-0 h-[2px]"
        style={{ background: `linear-gradient(90deg, ${accent}90 0%, ${accent}00 100%)` }} />
      <div className="absolute bottom-5 left-[22px]">
        <span className="text-[10px] font-semibold uppercase leading-[15px] tracking-[1.2px]" style={{ color: accent }}>
          {zone.kind === 'experience' ? 'Kinh nghiệm' : 'Kỹ năng'}
        </span>
        <h2 className="font-display text-[24px] font-bold leading-[30px] text-ink">{zone.label}</h2>
      </div>
    </div>
  )
}

function ProjectBody({ p }) {
  return (
    <>
      <span className="text-[10px] font-semibold uppercase leading-[15px] tracking-[1.2px]" style={{ color: p.color }}>
        {p.category}
      </span>

      <h2 className="mt-1.5 font-display text-[24px] font-bold leading-[30px] text-ink">{p.title}</h2>
      <p className="mt-1 text-[12px] leading-[18px] tracking-[0.6px] text-ink/40">
        {p.role}{p.period ? ` · ${p.period}` : ''}
      </p>

      <p className="mt-4 text-[13px] leading-relaxed text-ink/75">{p.description}</p>

      {p.metrics && (
        <div className="mt-5 flex gap-2.5">
          {p.metrics.map((m) => (
            <div key={m.label} className="flex-1 rounded-xl border border-white/[0.06] bg-white/[0.03] p-3 text-center">
              <div className="font-display text-[20px] font-bold tabular-nums" style={{ color: p.color }}>{m.num}</div>
              <div className="mt-0.5 text-[10px] text-ink/40">{m.label}</div>
            </div>
          ))}
        </div>
      )}

      <ul className="mt-5 space-y-2">
        {p.highlights.map((h) => (
          <li key={h} className="flex gap-2.5 text-[13px] leading-relaxed text-ink/60">
            <span className="mt-[7px] h-1 w-1 shrink-0 rounded-full" style={{ background: p.color }} />
            {h}
          </li>
        ))}
      </ul>

      <div className="mt-5 flex flex-wrap gap-1.5">
        {p.tech.map((t) => <Tag key={t}>{t}</Tag>)}
      </div>

      <div className="mt-6 flex gap-2.5">
        <PanelLink href={p.demo} primary>▶ Play Demo</PanelLink>
        <PanelLink href={p.github}>GitHub</PanelLink>
      </div>
    </>
  )
}

function ExperienceBody() {
  return (
    <ol className="space-y-4">
      {experience.map((e) => (
        <li key={e.company} className="border-b border-white/[0.05] pb-4 last:border-0">
          <div className="flex flex-wrap items-baseline justify-between gap-2">
            <div>
              <div className="text-[13px] font-semibold text-ink">{e.role}</div>
              <div className="text-[12px] text-ink/55">{e.company}</div>
            </div>
            <span className="whitespace-nowrap text-[11px] text-ink/35 tabular-nums">{e.period}</span>
          </div>
          <p className="mt-2 text-[12px] leading-relaxed text-ink/50">{e.desc}</p>
        </li>
      ))}
    </ol>
  )
}

function SkillsBody() {
  return (
    <div className="space-y-4">
      {skillGroups.map((g) => (
        <div key={g.name}>
          <h4 className="text-[10px] font-semibold uppercase tracking-[1.2px] text-glow">{g.name}</h4>
          <div className="mt-2 flex flex-wrap gap-1.5">
            {g.items.map((s) => <Tag key={s}>{s}</Tag>)}
          </div>
        </div>
      ))}
    </div>
  )
}

function Tag({ children }) {
  return (
    <span className="rounded-full border border-brand/30 bg-brand/15 px-[9.8px] py-[2.8px]
      text-[11px] font-medium leading-4 tracking-[0.22px] text-[#b4b0ff]">
      {children}
    </span>
  )
}

// Chưa có link thì nút để mờ, không bấm được (thay vì mở tab trống)
function PanelLink({ href, primary, children }) {
  const base = 'flex-1 rounded-full px-4 py-2.5 text-center text-[12px] font-semibold tracking-[0.22px] transition'

  if (!href) {
    return (
      <span className={`${base} cursor-not-allowed border border-white/[0.08] bg-white/[0.03] text-ink/25`}
        title="Chưa có link — cập nhật trong src/data/portfolio.js">
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
