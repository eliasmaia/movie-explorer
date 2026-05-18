import { useParams, useNavigate } from "react-router-dom";
import { useState, useEffect } from 'react'
import { fetchMovieDetail } from "../services/tmdb";

export function MovieDetail() {
    const {id} = useParams()
    //      ↑ pega o :id da URL — se a URL for /movie/123, id === '123'

    const navigate = useNavigate()
    const [movie, setMovie] = useState(null)
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)

    useEffect(() => {
        fetchMovieDetail(id)
            .then(data => setMovie(data))
            .catch(err => setError(err.message))
            .finally(() => setLoading(false))
    }, [id])
    //   ↑ se o id da URL mudar, busca o novo filme

    if (loading) return <p>Carregando...</p>
    if (error)   return <p>Erro: {error}</p>

    const posterUrl = movie.poster_path
        ?   `https://image.tmdb.org/t/p/w400${movie.poster_path}`
        :   null

    return (
        <div>
            <button onClick={() => navigate(-1)}>← Voltar</button>
            {/* navigate(-1) é equivalente ao botão voltar do browser */}
            
            <div> 
                {posterUrl && <img src={posterUrl} alt={movie.title} />}
                <div>
                    <h1>{movie.title}</h1>
                    <p>{movie.overview}</p>
                    <p>⭐{movie.vote_average?.toFixed(1)}</p>
                    <p>📅{movie.release_date}</p>
                    <p>⏱ {movie.runtime} min</p>
                </div>
            </div>
        </div>
    )
}