import { artServerFn } from '@/api/art.function'
import { Button } from '@/components/ui/button'
import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
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
      <div className="mx-auto w-full max-w-6xl rounded-xl border p-8">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold">Galería</h1>
          <Button
            variant="outline"
            onClick={async () => {
              await authClient.signOut()
              await router.navigate({ to: '/login' })
            }}
          >
            Cerrar sesión
          </Button>
        </div>

        {isLoading ? (
          <p className="text-sm text-gray-600">Cargando...</p>
        ) : null}

        {!isLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mb-8">
            {artworks.map((artwork) => (
              <Card key={artwork.id} className="overflow-hidden">
                <div className="aspect-4/3 w-full bg-muted overflow-hidden">
                  {artwork.id ? (
                    <img
                      src={`https://picsum.photos/seed/${artwork.id}/843/600`}
                      alt={artwork.title}
                      className="w-full h-full object-cover transition-transform hover:scale-105 duration-300"
                      loading="lazy"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center bg-gray-100 text-gray-400">
                      Sin imagen
                    </div>
                  )}
                </div>
                <CardHeader>
                  <CardTitle className="line-clamp-1" title={artwork.title}>
                    {artwork.title}
                  </CardTitle>
                  <CardDescription className="line-clamp-1">
                    {artwork.artist_display}
                  </CardDescription>
                </CardHeader>
                <CardFooter>
                  <p className="text-xs text-muted-foreground">
                    {artwork.date_display}
                  </p>
                </CardFooter>
              </Card>
            ))}
          </div>
        ) : null}
      </div>
    </div>
  )
}
