// Regra de ouro: componentes não devem saber de onde vêm os dados.
// Essa camada isola a API. Se um dia trocar por outra API, só muda aqui.

const BASE_URL = 'https://api.themoviedb.org/3'
const API_KEY = import.meta.env.VITE_TMDB_KEY

export async function fetchPopularMovies() {
    const res = await fetch (`${BASE_URL}/movie/popular?api_key=${API_KEY}&language=pt-BR`)
    if (!res.ok) throw new Error ('Falha ao buscar filmes')
    const data = await res.json()
    return data.results
}

export async function searchMovies(query) {
    const res = await fetch(
        `${BASE_URL}/search/movie?api_key=${API_KEY}&query=${encodeURIComponent(query)}&language=pt-BR`
    )
    if (!res.ok) throw new Error ('Falha na busca')
    const data = await res.json()
    return data.results
}