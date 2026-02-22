// src/routes/fetch-movies.tsx
import type { ArtApiResponse } from '@/types/art-api'
import { createServerFn } from '@tanstack/react-start'
import { z } from 'zod'

const API_URL =
  'https://api.artic.edu/api/v1/artworks?fields=id,title,artist_display,date_display,main_reference_number,image_id'

export const artServerFn = createServerFn({ method: 'GET' })
  .inputValidator(
    z.object({
      page: z.number().optional().default(1),
      limit: z.number().optional().default(12),
    }),
  )
  .handler(async ({ data }) => {
    const { page, limit } = data
    const url = new URLSearchParams({
      page: page.toString(),
      limit: limit.toString(),
    })
    const response = await fetch(`${API_URL}&${url.toString()}`)

    if (!response.ok) {
      throw new Error('Error al obtener obras de arte')
    }

    return (await response.json()) as ArtApiResponse
  })
