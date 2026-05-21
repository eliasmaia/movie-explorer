import { Link, useLocation } from 'react-router-dom'
import { useFavorites } from '../context/FavoritesContext'
import './Header.css'

export function Header() {
    const { favorites } = useFavorites()
    const location = useLocation()
      // useLocation retorna o objeto da rota atual — usamos para destacar o link ativo

    return (
        <header className='header'>
            <Link to='/' className='header-logo'>
                🎬 Movie Explorer
            </Link>

            <nav className="header-nav">
                <Link
                    to="/"
                    className={ `header-link ${location.pathname === '/' ? 'active' : ''}`}
                >
                    Inicio
                </Link>

                <Link
                    to="/favorites"
                    className={`header-link ? {location.pathname === '/favorites' ? 'active' : ''}`}
                >
                    ❤️ Favoritos
                    { favorites.length > 0 && (
                        <span className ="header-badge">{favorites.length}</span>
                    )}
                </Link>
            </nav>
        </header>
    )
    
}