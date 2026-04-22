import { createFileRoute, useRouter } from '@tanstack/react-router'
import { useEffect } from 'react'

import { Login } from '@/components/auth/login'
import { MuseumSign } from '@/components/museum-sign'
import { authClient } from '@/lib/auth-client'

export const Route = createFileRoute('/login')({
  component: LoginPage,
})

function LoginPage() {
  const router = useRouter()
  const { data: session, isPending } = authClient.useSession()

  useEffect(() => {
    if (!isPending && session?.user) {
      void router.navigate({ to: '/gallery' })
    }
  }, [isPending, router, session])

  if (isPending) {
    return <MuseumSign text="Verificando entrada" />
  }

  if (session?.user) {
    return null
  }

  return <Login />
}
