import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { FavoritesProvider } from './context/FavoritesContext'
import { Header } from './components/Header'
import { Home } from './pages/Home'
import { MovieDetail } from './pages/MovieDetail'
import { Favorites } from './pages/Favorites'
// Por enquanto só renderiza Home.
// Na Fase 2 entrarão as rotas aqui.

export default function App() {
  return (
    <FavoritesProvider>
      {/* FavoritesProvider envolve tudo — qualquer componente dentro
          pode acessar os favoritos via useFavorites() */}
        <BrowserRouter>
        <Header />
        <main style={{ flex: 1, padding: '32px '}}>
          <Routes>
            <Route path="/"           element={<Home />} />
            <Route path="/movie/:id"  element={<MovieDetail />} />
            <Route path="/favorites"  element={<Favorites />} />
          </Routes>
        </main>
      </BrowserRouter>
    </FavoritesProvider>
  )
}