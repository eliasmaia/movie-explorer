import { useParams, useNavigate } from "react-router-dom";
import { useState, useEffect } from 'react'
import { fetchMovieDetail } from "../services/tmdb";
import { useFavorites } from "../context/FavoritesContext";
import '../components/MovieDetail.css'

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
            addFavorite({ 
                id: movie.id,
                title: movie.title,
                poster_path: movie.poster_path,
                vote_average: movie.vote_average 
            })
        }
    }

    return (
        <div className="detail-container">
            <div className="detail-actions">
                <button className="btn-back" onClick={() => navigate(-1)}>← Voltar</button>
            
                <button className={`btn-favorite ${favorited ? 'favorited' : ''}`}
                        onClick={handleFavorite}
                >
                    {favorited ? '❤️ Remover dos favoritos' : '🤍 Favoritar'}
                    {/* ternário — muda o texto dependendo se já é favorito */}
                </button>
            </div>
            <div className="detail-content"> 
                {posterUrl 
                ? <img className="detail-poster" src={posterUrl} alt={movie.title} />
                : <div className="detail-poster-placeholder">🎬</div>
                }

                <div className="detail-info">
                    <h1>{movie.title}</h1>
                    
                    <div className="detail-meta">
                        <span>⭐{movie.vote_average?.toFixed(1)}</span>
                        <span>📅{movie.release_date}</span>
                        {movie.runtime > 0 && <span>⏱ {movie.runtime} min</span>}
                    </div>

                    <p className="detail-overview">{movie.overview}</p>                   
                    
                </div>
            </div>
        </div>
    )
}