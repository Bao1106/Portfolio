import { getThumb } from '../data/projects'

/**
 * Card project dạng HTML (đúng spec Figma: 280x278, glass, ảnh 16:9 + vạch accent trên cùng).
 * active = đang được chọn hoặc đang hover -> viền tím + glow, và chính là project đang hiện ở stage 3D.
 */
export default function ProjectCard({ project, active, onSelect, onHover }) {
  const accent = project.color

  return (
    <button
      type="button"
      onClick={() => onSelect(project)}
      onMouseEnter={() => onHover(project)}
      onMouseLeave={() => onHover(null)}
      onFocus={() => onHover(project)}
      onBlur={() => onHover(null)}
      className={`group relative w-full shrink-0 overflow-hidden rounded-[20px] border bg-white/[0.04] text-left
        backdrop-blur-[10px] transition-all duration-300 ease-out
        ${active
          ? '-translate-y-1 scale-[1.02] border-brand/35 shadow-[0_20px_60px_rgba(0,0,0,0.5),0_0_30px_rgba(108,99,255,0.2)]'
          : 'border-white/[0.07] hover:border-brand/25'}`}
    >
      {/* Ảnh + gradient phủ dưới + vạch accent 2px */}
      <div className="relative h-[158px] w-full overflow-hidden bg-panel">
        <img
          src={getThumb(project)}
          alt={project.title}
          className="h-full w-full object-cover opacity-[0.78] transition-transform duration-500 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(7,9,24,0)_30%,rgba(7,9,24,0.9)_100%)]" />
        {/* `${accent}90` = accent ở alpha 0.565 (hex 8 số) */}
        <div
          className="absolute inset-x-0 top-0 h-[2px]"
          style={{ background: `linear-gradient(90deg, ${accent}90 0%, ${accent}00 100%)` }}
        />
      </div>

      <div className="flex flex-col gap-[5.7px] px-[18px] pt-[20.5px] pb-[18px]">
        <span
          className="text-[10px] font-semibold uppercase leading-[15px] tracking-[1.2px]"
          style={{ color: accent }}
        >
          {project.category}
        </span>

        <h3 className="font-display text-[19px] font-bold leading-6 text-ink">{project.title}</h3>

        <div className="flex flex-wrap gap-1.5 pt-[4.3px]">
          {project.tech.slice(0, 3).map((t) => (
            <span
              key={t}
              className="rounded-full border border-brand/30 bg-brand/15 px-[9.8px] py-[2.8px]
                text-[11px] font-medium leading-4 tracking-[0.22px] text-[#b4b0ff]"
            >
              {t}
            </span>
          ))}
        </div>
      </div>
    </button>
  )
}
