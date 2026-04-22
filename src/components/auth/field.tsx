import type { ReactNode } from 'react'

import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'

export function toErrorMessage(error: unknown) {
  if (typeof error === 'string') return error
  if (
    error &&
    typeof error === 'object' &&
    'message' in error &&
    typeof (error as { message?: unknown }).message === 'string'
  ) {
    return (error as { message: string }).message
  }
  return 'Valor inválido'
}

type FieldShellProps = {
  index: string
  label: string
  hint?: string
  error?: ReactNode
  children: ReactNode
}

export function FieldShell({
  index,
  label,
  hint,
  error,
  children,
}: FieldShellProps) {
  return (
    <div className="group/field">
      <div className="mb-2 flex items-baseline justify-between gap-4">
        <Label className="font-mono text-[11px] tracking-[0.14em] text-ink-muted uppercase">
          <span className="mr-2 text-ink-faint">{index}</span>
          {label}
        </Label>
        {hint ? (
          <span className="font-mono text-[10px] tracking-[0.08em] text-ink-faint uppercase">
            {hint}
          </span>
        ) : null}
      </div>
      {children}
      {error ? (
        <p
          role="alert"
          className="mt-2 font-serif italic text-[0.8rem] text-(--critical)"
        >
          {error}
        </p>
      ) : null}
    </div>
  )
}

type FieldProps = {
  id: string
  index: string
  label: string
  type?: string
  placeholder?: string
  value: string
  onChange: (value: string) => void
  onBlur: () => void
  errors: Array<unknown>
  autoComplete?: string
}

export function Field({
  id,
  index,
  label,
  type = 'text',
  placeholder,
  value,
  onChange,
  onBlur,
  errors,
  autoComplete,
}: FieldProps) {
  const hasError = errors.length > 0
  return (
    <FieldShell
      index={index}
      label={label}
      error={
        hasError
          ? errors.map((e) => toErrorMessage(e)).join(' · ')
          : undefined
      }
    >
      <Input
        id={id}
        name={id}
        type={type}
        placeholder={placeholder}
        autoComplete={autoComplete}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        onBlur={onBlur}
        aria-invalid={hasError || undefined}
      />
    </FieldShell>
  )
}
