import { Link } from '@tanstack/react-router'

import { authClient } from '@/lib/auth-client'

export default function BetterAuthHeader() {
  const { data: session, isPending } = authClient.useSession()

  if (isPending) {
    return (
      <div className="h-7 w-28 animate-pulse bg-paper-inset" aria-hidden />
    )
  }

  if (session?.user) {
    const initial = session.user.name.charAt(0).toUpperCase() || 'V'
    return (
      <div className="flex items-center gap-3">
        <div className="hidden items-baseline gap-2 sm:flex">
          <span className="eyebrow">Visitante</span>
          <span className="font-serif italic text-sm text-ink">
            {session.user.name}
          </span>
        </div>
        <button
          type="button"
          onClick={() => void authClient.signOut()}
          className="group/np flex items-center gap-2 border-l border-rule pl-3"
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

  return (
    <Link
      to="/login"
      className="inline-flex h-9 items-center border border-rule-strong bg-paper-raised px-4 font-mono text-[11px] tracking-[0.14em] text-ink uppercase transition-colors hover:border-oxblood hover:text-oxblood"
    >
      Iniciar sesión
    </Link>
  )
}
