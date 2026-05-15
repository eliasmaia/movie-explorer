import { useState } from 'react'

// Props recebidas: onSearch é uma função passada pelo pai.
// SearchBar não sabe o que o pai faz com a busca — só avisa

export function SearchBar({ onSearch }) {
    // useState: [valorAtual, funçãoParaAtualizar]
    // Toda vez que setQuery é chamado, o componente re-renderiza
    const [query, setQuery] = useState('')

    function handleSubmit(e) {
        e.preventDefault() // evita reload da página (comportamento padrão do form)
        if (query.trim()) onSearch(query) // "sobe" o evento para o pai via callback
    }

    return (
        <form onSubmit={handleSubmit}>
            <input
                type="text"
                value = {query}
                onChange={e => setQuery(e.target.value)}
                placeholder="Buscar filmes..."
            />
            <button type="submit">Buscar</button>
        </form>
    )
}