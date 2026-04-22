import { useState } from 'react'
import { useForm } from '@tanstack/react-form'
import { useRouter } from '@tanstack/react-router'

import { Button } from '@/components/ui/button'
import { ExhibitionFrame } from '@/components/auth/exhibition-frame'
import { Field, toErrorMessage } from '@/components/auth/field'
import type { LoginSchemaType } from '@/helpers/zod/login-schema'
import { LoginSchema } from '@/helpers/zod/login-schema'
import { authClient } from '@/lib/auth-client'

export function Login() {
  const router = useRouter()
  const [authError, setAuthError] = useState<string | null>(null)

  const form = useForm({
    defaultValues: {
      email: '',
      password: '',
    } satisfies LoginSchemaType,
    validators: {
      onChange: LoginSchema,
    },
    onSubmit: async ({ value }) => {
      setAuthError(null)
      const { error } = await authClient.signIn.email({
        email: value.email,
        password: value.password,
      })
      if (error) {
        setAuthError(toErrorMessage(error) || 'No fue posible iniciar sesión')
      } else {
        void router.navigate({ to: '/gallery' })
      }
    },
  })

  return (
    <ExhibitionFrame
      eyebrow="Entrada de visitantes · Iniciar sesión"
      title="Bienvenido de vuelta a la sala."
    >
      <form
        className="space-y-7"
        onSubmit={(e) => {
          e.preventDefault()
          e.stopPropagation()
          form.handleSubmit()
        }}
      >
        {authError ? (
          <div
            role="alert"
            className="border-l-2 border-(--critical) bg-paper-inset px-4 py-3"
          >
            <p className="eyebrow mb-1 text-(--critical)">Aviso</p>
            <p className="font-serif italic text-sm text-ink-soft">
              {authError}
            </p>
          </div>
        ) : null}

        <form.Field
          name="email"
          children={(field) => (
            <Field
              id="email"
              index="01"
              label="Correo electrónico"
              type="email"
              autoComplete="email"
              placeholder="nombre@ejemplo.com"
              value={field.state.value}
              onChange={field.handleChange}
              onBlur={field.handleBlur}
              errors={field.state.meta.errors}
            />
          )}
        />

        <form.Field
          name="password"
          children={(field) => (
            <Field
              id="password"
              index="02"
              label="Contraseña"
              type="password"
              autoComplete="current-password"
              placeholder="••••••••"
              value={field.state.value}
              onChange={field.handleChange}
              onBlur={field.handleBlur}
              errors={field.state.meta.errors}
            />
          )}
        />

        <div className="pt-2">
          <form.Subscribe
            selector={(state) => [state.canSubmit, state.isSubmitting]}
            children={([canSubmit, isSubmitting]) => (
              <Button
                type="submit"
                size="lg"
                className="w-full"
                disabled={!canSubmit}
              >
                {isSubmitting ? 'Abriendo la puerta…' : 'Entrar a la galería'}
              </Button>
            )}
          />
        </div>

        <div className="flex items-center gap-4 pt-2">
          <div className="h-px flex-1 bg-rule" />
          <span className="font-mono text-[10px] tracking-[0.14em] text-ink-faint uppercase">
            o
          </span>
          <div className="h-px flex-1 bg-rule" />
        </div>

        <p className="text-center font-serif italic text-sm text-ink-soft">
          ¿Primera visita?{' '}
          <button
            type="button"
            onClick={() => void router.navigate({ to: '/register' })}
            className="font-serif not-italic text-oxblood underline decoration-rule-strong underline-offset-[5px] hover:decoration-oxblood"
          >
            Regístrate en la recepción
          </button>
        </p>
      </form>
    </ExhibitionFrame>
  )
}
