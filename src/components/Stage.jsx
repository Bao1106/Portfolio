import { Suspense } from 'react'
import { Canvas } from '@react-three/fiber'
import ShowcaseCard from './ShowcaseCard'

/**
 * Sân khấu giữa màn hình: vòng tròn HUD (HTML) + canvas R3F nằm trên.
 * Không có project nào active -> hiện empty state (icon + label) như trong design.
 */
export default function Stage({ project }) {
  return (
    <section className="relative order-first flex min-h-[320px] items-center justify-center lg:order-none">
      {/* HUD: vòng 280px + vòng dashed 220px + chấm sáng chạy quanh vành */}
      <div className="pointer-events-none absolute inset-0 grid place-items-center">
        <div className="relative h-[280px] w-[280px] rounded-full border border-brand/15">
          <div className="absolute inset-[30px] rounded-full border border-dashed border-brand/10" />
          <div className="absolute inset-0 animate-spin [animation-duration:9s]">
            <span className="absolute left-1/2 top-0 h-2.5 w-2.5 -translate-x-1/2 -translate-y-1/2
              rounded-full bg-brand/50 shadow-[0_0_12px_rgba(108,99,255,0.7)]" />
          </div>
        </div>
      </div>

      {/* Empty state: mờ dần khi đã có project active */}
      <div
        className={`pointer-events-none absolute inset-0 grid place-items-center transition-opacity duration-300
          ${project ? 'opacity-0' : 'opacity-100'}`}
      >
        <div className="flex flex-col items-center gap-2.5">
          <span className="text-[32px] leading-none text-brand/25">◈</span>
          <span className="text-[11px] uppercase leading-4 tracking-[1.1px] text-ink/20">Select a project</span>
        </div>
      </div>

      <Canvas className="!absolute inset-0" camera={{ position: [0, 0, 5], fov: 40 }} dpr={[1, 2]}>
        <ambientLight intensity={0.8} />
        <directionalLight position={[3, 4, 5]} intensity={1.1} />
        <directionalLight position={[-4, 1, 3]} intensity={0.4} color="#6c63ff" />
        <Suspense fallback={null}>
          {project && <ShowcaseCard key={project.id} project={project} />}
        </Suspense>
      </Canvas>

      {/* Hint dưới vòng tròn */}
      <p className="pointer-events-none absolute bottom-0 text-[12px] tracking-[0.6px] text-ink/20">
        Hover để xem trước · click để mở chi tiết
      </p>
    </section>
  )
}
