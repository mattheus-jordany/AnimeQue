import axios from 'axios'

const BASE_URL = 'https://api.jikan.moe/v4'

export const api = axios.create({
  baseURL: BASE_URL,
  timeout: 10000,
})

export const getTopAnimes = async (page = 1, limit = 15) => {
  try {
    const response = await api.get(`/top/anime?page=${page}&limit=${limit}`)
    return response.data
  } catch (error) {
    console.error('Error fetching top animes:', error)
    throw error
  }
}

export const getAnimeDetails = async (id: number) => {
  try {
    const response = await api.get(`/anime/${id}/full`)
    return response.data
  } catch (error) {
    console.error('Error fetching anime details:', error)
    throw error
  }
}

export const searchAnimes = async (query: string, page = 1) => {
  try {
    const response = await api.get(`/anime?q=${query}&page=${page}`)
    return response.data
  } catch (error) {
    console.error('Error searching animes:', error)
    throw error
  }
}