import { useState, useEffect } from 'react'
import { fetchPopularMovies, searchMovies } from '../services/tmdb'

export function useMovies() {
    const [movies, setMovies] = useState([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)
    const [query, setQuery] = useState('') //query agora vive aqui

    useEffect(() => {
        const fetcher = query ? searchMovies(query) : fetchPopularMovies()

        setLoading(true)
        setError(null)

        fetcher
        .then(data => setMovies(data))
        .catch(err => setError(err.message))
        .finally(() => setLoading(false))
    }, [query])

    return { movies, loading, error, query, setQuery}
}