import React, { useEffect, useState } from 'react'
import { getTopAnimes } from '@/services/api'
import AnimeCard from '@/components/AnimeCard'
import LoadingSpinner from '@/components/LoadingSpinner'
import { Anime } from '@/types/anime'
import './styles.scss'

const Home: React.FC = () => {
  const [animes, setAnimes] = useState<Anime[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchTopAnimes = async () => {
      try {
        setLoading(true)
        const response = await getTopAnimes(1, 6)
        setAnimes(response.data)
      } catch (err) {
        setError('Failed to fetch top animes. Please try again later.')
        console.error(err)
      } finally {
        setLoading(false)
      }
    }

    fetchTopAnimes()
  }, [])

  if (loading) return <LoadingSpinner />
  if (error) return <div className="alert alert-danger">{error}</div>

  return (
    <div className="home-page">
      <section className="hero-section mb-5">
        <div className="container">
          <div className="row align-items-center">
            <div className="col-lg-6">
              <h1 className="display-4 fw-bold mb-4">Descubra Animes Incríveis</h1>
              <p className="lead mb-4">
                Encontre seu próximo anime favorito! Veja avaliações, informações detalhadas e muito mais.
              </p>
              <a href="/top-animes" className="btn btn-primary btn-lg">
                Explore os Animes Mais Populares
              </a>
            </div>
            <div className="col-lg-6">
              <img
                src={import.meta.env.BASE_URL + "hero-image.png"}
                alt="Anime characters"
                className="img-fluid rounded shadow"
              />
            </div>
          </div>
        </div>
      </section>

      <section className="featured-animes">
        <div className="container">
          <h2 className="text-center mb-5">Populares Esta Temporada</h2>
          <div className="row">
            {animes.map((anime) => (
              <AnimeCard key={anime.mal_id} anime={anime} />
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}

export default Home