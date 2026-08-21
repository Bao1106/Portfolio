import { useCallback, useEffect, useState } from 'react'
import World from './components/World'
import DetailPanel from './components/DetailPanel'
import { profile, zones } from './data/portfolio'

export default function App() {
  const [selectedId, setSelectedId] = useState(null)
  const [hoveredId, setHoveredId] = useState(null)
  const [charTarget, setCharTarget] = useState(null) // đích nhân vật chạy tới
  const [openKey, setOpenKey] = useState(0)          // đổi mỗi lần mở panel -> thanh skill chạy lại

  const selected = zones.find((z) => z.id === selectedId) ?? null

  const selectZone = (zone) => {
    setSelectedId(zone.id)
    setOpenKey((k) => k + 1)
    // đứng ở mép trước đảo cho khỏi lọt vào giữa đống props
    setCharTarget([zone.pos[0], zone.pos[1] + 2.4])
  }

  const clearTarget = useCallback(() => setCharTarget(null), [])

  useEffect(() => {
    const onKey = (e) => { if (e.key === 'Escape') setSelectedId(null) }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [])

  return (
    <div className="h-full overflow-y-auto">
      <Header />

      <section className="relative mx-auto h-[62vh] min-h-[420px] w-full max-w-[1400px]">
        <World
          selectedId={selectedId}
          hoveredId={hoveredId}
          onSelect={selectZone}
          onHover={(z) => setHoveredId(z?.id ?? null)}
          charTarget={charTarget}
          onArrive={clearTarget}
          onManualMove={clearTarget}
        />
      </section>

      <p className="pb-12 pt-3 text-center text-[12px] tracking-[0.4px] text-ink3">
        WASD để đi · Click zones to explore · Drag to pan
      </p>

      <DetailPanel zone={selected} openKey={openKey} onClose={() => setSelectedId(null)} />
    </div>
  )
}

function Header() {
  const [showContact, setShowContact] = useState(false)

  return (
    <header className="mx-auto max-w-[680px] px-4 pt-10 text-center sm:pt-12">
      <h1 className="text-[30px] font-extrabold tracking-[0.5px] text-ink sm:text-[40px]">{profile.name}</h1>
      <p className="mt-1 text-[14px] text-ink2 sm:text-[15px]">{profile.subtitle}</p>

      {/* Mobile: gộp thành 1 nút Contact; từ sm trở lên hiện đủ chip */}
      <button
        onClick={() => setShowContact((v) => !v)}
        className="mt-3 rounded-lg border border-white/[0.08] bg-white/[0.03] px-4 py-1.5 text-[13px]
          text-ink2 transition hover:text-ink sm:hidden"
      >
        {showContact ? 'Ẩn liên hệ' : 'Contact'}
      </button>

      <div className={`mt-3 flex-wrap justify-center gap-2 ${showContact ? 'flex' : 'hidden'} sm:flex`}>
        <Chip href={`mailto:${profile.email}`} label="Email" title={profile.email}>
          <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
          <polyline points="22,6 12,13 2,6" />
        </Chip>
        <Chip href={`tel:${profile.phoneRaw}`} label="Phone" title={profile.phone}>
          <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6A19.79 19.79 0 0 1 2.12 4.18 2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.13.96.36 1.9.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.91.34 1.85.57 2.81.7A2 2 0 0 1 22 16.92z" />
        </Chip>
        <Chip href={profile.github} label="GitHub" external>
          <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22" />
        </Chip>
        <Chip href={profile.linkedin} label="LinkedIn" external>
          <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-4 0v7h-4v-7a6 6 0 0 1 6-6z" />
          <rect x="2" y="9" width="4" height="12" />
          <circle cx="4" cy="4" r="2" />
        </Chip>
      </div>

      <p className="mx-auto mt-4 max-w-[60ch] text-[13px] leading-relaxed text-ink3">{profile.tagline}</p>
    </header>
  )
}

function Chip({ href, label, title, external, children }) {
  return (
    <a
      href={href}
      title={title}
      target={external ? '_blank' : undefined}
      rel={external ? 'noreferrer' : undefined}
      className="inline-flex items-center gap-1.5 rounded-lg border border-white/[0.08] bg-white/[0.03]
        px-3 py-1.5 text-[12px] text-ink2 transition hover:-translate-y-px hover:border-white/20 hover:text-ink"
    >
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round"
        strokeLinejoin="round" className="h-3.5 w-3.5 shrink-0">
        {children}
      </svg>
      {label}
    </a>
  )
}
