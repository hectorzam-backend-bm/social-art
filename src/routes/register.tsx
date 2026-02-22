import { Register } from '@/components/auth/register'
import { authClient } from '@/lib/auth-client'
import { createFileRoute, useRouter } from '@tanstack/react-router'
import { useEffect } from 'react'

export const Route = createFileRoute('/register')({
  component: RegisterPage,
})

function RegisterPage() {
  const router = useRouter()
  const { data: session, isPending } = authClient.useSession()

  useEffect(() => {
    if (!isPending && session?.user) {
      void router.navigate({ to: '/welcome' })
    }
  }, [isPending, router, session])

  if (isPending) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-sm text-gray-600">Verificando sesión...</p>
      </div>
    )
  }

  if (session?.user) {
    return null
  }

  return <Register />
}
