import React from 'react'
import './styles.scss'

const Footer: React.FC = () => {
  return (
    <footer className="footer bg-dark text-white py-4 mt-5">
      <div className="container">
        <div className="row">
          <div className="col-md-6">
            <h5>Sobre AnimeQue</h5>
            <p>
              AnimeQue é uma plataforma para descobrir e explorar informações sobre seus animes
              favoritos usando a API Jikan.
            </p>
          </div>
          <div className="col-md-3">
            <h5>Links</h5>
            <ul className="list-unstyled">
              <li>
                <a href="https://jikan.moe/" target="_blank" rel="noopener noreferrer">
                  Jikan API
                </a>
              </li>
              <li>
                <a
                  href="https://myanimelist.net/"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  MyAnimeList
                </a>
              </li>
            </ul>
          </div>
          <div className="col-md-3">
            <h5>Contato</h5>
            <p>Email: mattheus.rodrigues@estudante.ufla.br</p>
          </div>
        </div>
        <div className="text-center mt-3">
          <p className="mb-0">&copy; {new Date().getFullYear()} AnimeQue</p>
        </div>
      </div>
    </footer>
  )
}

export default Footer