import { artServerFn } from '@/api/art.function'
import { Button } from '@/components/ui/button'
import { authClient } from '@/lib/auth-client'
import type { ArtApiResponse, Data as ArtworkData } from '@/types/art-api'
import { useQuery } from '@tanstack/react-query'
import { createFileRoute, useRouter } from '@tanstack/react-router'
import { useEffect } from 'react'

export const Route = createFileRoute('/gallery')({
  component: GalleryPage,
})

function GalleryPage() {
  const router = useRouter()
  const { data: session, isPending } = authClient.useSession()
  const isAuthenticated = !!session?.user

  const { data, isLoading } = useQuery<ArtApiResponse>({
    queryKey: ['artworks'],
    queryFn: () => artServerFn({ data: {} }),
    enabled: !isPending && isAuthenticated,
  })

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

  const artworks: ArtworkData[] = data?.data ?? []

  return (
    <div className="min-h-screen px-6 py-10">
      <div className="mx-auto w-full max-w-2xl rounded-xl border p-8">
        <h1 className="text-2xl font-bold mb-6">Galería</h1>

        {isLoading ? <p className="text-sm text-gray-600">Cargando...</p> : null}

        {!isLoading ? (
          <ul className="space-y-2 mb-8">
            {artworks.map((artwork) => (
              <li key={artwork.id} className="text-sm text-gray-900">
                {artwork.title}
              </li>
            ))}
          </ul>
        ) : null}

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