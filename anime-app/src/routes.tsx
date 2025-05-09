import React from 'react'
import { createBrowserRouter } from 'react-router-dom'
import App from './App'
import Home from './pages/Home'
import TopAnimes from './pages/TopAnimes'
import AnimeDetails from './pages/AnimeDetails'
import Search from './pages/Search'

export const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      {
        path: '/',
        element: <Home />,
      },
      {
        path: '/top-animes',
        element: <TopAnimes />,
      },
      {
        path: '/anime/:id',
        element: <AnimeDetails />,
      },
      {
        path: '/search',
        element: <Search />,
      },
    ],
  },
])