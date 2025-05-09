import React, { useEffect, useState } from 'react'
import { getTopAnimes } from '@/services/api'
import AnimeCard from '@/components/AnimeCard'
import LoadingSpinner from '@/components/LoadingSpinner'
import Pagination from '@/components/Pagination'
import { Anime } from '@/types/anime'
import './styles.scss'

const TopAnimes: React.FC = () => {
  const [animes, setAnimes] = useState<Anime[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [currentPage, setCurrentPage] = useState(1)
  const [totalPages, setTotalPages] = useState(1)

  useEffect(() => {
    const fetchTopAnimes = async () => {
      try {
        setLoading(true)
        const response = await getTopAnimes(currentPage)
        setAnimes(response.data)
        setTotalPages(response.pagination?.last_visible_page || 1)
      } catch (err) {
        setError('Failed to fetch top animes. Please try again later.')
        console.error(err)
      } finally {
        setLoading(false)
      }
    }

    fetchTopAnimes()
  }, [currentPage])

  const handlePageChange = (page: number) => {
    setCurrentPage(page)
  }

  if (loading) return <LoadingSpinner />
  if (error) return <div className="alert alert-danger">{error}</div>

  return (
    <div className="top-animes-page">
      <div className="container">
        <h1 className="text-center mb-5">Melhores Avaliados</h1>
        
        <div className="row">
          {animes.map((anime) => (
            <AnimeCard key={anime.mal_id} anime={anime} />
          ))}
        </div>

        <div className="d-flex justify-content-center mt-5">
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={handlePageChange}
          />
        </div>
      </div>
    </div>
  )
}

export default TopAnimes