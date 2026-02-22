import { authClient } from '@/lib/auth-client'
import { createFileRoute, useRouter } from '@tanstack/react-router'
import { useEffect } from 'react'

export const Route = createFileRoute('/')({
  component: HomePage,
})

function HomePage() {
  const router = useRouter()
  const { data: session, isPending } = authClient.useSession()

  useEffect(() => {
    if (isPending) return

    if (session?.user) {
      void router.navigate({ to: '/welcome' })
      return
    }

    void router.navigate({ to: '/login' })
  }, [isPending, router, session])

  return (
    <div className="min-h-screen flex items-center justify-center">
      <p className="text-sm text-gray-600">Verificando sesión...</p>
    </div>
  )
}
