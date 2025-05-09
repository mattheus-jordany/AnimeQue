import React, { useState, useEffect } from 'react'
import { searchAnimes } from '@/services/api'
import AnimeCard from '@/components/AnimeCard'
import LoadingSpinner from '@/components/LoadingSpinner'
import Pagination from '@/components/Pagination'
import { Anime } from '@/types/anime'
import './styles.scss'

const Search: React.FC = () => {
  const [query, setQuery] = useState('')
  const [animes, setAnimes] = useState<Anime[]>([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [currentPage, setCurrentPage] = useState(1)
  const [totalPages, setTotalPages] = useState(1)

  useEffect(() => {
    if (query.trim() === '') {
      setAnimes([])
      return
    }

    const delayDebounceFn = setTimeout(() => {
      performSearch()
    }, 500)

    return () => clearTimeout(delayDebounceFn)
  }, [query, currentPage])

  const performSearch = async () => {
    try {
      setLoading(true)
      const response = await searchAnimes(query, currentPage)
      setAnimes(response.data)
      setTotalPages(response.pagination?.last_visible_page || 1)
      setError(null)
    } catch (err) {
      setError('Failed to search animes. Please try again later.')
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  const handlePageChange = (page: number) => {
    setCurrentPage(page)
  }

  return (
    <div className="search-page">
      <div className="container">
        <h1 className="text-center mb-5">Search Animes</h1>

        <div className="search-box mb-5">
          <div className="input-group">
            <input
              type="text"
              className="form-control form-control-lg"
              placeholder="Buscar por Animes..."
              value={query}
              onChange={(e) => {
                setQuery(e.target.value)
                setCurrentPage(1)
              }}
            />
            <button
              className="btn btn-primary"
              type="button"
              onClick={performSearch}
              disabled={loading || query.trim() === ''}
            >
              {loading ? 'Buscando...' : 'Buscar'}
            </button>
          </div>
        </div>

        {loading && <LoadingSpinner />}

        {error && <div className="alert alert-danger">{error}</div>}

        {!loading && !error && animes.length > 0 && (
          <>
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
          </>
        )}

        {!loading && !error && query.trim() !== '' && animes.length === 0 && (
          <div className="alert alert-info">Nenhum resultado para "{query}"</div>
        )}

        {!loading && !error && query.trim() === '' && (
          <div className="alert alert-secondary">Busque por animes digitando algo.</div>
        )}
      </div>
    </div>
  )
}

export default Search