import { createFileRoute, useRouter } from '@tanstack/react-router'
import { useEffect } from 'react'

import { Register } from '@/components/auth/register'
import { MuseumSign } from '@/components/museum-sign'
import { authClient } from '@/lib/auth-client'

export const Route = createFileRoute('/register')({
  component: RegisterPage,
})

function RegisterPage() {
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

  return <Register />
}
