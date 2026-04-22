export function MuseumSign({
  text,
  subtitle = 'un momento, por favor',
}: {
  text: string
  subtitle?: string
}) {
  return (
    <div className="flex min-h-screen items-center justify-center bg-paper">
      <div className="flex flex-col items-center gap-4">
        <div className="flex items-center gap-3 font-mono text-[11px] tracking-[0.22em] text-ink-muted uppercase">
          <span className="h-px w-8 bg-rule-strong" />
          {text}
          <span className="h-px w-8 bg-rule-strong" />
        </div>
        <span className="font-serif italic text-sm text-ink-faint">
          {subtitle}
        </span>
      </div>
    </div>
  )
}
