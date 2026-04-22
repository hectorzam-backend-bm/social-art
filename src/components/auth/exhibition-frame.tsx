import type { ReactNode } from 'react'

type FeaturedWork = {
  seed: string
  catalogNumber: string
  title: string
  artist: string
  date: string
  medium: string
}

const FEATURED: FeaturedWork = {
  seed: '1920.1992',
  catalogNumber: '1920.1992',
  title: 'Paris Street; Rainy Day',
  artist: 'Gustave Caillebotte',
  date: '1877',
  medium: 'Óleo sobre lienzo',
}

export function ExhibitionFrame({
  eyebrow,
  title,
  children,
}: {
  eyebrow: string
  title: string
  children: ReactNode
}) {
  return (
    <div className="min-h-screen bg-paper text-ink">
      <div className="mx-auto grid min-h-screen w-full max-w-[1400px] grid-cols-1 lg:grid-cols-[1.05fr_1fr]">
        {/* Exhibition window — featured work held large */}
        <aside className="relative hidden border-r border-rule bg-paper-inset lg:flex lg:flex-col">
          <div className="flex items-center justify-between px-10 pt-10">
            <span className="eyebrow">Social Art · Colección</span>
            <span className="eyebrow">No. {FEATURED.catalogNumber}</span>
          </div>

          <div className="flex flex-1 items-center justify-center px-10 py-12">
            <figure className="passepartout w-full max-w-[520px]">
              <img
                src={`https://picsum.photos/seed/${FEATURED.seed}/900/1150`}
                alt={FEATURED.title}
                className="block h-auto w-full"
              />
            </figure>
          </div>

          <figcaption className="mx-10 mb-10 border-t border-rule-strong pt-5">
            <div className="flex items-baseline justify-between gap-6">
              <div>
                <h3 className="font-serif text-[1.25rem] font-medium leading-tight tracking-[-0.01em]">
                  {FEATURED.title}
                </h3>
                <p className="font-serif italic text-sm text-ink-soft">
                  {FEATURED.artist}
                </p>
              </div>
              <span className="font-mono text-[11px] text-ink-muted">
                {FEATURED.date}
              </span>
            </div>
            <p className="mt-3 font-mono text-[11px] tracking-[0.08em] text-ink-faint">
              {FEATURED.medium.toUpperCase()} · ART INSTITUTE OF CHICAGO
            </p>
          </figcaption>
        </aside>

        {/* Guestbook side — the form */}
        <section className="flex flex-col px-6 py-10 sm:px-10 md:px-14 lg:py-16">
          <header className="mb-10">
            <p className="eyebrow mb-3">{eyebrow}</p>
            <h1 className="font-serif text-[2.25rem] font-normal leading-[1.08] tracking-[-0.015em] text-ink sm:text-[2.6rem]">
              {title}
            </h1>
            <div className="mt-6 h-px w-12 bg-ink" />
          </header>

          <div className="w-full max-w-[420px]">{children}</div>

          <p className="mt-auto pt-12 font-mono text-[10px] tracking-[0.14em] text-ink-faint">
            SOCIAL ART · SALA DE REGISTRO · 2026
          </p>
        </section>
      </div>
    </div>
  )
}
