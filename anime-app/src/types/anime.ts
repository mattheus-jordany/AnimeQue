export interface Anime {
  mal_id: number
  title: string
  title_japanese?: string
  images?: {
    jpg?: {
      image_url?: string
      large_image_url?: string
    }
  }
  type?: string
  episodes?: number
  score?: number
  scored_by?: number
  year?: number
  synopsis?: string
  genres?: Array<{
    mal_id: number
    name: string
  }>
  rank?: number
  status?: string
  source?: string
  studios?: Array<{
    mal_id: number
    name: string
  }>
  duration?: string
  rating?: string
  season?: string
}