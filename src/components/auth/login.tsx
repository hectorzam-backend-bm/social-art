import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import type { LoginSchemaType } from '@/helpers/zod/login-schema'
import { LoginSchema } from '@/helpers/zod/login-schema'
import { authClient } from '@/lib/auth-client'
import { useForm } from '@tanstack/react-form'
import { useRouter } from '@tanstack/react-router'
import { useState } from 'react'

function toErrorMessage(error: unknown) {
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
        console.error('Error logging in', error)
        setAuthError(toErrorMessage(error) || 'Ocurrió un error al iniciar sesión')
      } else {
        router.navigate({ to: '/welcome' })
      }
    },
  })
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50">
      <div className="w-full max-w-md p-8 bg-white rounded-xl shadow-md">
        <h1 className="text-2xl font-bold text-center mb-6">
          Iniciar Sesión en Social Art
        </h1>
        {authError && (
          <div className="mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded text-sm text-center">
            {authError}
          </div>
        )}
        <Card>
          <form
            className="space-y-4 p-4"
            onSubmit={(e) => {
              e.preventDefault()
              e.stopPropagation()
              form.handleSubmit()
            }}
          >
            <form.Field
              name="email"
              children={(field) => {
                return (
                  <div>
                    <Label
                      htmlFor="email"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Correo Electrónico
                    </Label>
                    <Input
                      id={field.name}
                      type="email"
                      name={field.name}
                      value={field.state.value}
                      onChange={(e) => field.handleChange(e.target.value)}
                      onBlur={field.handleBlur}
                      placeholder="Correo Electrónico"
                    />
                    {field.state.meta.errors.length ? (
                      <em
                        role="alert"
                        className="text-red-500 text-xs mt-1 block"
                      >
                        {field.state.meta.errors
                          .map((error) => toErrorMessage(error))
                          .join(', ')}
                      </em>
                    ) : null}
                  </div>
                )
              }}
            />

            <form.Field
              name="password"
              children={(field) => {
                return (
                  <div>
                    <Label
                      htmlFor="password"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Contraseña
                    </Label>
                    <Input
                      id={field.name}
                      type="password"
                      name={field.name}
                      value={field.state.value}
                      onChange={(e) => field.handleChange(e.target.value)}
                      onBlur={field.handleBlur}
                      placeholder="Contraseña"
                    />
                    {field.state.meta.errors.length ? (
                      <em
                        role="alert"
                        className="text-red-500 text-xs mt-1 block"
                      >
                        {field.state.meta.errors
                          .map((error) => toErrorMessage(error))
                          .join(', ')}
                      </em>
                    ) : null}
                  </div>
                )
              }}
            />
            <form.Subscribe
              selector={(state) => [state.canSubmit, state.isSubmitting]}
              children={([canSubmit, isSubmitting]) => (
                <>
                  <Button type="submit" disabled={!canSubmit}>
                    {isSubmitting ? '...' : 'Iniciar sesión'}
                  </Button>
                </>
              )}
            />
            <Button
              type="button"
              variant="link"
              onClick={() => {
                void router.navigate({ to: '/register' })
              }}
            >
              ¿No tienes cuenta? Regístrate
            </Button>
          </form>
        </Card>
      </div>
    </div>
  )
}
