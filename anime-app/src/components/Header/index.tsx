import React from 'react'
import { Link } from 'react-router-dom'
import './styles.scss'
import logo from '@/assets/logo.png' 

const Header: React.FC = () => {
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
      <div className="container">
        <Link className="navbar-brand d-flex align-items-center" to="/">
          <img 
            src={logo} 
            alt="AnimeQue Logo"
            className="me-2 logo-img" 
            style={{
              height: '40px', 
              width: 'auto',
            }}
          />
          AnimeQue
        </Link>
        
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav ms-auto">
            <li className="nav-item">
              <Link className="nav-link" to="/">
                Inicio
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/top-animes">
                Melhores Animes
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/search">
                Busca
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  )
}

export default Header