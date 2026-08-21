import { useEffect, useState } from 'react'
import {
  companyProjects, experience, personalProjects, profile, skills, skillTags,
} from '../data/portfolio'

/**
 * Bottom sheet chi tiết: trượt lên khi click đảo, viền trên 3px lấy màu của đảo.
 * `openKey` đổi mỗi lần mở -> remount phần nội dung -> thanh skill chạy lại từ 0%.
 */
export default function DetailPanel({ zone, openKey, onClose }) {
  const [shown, setShown] = useState(zone)
  useEffect(() => { if (zone) setShown(zone) }, [zone])

  const open = Boolean(zone)
  const z = shown

  return (
    <aside
      aria-hidden={!open}
      className={`fixed inset-x-0 bottom-0 z-40 mx-auto flex max-h-[80vh] w-full max-w-[1100px] flex-col
        rounded-t-2xl border border-b-0 border-white/[0.06] bg-surface/95 backdrop-blur-xl
        shadow-[0_-20px_60px_rgba(0,0,0,0.55)] transition-[translate,opacity] duration-500 ease-out
        ${open ? 'translate-y-0 opacity-100' : 'pointer-events-none translate-y-full opacity-0'}`}
      style={{ borderTop: `3px solid ${z?.color ?? 'transparent'}` }}
    >
      {!z ? null : (
        <>
          <header className="flex shrink-0 items-start justify-between gap-4 px-6 pt-5">
            <div>
              <span className="text-[11px] font-semibold uppercase tracking-[1.2px]" style={{ color: z.color }}>
                {KIND_EYEBROW[z.kind]}
              </span>
              <h2 className="text-[20px] font-bold leading-tight text-ink">{z.label}</h2>
            </div>
            <button
              onClick={onClose}
              aria-label="Đóng"
              className="grid h-8 w-8 shrink-0 place-items-center rounded-lg text-ink3 transition
                hover:bg-white/[0.06] hover:text-ink"
            >
              ✕
            </button>
          </header>

          <div key={openKey} className="min-h-0 flex-1 overflow-y-auto px-6 pb-6 pt-4">
            {z.kind === 'profile' && <ProfileBody color={z.color} />}
            {z.kind === 'experience' && <ExperienceBody color={z.color} />}
            {z.kind === 'skills' && <SkillsBody color={z.color} />}
            {z.kind === 'projects' && <ProjectsBody color={z.color} items={companyProjects} />}
            {z.kind === 'lab' && <ProjectsBody color={z.color} items={personalProjects} personal />}

            <p className="mt-6 border-t border-white/[0.06] pt-4 text-[12px] text-ink3">
              References available upon request — {profile.references.map((r) => `${r.name} (${r.role})`).join(' · ')}
            </p>
          </div>
        </>
      )}
    </aside>
  )
}

const KIND_EYEBROW = {
  profile: 'Start here',
  experience: '4 positions · 2020 → 2026',
  skills: 'Core stack',
  projects: '4 shipped products',
  lab: '3 personal builds',
}

function ProfileBody({ color }) {
  return (
    <>
      <p className="max-w-[70ch] text-[14px] leading-relaxed text-ink2">{profile.objective}</p>

      <div className="mt-4 grid gap-3 sm:grid-cols-2">
        <Card>
          <H4 color={color}>Education</H4>
          <p className="text-[13px] font-semibold text-ink">{profile.education.major}</p>
          <p className="text-[13px] text-ink2">{profile.education.school}</p>
          <p className="mt-1 text-[12px] text-ink3 tabular-nums">{profile.education.period}</p>
        </Card>
        <Card>
          <H4 color={color}>Điều khiển</H4>
          <ul className="space-y-1 text-[13px] text-ink2">
            <li><Key>W</Key><Key>A</Key><Key>S</Key><Key>D</Key> — đi bộ quanh bản đồ</li>
            <li>Click một hòn đảo — nhân vật chạy tới và mở chi tiết</li>
            <li>Kéo nền — di chuyển góc nhìn</li>
          </ul>
        </Card>
      </div>

      <p className="mt-4 text-[13px]" style={{ color }}>
        → Bắt đầu từ Experience Town, rồi qua Project Arena và Personal Lab.
      </p>
    </>
  )
}

function ExperienceBody({ color }) {
  return (
    <div className="space-y-2">
      {experience.map((e, i) => (
        <details key={e.company} open={i === 0} className="group rounded-xl border border-white/[0.06] bg-card px-4 py-3">
          <summary className="flex cursor-pointer list-none flex-wrap items-baseline justify-between gap-2">
            <span>
              <span className="text-[14px] font-semibold text-ink">{e.role}</span>
              <span className="ml-2 text-[13px] text-ink2">{e.company}</span>
            </span>
            <span className="text-[12px] text-ink3 tabular-nums">
              {e.period}
              <span className="ml-2 inline-block transition-transform group-open:rotate-90">›</span>
            </span>
          </summary>
          <ul className="mt-3 space-y-1.5">
            {e.points.map((p) => <Bullet key={p} color={color}>{p}</Bullet>)}
          </ul>
        </details>
      ))}
    </div>
  )
}

function SkillsBody({ color }) {
  return (
    <>
      <div className="grid gap-x-8 gap-y-3 sm:grid-cols-2">
        {skills.map((s) => (
          <div key={s.name}>
            <div className="flex justify-between text-[13px] text-ink2">
              <span>{s.name}</span>
              <span className="tabular-nums text-ink3">{s.value}%</span>
            </div>
            <div className="mt-1.5 h-1.5 overflow-hidden rounded-full bg-white/[0.06]">
              <div
                className="h-full rounded-full"
                style={{
                  width: `${s.value}%`,
                  background: `linear-gradient(90deg, ${color}, ${color}aa)`,
                  animation: 'fillBar 1s cubic-bezier(0.16, 1, 0.3, 1)',
                }}
              />
            </div>
          </div>
        ))}
      </div>

      <div className="mt-5 flex flex-wrap gap-1.5">
        {skillTags.map((t) => <Tag key={t}>{t}</Tag>)}
      </div>
    </>
  )
}

function ProjectsBody({ color, items, personal }) {
  return (
    <div className="grid gap-3 lg:grid-cols-2">
      {items.map((p) => (
        <Card key={p.name}>
          <div className="flex flex-wrap items-baseline justify-between gap-2">
            <h3 className="text-[15px] font-semibold text-ink">{p.name}</h3>
            {p.period && <span className="text-[11px] text-ink3 tabular-nums">{p.period}</span>}
          </div>
          <p className="text-[12px]" style={{ color }}>{personal ? p.tagline : p.company}</p>
          {p.stack && <p className="mt-0.5 text-[11px] text-ink3">{p.stack}</p>}

          <p className="mt-2 text-[13px] leading-relaxed text-ink2">{p.summary}</p>

          {p.metrics && (
            <div className="mt-3 flex gap-2">
              {p.metrics.map((m) => (
                <div key={m.label} className="flex-1 rounded-lg border border-white/[0.06] bg-white/[0.02] py-2 text-center">
                  <div className="text-[17px] font-bold tabular-nums" style={{ color }}>{m.num}</div>
                  <div className="text-[10px] text-ink3">{m.label}</div>
                </div>
              ))}
            </div>
          )}

          <ul className="mt-3 space-y-1.5">
            {p.points.map((pt) => <Bullet key={pt} color={color}>{pt}</Bullet>)}
          </ul>

          <div className="mt-3 flex flex-wrap gap-1.5">
            {p.tech.map((t) => <Tag key={t}>{t}</Tag>)}
          </div>

          {p.github && (
            <a
              href={p.github}
              target="_blank"
              rel="noreferrer"
              className="mt-3 inline-block rounded-lg border border-white/[0.1] px-3 py-1.5 text-[12px] font-semibold
                text-ink2 transition hover:border-white/20 hover:text-ink"
            >
              GitHub ↗
            </a>
          )}
        </Card>
      ))}
    </div>
  )
}

const Card = ({ children }) => (
  <div className="rounded-xl border border-white/[0.06] bg-card p-4">{children}</div>
)

const H4 = ({ color, children }) => (
  <h4 className="mb-2 flex items-center gap-2 text-[13px] font-semibold text-ink">
    <span className="h-3.5 w-[3px] rounded" style={{ background: color }} />
    {children}
  </h4>
)

const Bullet = ({ color, children }) => (
  <li className="flex gap-2 text-[13px] leading-relaxed text-ink2">
    <span className="mt-[9px] h-1 w-1 shrink-0 rounded-full" style={{ background: color }} />
    {children}
  </li>
)

const Tag = ({ children }) => (
  <span className="rounded-md border border-white/[0.06] bg-white/[0.03] px-2 py-0.5 text-[11px] text-ink2">
    {children}
  </span>
)

const Key = ({ children }) => (
  <kbd className="mr-1 rounded border border-white/15 bg-white/[0.06] px-1.5 py-0.5 text-[11px] font-semibold text-ink">
    {children}
  </kbd>
)
