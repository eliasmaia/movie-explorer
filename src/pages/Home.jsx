import { useState, useEffect } from 'react'
import { fetchPopularMovies, searchMovies } from '../services/tmdb'
import { MovieCard } from '../components/MovieCard'
import { SearchBar } from '../components/SearchBar'

export function Home() {
    // Estado: dados, loading e error — o trio clássico de qualquer fetch assíncrono
    const [movies, setMovies] = useState([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)

    // useEffect: roda DEPOIS da primeira renderização (equivalente ao componentDidMount)
    // O array vazio [] significa "rode só uma vez, ao montar o componente"
    useEffect(() => {
        fetchPopularMovies()
            .then(data => setMovies(data))
            .catch(err => setError(err.message()))
            .finally(() => setLoading(false))
    }, []) // dependências — se colocar [query] aqui, roda toda vez que query mudar

    async function handleSearch(query) {
        setLoading(true)
        setError(null)
        try {
            const data = await searchMovies(query)
            setMovies(data)
        } catch (err) {
            setError(err.message)
        } finally {
            setLoading(false)
        }
    }

    // Renderização condicional: React renderiza o que o return retornar no momento
    if (loading) return <p>Carregando...</p>
    if (error) return <p>Erro: {error}</p>

    return (
        <div>
            <SearchBar onSearch={handleSearch}/>

            {/* .map() transforma o array em JSX — key é obrigatório para o React rastrear itens */}
            <div className="movie-grid">
                {movies.map(movie => (
                    <MovieCard
                        key={movie.id}
                        title={movie.title}
                        poster={movie.poster_path}
                        rating={movie.vote_average}
                    />    
                ))}
            </div>
        </div>
    )

}