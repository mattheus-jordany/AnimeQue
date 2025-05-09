import React from 'react'
import { Anime } from '@/types/anime'
import './styles.scss'

interface AnimeCardProps {
  anime: Anime
}

const AnimeCard: React.FC<AnimeCardProps> = ({ anime }) => {
  return (
    <div className="anime-card col-md-4 col-sm-6 mb-4">
      <div className="card h-100">
        <img
          src={anime.images?.jpg?.image_url || '/placeholder.jpg'}
          className="card-img-top"
          alt={anime.title}
        />
        <div className="card-body">
          <h5 className="card-title">{anime.title}</h5>
          <div className="d-flex justify-content-between align-items-center mb-2">
            <span className="badge bg-primary">{anime.type}</span>
            <span className="text-muted">
              {anime.episodes ? `${anime.episodes} Episódios` : 'Unknown'}
            </span>
          </div>
          <div className="d-flex justify-content-between align-items-center mb-3">
            <span className="text-warning">
              ⭐ {anime.score || 'N/A'} ({anime.scored_by?.toLocaleString() || 0})
            </span>
            <span className="text-muted">
              {anime.year || 'Unknown year'}</span>
          </div>
          <p className="card-text text-truncate">{anime.synopsis}</p>
        </div>
        <div className="card-footer bg-transparent">
          <a
            href={`/anime/${anime.mal_id}`}
            className="btn btn-sm btn-outline-primary w-100"
          >
            Ver Detalhes
          </a>
        </div>
      </div>
    </div>
  )
}

export default AnimeCard