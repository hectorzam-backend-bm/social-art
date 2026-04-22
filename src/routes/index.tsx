import { createFileRoute, useRouter } from '@tanstack/react-router'
import { useEffect } from 'react'

import { MuseumSign } from '@/components/museum-sign'
import { authClient } from '@/lib/auth-client'

export const Route = createFileRoute('/')({
  component: HomePage,
})

function HomePage() {
  const router = useRouter()
  const { data: session, isPending } = authClient.useSession()

  useEffect(() => {
    if (isPending) return

    if (session?.user) {
      void router.navigate({ to: '/gallery' })
      return
    }

    void router.navigate({ to: '/login' })
  }, [isPending, router, session])

  return <MuseumSign text="Verificando entrada" />
}
