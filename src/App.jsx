import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { Home } from './pages/Home'
import { MovieDetail } from './pages/MovieDetail'

// Por enquanto só renderiza Home.
// Na Fase 2 entrarão as rotas aqui.

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/"           element={<Home />} />
        <Route path="/movie/:id"  element={<MovieDetail />} />
      </Routes>
    </BrowserRouter>
  )
}