import { useParams, useNavigate } from "react-router-dom";
import { useState, useEffect } from 'react'
import { fetchMovieDetail } from "../services/tmdb";
import { useFavorites } from "../context/FavoritesContext";

export function MovieDetail() {
    const {id}                  = useParams() //      ↑ pega o :id da URL — se a URL for /movie/123, id === '123'
    const navigate              = useNavigate()
    const { addFavorite, removeFavorite, isFavorite } = useFavorites()
    //      ↑ acessa o contexto diretamente — sem props, sem drilling

    const [movie, setMovie]     = useState(null)
    const [loading, setLoading] = useState(true)
    const [error, setError]     = useState(null)

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

    const favorited = isFavorite(movie.id)
    //                ↑ boolean — true se esse filme já está nos favoritos

    function handleFavorite() {
        if (favorited) {
            removeFavorite(movie.id)
        } else {
            addFavorite({ id: movie.id, title: movie.title, poster_path: movie.poster_path, vote_average: movie.vote_average })
        }
    }

    return (
        <div>
            <button onClick={() => navigate(-1)}>← Voltar</button>
            {/* navigate(-1) é equivalente ao botão voltar do browser */}
            
            <button onClick={handleFavorite}>
                {favorited ? '❤️ Remover dos favoritos' : '🤍 Favoritar'}
                {/* ternário — muda o texto dependendo se já é favorito */}
            </button>

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