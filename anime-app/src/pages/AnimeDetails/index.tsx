import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { getAnimeDetails } from '@/services/api'
import LoadingSpinner from '@/components/LoadingSpinner'
import { Anime } from '@/types/anime'
import './styles.scss'

const AnimeDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>()
  const [anime, setAnime] = useState<Anime | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchAnimeDetails = async () => {
      if (!id) return

      try {
        setLoading(true)
        const response = await getAnimeDetails(parseInt(id))
        setAnime(response.data)
      } catch (err) {
        setError('Failed to fetch anime details. Please try again later.')
        console.error(err)
      } finally {
        setLoading(false)
      }
    }

    fetchAnimeDetails()
  }, [id])

  if (loading) return <LoadingSpinner />
  if (error) return <div className="alert alert-danger">{error}</div>
  if (!anime) return <div className="alert alert-warning">Anime not found</div>

  return (
    <div className="anime-details-page">
      <div className="container">
        <div className="row">
          <div className="col-md-4">
            <img
              src={anime.images?.jpg?.large_image_url || '/placeholder.jpg'}
              alt={anime.title}
              className="img-fluid rounded shadow mb-4"
            />
          </div>
          <div className="col-md-8">
            <h1>{anime.title}</h1>
            <h4 className="text-muted">{anime.title_japanese}</h4>

            <div className="d-flex flex-wrap gap-2 my-3">
              {anime.genres?.map((genre) => (
                <span key={genre.mal_id} className="badge bg-secondary">
                  {genre.name}
                </span>
              ))}
            </div>

            <div className="anime-stats mb-4">
              <div className="row">
                <div className="col-6 col-md-3">
                  <div className="stat-box">
                    <h5>Pontuação</h5>
                    <p className="display-6 text-warning">{anime.score || 'N/A'}</p>
                  </div>
                </div>
                <div className="col-6 col-md-3">
                  <div className="stat-box">
                    <h5>Rank</h5>
                    <p className="display-6">#{anime.rank || 'N/A'}</p>
                  </div>
                </div>
                <div className="col-6 col-md-3">
                  <div className="stat-box">
                    <h5>Episódios</h5>
                    <p className="display-6">{anime.episodes || 'Unknown'}</p>
                  </div>
                </div>
                <div className="col-6 col-md-3">
                  <div className="stat-box">
                    <h5>Status</h5>
                    <p className="display-6">{anime.status || 'Unknown'}</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="synopsis mb-4">
              <h3>Sinopse</h3>
              <p>{anime.synopsis || 'No synopsis available.'}</p>
            </div>

            <div className="additional-info">
              <h3>Informações</h3>
              <ul className="list-unstyled">
                <li>
                  <strong>Tipo:</strong> {anime.type || 'Unknown'}
                </li>
                <li>
                  <strong>Baseado:</strong> {anime.source || 'Unknown'}
                </li>
                <li>
                  <strong>Estudio:</strong>{' '}
                  {anime.studios?.map((s) => s.name).join(', ') || 'Unknown'}
                </li>
                <li>
                  <strong>Duração:</strong> {anime.duration || 'Unknown'}
                </li>
                <li>
                  <strong>Avaliação:</strong> {anime.rating || 'Unknown'}
                </li>
                <li>
                  <strong>Temporada:</strong> {anime.season || 'Unknown'}
                </li>
                <li>
                  <strong>Ano:</strong> {anime.year || 'Unknown'}
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default AnimeDetails