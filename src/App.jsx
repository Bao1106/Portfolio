import { useEffect, useState } from 'react'
import Stage from './components/Stage'
import ProjectCard from './components/ProjectCard'
import InfoPanel from './components/InfoPanel'
import { profile, projects } from './data/projects'

// Chia card 2 bên như design: cột trái 2 card, cột phải 3 card
const LEFT = projects.slice(0, 2)
const RIGHT = projects.slice(2)

export default function App() {
  const [selectedId, setSelectedId] = useState(null) // project đang mở panel
  const [hoveredId, setHoveredId] = useState(null)   // project đang hover (preview ở stage)
  const [info, setInfo] = useState(null)             // 'about' | 'contact' | null

  const selected = projects.find((p) => p.id === selectedId) ?? null
  const hovered = projects.find((p) => p.id === hoveredId) ?? null
  const active = hovered ?? selected // hover được ưu tiên -> rê chuột là đổi card 3D ngay

  useEffect(() => {
    const onKey = (e) => {
      if (e.key !== 'Escape') return
      setSelectedId(null)
      setInfo(null)
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [])

  const cardProps = (p) => ({
    project: p,
    active: active?.id === p.id,
    onSelect: (x) => setSelectedId(x.id),
    onHover: (x) => setHoveredId(x?.id ?? null),
  })

  return (
    <div className="relative h-full w-full overflow-hidden font-sans">
      <Header info={info} setInfo={setInfo} />

      <main
        className="grid h-full grid-cols-1 gap-6 overflow-y-auto px-6 pt-[168px] pb-10
          lg:grid-cols-[280px_1fr_280px] lg:gap-[23.8px] lg:overflow-hidden lg:px-12 lg:pt-[139px] lg:pb-24"
      >
        <div className="flex min-h-0 flex-col gap-4 lg:overflow-y-auto lg:scrollbar-none">
          {LEFT.map((p) => <ProjectCard key={p.id} {...cardProps(p)} />)}
        </div>

        <Stage project={active} />

        <div className="flex min-h-0 flex-col gap-4 lg:overflow-y-auto lg:scrollbar-none">
          {RIGHT.map((p) => <ProjectCard key={p.id} {...cardProps(p)} />)}
        </div>
      </main>

      <InfoPanel project={selected} onClose={() => setSelectedId(null)} />
    </div>
  )
}

function Header({ info, setInfo }) {
  const parts = profile.name.split(' ')
  const last = parts.pop() // chữ cuối được tô gradient như design

  return (
    <header className="absolute inset-x-0 top-0 z-20 flex items-start justify-between gap-6 px-6 pt-9 lg:px-12">
      <div className="flex flex-col gap-1">
        <div className="flex items-center gap-2.5">
          <span className="h-[9px] w-[9px] rounded-full bg-brand shadow-[0_0_12px_#6c63ff,0_0_24px_rgba(108,99,255,0.4)]" />
          <span className="text-[12px] font-medium uppercase leading-[18px] tracking-[1.92px] text-ink/40">
            {profile.role} · 4 yrs
          </span>
        </div>

        <h1 className="flex items-center font-display text-[38px] font-extrabold leading-none tracking-[-1.56px] lg:text-[52px] lg:leading-[52px]">
          <span className="text-ink">{parts.join(' ')}&nbsp;</span>
          <span className="bg-[linear-gradient(124.19deg,#6c63ff_0%,#00d4ff_100%)] bg-clip-text text-transparent
            drop-shadow-[0_0_18px_rgba(108,99,255,0.4)]">
            {last}
          </span>
        </h1>

        <p className="hidden pt-1 text-[14px] leading-[21px] tracking-[0.14px] text-ink/40 sm:block">
          {profile.tagline}
        </p>
      </div>

      <div className="relative flex shrink-0 flex-col items-end gap-2.5">
        {/* Pill trạng thái góc phải */}
        <span className="flex items-center gap-2 rounded-full border border-white/[0.08] bg-white/[0.04]
          px-[17.8px] py-[7.8px] backdrop-blur-[10px]">
          <span className="h-[7px] w-[7px] rounded-full bg-glow shadow-[0_0_8px_#00d4ff]" />
          <span className="text-[12px] font-medium leading-[18px] text-ink/55">Open to remote</span>
        </span>

        <nav className="flex gap-1 rounded-full border border-white/[0.06] bg-white/[0.03] p-1 backdrop-blur-[10px]">
          <NavButton active={info === 'about'} onClick={() => setInfo(info === 'about' ? null : 'about')}>About</NavButton>
          <NavButton active={info === 'contact'} onClick={() => setInfo(info === 'contact' ? null : 'contact')}>Contact</NavButton>
          <a
            href={profile.github}
            target="_blank"
            rel="noreferrer"
            className="rounded-full px-3.5 py-1.5 text-[12px] text-ink/60 transition hover:bg-white/10 hover:text-ink"
          >
            GitHub
          </a>
        </nav>

        {info && <InfoCard kind={info} onClose={() => setInfo(null)} />}
      </div>
    </header>
  )
}

function NavButton({ active, onClick, children }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`rounded-full px-3.5 py-1.5 text-[12px] transition ${
        active ? 'bg-brand/20 text-ink' : 'text-ink/60 hover:bg-white/10 hover:text-ink'
      }`}
    >
      {children}
    </button>
  )
}

// Popover About / Contact thả xuống dưới thanh nav
function InfoCard({ kind, onClose }) {
  return (
    <div className="absolute right-0 top-full z-30 mt-3 w-[min(86vw,420px)] rounded-2xl border border-white/[0.08]
      bg-panel/85 p-5 text-left shadow-[0_20px_60px_rgba(0,0,0,0.5)] backdrop-blur-[10px]">
      <button onClick={onClose} aria-label="Đóng"
        className="absolute right-3 top-2 text-ink/40 transition hover:text-ink">×</button>

      {kind === 'about' ? (
        <>
          <h3 className="text-[10px] font-semibold uppercase tracking-[1.2px] text-brand">About</h3>
          <p className="mt-2 text-[13px] leading-relaxed text-ink/75">{profile.about}</p>
          <div className="mt-3 flex flex-wrap gap-1.5">
            {profile.skills.map((s) => (
              <span key={s} className="rounded-full border border-brand/30 bg-brand/15 px-2.5 py-1 text-[11px] text-[#b4b0ff]">
                {s}
              </span>
            ))}
          </div>
        </>
      ) : (
        <>
          <h3 className="text-[10px] font-semibold uppercase tracking-[1.2px] text-glow">Contact</h3>
          <ul className="mt-2 space-y-1.5 text-[13px] text-ink/75">
            <li>✉ <a className="hover:text-ink" href={`mailto:${profile.email}`}>{profile.email}</a></li>
            <li>☎ {profile.phone}</li>
            <li>📍 {profile.location}</li>
            <li>in <a className="hover:text-ink" href={profile.linkedin} target="_blank" rel="noreferrer">LinkedIn</a></li>
          </ul>
        </>
      )}
    </div>
  )
}
