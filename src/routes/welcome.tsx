import { Button } from '@/components/ui/button'
import { authClient } from '@/lib/auth-client'
import { createFileRoute, useRouter } from '@tanstack/react-router'
import { useEffect } from 'react'

export const Route = createFileRoute('/welcome')({
  component: WelcomePage,
})

function WelcomePage() {
  const router = useRouter()
  const { data: session, isPending } = authClient.useSession()

  useEffect(() => {
    if (!isPending && !session?.user) {
      void router.navigate({ to: '/login' })
    }
  }, [isPending, router, session])

  if (isPending) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-sm text-gray-600">Verificando sesión...</p>
      </div>
    )
  }

  if (!session?.user) {
    return null
  }

  return (
    <div className="min-h-screen flex items-center justify-center px-6">
      <div className="w-full max-w-md rounded-xl border p-8 text-center">
        <h1 className="text-2xl font-bold mb-2">Bienvenido a Social Art 🎨</h1>
        <p className="text-gray-600 mb-6">Hola, {session.user.name}.</p>
        <Button
          onClick={async () => {
            await authClient.signOut()
            await router.navigate({ to: '/login' })
          }}
        >
          Cerrar sesión
        </Button>
      </div>
    </div>
  )
}