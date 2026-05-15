// Componente "burro": só recebe dados (props) e renderiza.
// Não tem estado, não faz fetch. Fácil de testar e reutilizar.

export function MovieCard({ title, poster, rating, onClick }) {
    const imgUrl = poster 
        ?   `https://image.tmdb.org/t/p/w300${poster}`
        :   '/placeholder.png'

    return (
    <div className="movie-card" onClick={onClick}>
        <img src={imgUrl} alt={title} />
        <div className="movie-info">
            <h3>{title}</h3>
            <span>⭐ {rating?.toFixed(1)}</span>
        </div>
    </div>
    )
}