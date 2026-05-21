import { useFavorites } from "../context/FavoritesContext";
import { MovieCard } from "../components/MovieCard";
import { useNavigate } from "react-router-dom";

export function Favorites() {
    const { favorites } = useFavorites()
    const navigate      = useNavigate()

    return (
        <div>
            <button onClick={() => navigate('/')}>← Voltar</button>
            <h1>❤️ Favoritos</h1>

            {favorites.length === 0
                ?   <p>Você ainda não favoritou nenhum filme</p>
                :   <div className="movie-grid">
                        { favorites.map(movie => (
                            <MovieCard
                                key={movie.id}
                                id={movie.id}
                                title={movie.title}
                                poster={movie.poster_path}
                                rating={movie.vote_average}
                            />
                        ))}
                    </div>
            }   
        </div>
    )
}