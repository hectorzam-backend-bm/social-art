export type ArtApiResponse = {
  pagination: Pagination
  data: Data[]
  info: Info
  config: Config
}

export type Pagination = {
  total: number
  limit: number
  offset: number
  total_pages: number
  current_page: number
  next_url: string
}

export type Data = {
  id: number
  title: string
  main_reference_number: string
  date_display: string
  artist_display: string
  image_id: string | null
}

export type Info = {
  license_text: string
  license_links: string[]
  version: string
}

export type Config = {
  iiif_url: string
  website_url: string
}
