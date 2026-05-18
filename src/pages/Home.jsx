import { useMovies } from '../hooks/useMovies'
import { MovieCard } from '../components/MovieCard'
import { SearchBar } from '../components/SearchBar'

export function Home() {
    const { movies, loading, error, setQuery } = useMovies()
    // tudo o que precisamos em uma linha só
    // useMovies internamente tem o useEffect rodando
    // Home não precisa saber disso — só consome o resultado
    
    if (loading) return <p>Carregando...</p>
    if (error) return <p>Erro: {error}</p>

    return (
        <div>
            <SearchBar onSearch={setQuery}/>

             {/* onSearch agora chama setQuery diretamente — sem handleSearch intermediário */}
            <div className="movie-grid">
                {movies.map(movie => (
                    <MovieCard
                        key={movie.id}
                        id={movie.id}
                        title={movie.title}
                        poster={movie.poster_path}
                        rating={movie.vote_average}
                    />    
                ))}
            </div>
        </div>
    )

}