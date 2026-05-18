import { useNavigate } from "react-router-dom"
// Componente "burro": só recebe dados (props) e renderiza.
// Não tem estado, não faz fetch. Fácil de testar e reutilizar.

export function MovieCard({ id, title, poster, rating }) {
    const navigate = useNavigate()
    
    const imgUrl = poster 
        ?   `https://image.tmdb.org/t/p/w300${poster}`
        :   '/placeholder.png'

    return (
    <div 
        className="movie-card" 
        onClick={() => navigate(`/movie/${id}`)}
        //leva para a rota de detalhes com o ID do filme
        style={{ cursor: 'pointer' }}
    >
        <img src={imgUrl} alt={title} />
        <div className="movie-info">
            <h3>{title}</h3>
            <span>⭐ {rating?.toFixed(1)}</span>
        </div>
    </div>
    )
}