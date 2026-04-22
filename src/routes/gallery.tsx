import { useQuery } from '@tanstack/react-query'
import { createFileRoute, useRouter } from '@tanstack/react-router'
import { useEffect } from 'react'

import { artServerFn } from '@/api/art.function'
import { authClient } from '@/lib/auth-client'
import type { ArtApiResponse, Data as ArtworkData } from '@/types/art-api'

export const Route = createFileRoute('/gallery')({
  component: GalleryPage,
})

function GalleryPage() {
  const router = useRouter()
  const { data: session, isPending } = authClient.useSession()
  const isAuthenticated = !!session?.user

  const { data, isLoading } = useQuery<ArtApiResponse>({
    queryKey: ['artworks'],
    queryFn: () => artServerFn({ data: {} }),
    enabled: !isPending && isAuthenticated,
  })

  useEffect(() => {
    if (!isPending && !session?.user) {
      void router.navigate({ to: '/login' })
    }
  }, [isPending, router, session])

  if (isPending) {
    return <MuseumSign text="Verificando entrada" />
  }

  if (!session?.user) {
    return null
  }

  const artworks: Array<ArtworkData> = data?.data ?? []
  const userName = session.user.name || 'Visitante'

  return (
    <div className="min-h-screen bg-paper text-ink">
      {/* Wayfinding strip — top of every gallery */}
      <div className="border-b border-rule">
        <div className="mx-auto flex h-12 w-full max-w-[1400px] items-center justify-between px-6 sm:px-10">
          <span className="eyebrow">
            Social Art · Colección · Sala 001
          </span>
          <DocentNameplate
            name={userName}
            onSignOut={async () => {
              await authClient.signOut()
              await router.navigate({ to: '/login' })
            }}
          />
        </div>
      </div>

      {/* Catalog masthead */}
      <header className="border-b border-rule">
        <div className="mx-auto w-full max-w-[1400px] px-6 py-14 sm:px-10 sm:py-20">
          <p className="eyebrow mb-6">Exposición permanente · 2026</p>
          <h1 className="font-serif text-[2.75rem] font-normal leading-[1.02] tracking-[-0.02em] text-ink sm:text-[4rem]">
            Piezas escogidas de la
            <br />
            <span className="italic">colección mundial</span>.
          </h1>

          <div className="mt-10 flex flex-wrap items-baseline gap-x-10 gap-y-3 border-t border-rule-strong pt-5">
            <MetaField label="Obras en sala" value={String(artworks.length || '—')} />
            <MetaField label="Procedencia" value="Art Institute of Chicago" />
            <MetaField label="Curaduría" value="Acceso público · API" />
            <MetaField label="Actualizado" value="Hoy" mono />
          </div>
        </div>
      </header>

      {/* The hang */}
      <main className="mx-auto w-full max-w-[1400px] px-6 py-14 sm:px-10">
        {isLoading ? (
          <GalleryLoading />
        ) : artworks.length === 0 ? (
          <EmptyHall />
        ) : (
          <div className="grid grid-cols-1 gap-x-10 gap-y-16 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {artworks.map((artwork, idx) => (
              <WallLabelCard key={artwork.id} artwork={artwork} index={idx} />
            ))}
          </div>
        )}
      </main>

      <footer className="border-t border-rule">
        <div className="mx-auto flex w-full max-w-[1400px] flex-wrap items-center justify-between gap-3 px-6 py-6 sm:px-10">
          <p className="font-mono text-[10px] tracking-[0.14em] text-ink-faint uppercase">
            Social Art · Sala de registro · 2026
          </p>
          <p className="font-serif italic text-xs text-ink-muted">
            Las imágenes se muestran con fines educativos.
          </p>
        </div>
      </footer>
    </div>
  )
}

function MetaField({
  label,
  value,
  mono,
}: {
  label: string
  value: string
  mono?: boolean
}) {
  return (
    <div className="flex flex-col">
      <span className="eyebrow">{label}</span>
      <span
        className={
          mono
            ? 'mt-1 font-mono text-sm text-ink'
            : 'mt-1 font-serif text-sm text-ink'
        }
      >
        {value}
      </span>
    </div>
  )
}

function WallLabelCard({
  artwork,
  index,
}: {
  artwork: ArtworkData
  index: number
}) {
  const catalog =
    artwork.main_reference_number || String(artwork.id).padStart(6, '0')
  return (
    <article className="group flex flex-col">
      {/* hung image with passepartout */}
      <figure className="passepartout transition-colors duration-300 group-hover:border-gilt">
        <div className="aspect-[4/5] overflow-hidden bg-paper-inset">
          {artwork.id ? (
            <img
              src={`https://picsum.photos/seed/${artwork.id}/700/875`}
              alt={artwork.title}
              loading="lazy"
              className="h-full w-full object-cover transition-[filter,transform] duration-[600ms] ease-out group-hover:scale-[1.015] group-hover:brightness-[1.04]"
            />
          ) : (
            <div className="flex h-full w-full items-center justify-center font-serif italic text-ink-faint">
              Obra en conservación
            </div>
          )}
        </div>
      </figure>

      {/* wall label — the signature element */}
      <div className="mt-5 flex items-start gap-5">
        <span className="mt-[0.35rem] font-mono text-[10px] tracking-[0.1em] text-ink-faint uppercase">
          {String(index + 1).padStart(2, '0')}
        </span>
        <div className="min-w-0 flex-1">
          <p className="font-mono text-[10px] tracking-[0.14em] text-ink-muted uppercase">
            No. {catalog}
          </p>
          <h3
            className="mt-1 font-serif text-[1.05rem] leading-snug font-medium tracking-[-0.005em] text-ink line-clamp-2"
            title={artwork.title}
          >
            {artwork.title}
          </h3>
          <p className="mt-1 font-serif italic text-sm text-ink-soft line-clamp-1">
            {artwork.artist_display || 'Autoría desconocida'}
          </p>
          {artwork.date_display ? (
            <p className="mt-2 font-mono text-[11px] text-ink-muted">
              {artwork.date_display}
            </p>
          ) : null}
        </div>
      </div>
    </article>
  )
}

function DocentNameplate({
  name,
  onSignOut,
}: {
  name: string
  onSignOut: () => void | Promise<void>
}) {
  const initial = name.charAt(0).toUpperCase() || 'V'
  return (
    <div className="flex items-center gap-4">
      <div className="hidden items-baseline gap-2 sm:flex">
        <span className="eyebrow">Visitante</span>
        <span className="font-serif italic text-sm text-ink">{name}</span>
      </div>
      <button
        type="button"
        onClick={() => void onSignOut()}
        className="group/np flex items-center gap-2 border-l border-rule pl-4"
      >
        <span className="flex size-7 items-center justify-center rounded-sm border border-rule-strong bg-paper-inset font-mono text-[11px] tracking-wide text-ink-soft transition-colors group-hover/np:border-oxblood group-hover/np:text-oxblood">
          {initial}
        </span>
        <span className="font-mono text-[10px] tracking-[0.14em] text-ink-muted uppercase transition-colors group-hover/np:text-oxblood">
          Salir
        </span>
      </button>
    </div>
  )
}

function GalleryLoading() {
  return (
    <div className="grid grid-cols-1 gap-x-10 gap-y-16 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      {Array.from({ length: 8 }).map((_, i) => (
        <div key={i} className="flex animate-pulse flex-col">
          <div className="passepartout">
            <div className="aspect-[4/5] bg-paper-inset" />
          </div>
          <div className="mt-5 flex items-start gap-5">
            <div className="mt-[0.45rem] h-2 w-6 bg-paper-sunk" />
            <div className="flex-1 space-y-2">
              <div className="h-2 w-24 bg-paper-sunk" />
              <div className="h-3 w-5/6 bg-paper-sunk" />
              <div className="h-2 w-2/3 bg-paper-sunk" />
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}

function EmptyHall() {
  return (
    <div className="mx-auto max-w-md border border-rule bg-paper-raised px-8 py-16 text-center">
      <p className="eyebrow">Sala vacía</p>
      <h2 className="mt-4 font-serif text-[1.6rem] leading-snug text-ink">
        Las obras están en montaje.
      </h2>
      <p className="mt-3 font-serif italic text-sm text-ink-soft">
        Vuelve en unos instantes — el catálogo se actualiza desde el Art
        Institute of Chicago.
      </p>
    </div>
  )
}

function MuseumSign({ text }: { text: string }) {
  return (
    <div className="flex min-h-screen items-center justify-center bg-paper">
      <div className="flex flex-col items-center gap-4">
        <div className="flex items-center gap-3 font-mono text-[11px] tracking-[0.22em] text-ink-muted uppercase">
          <span className="h-px w-8 bg-rule-strong" />
          {text}
          <span className="h-px w-8 bg-rule-strong" />
        </div>
        <span className="font-serif italic text-sm text-ink-faint">
          un momento, por favor
        </span>
      </div>
    </div>
  )
}
