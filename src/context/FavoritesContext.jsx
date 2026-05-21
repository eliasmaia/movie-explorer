import { createContext, useContext, useState, useEffect } from 'react'

// createContext cria o "canal" pelo qual os dados vão fluir
// é como declarar que esse contexto existe

const FavoritesContext = createContext()

// Provider é o componente que envolve a árvore e fornece os dados
// tudo que estiver dentro dele tem acesso aos favoritos
export function FavoritesProvider({ children }){
    const [favorites, setFavorites] = useState(() => {
        // essa função só roda uma vez na montagem
        // lê os favoritos salvos no localStorage, se existirem
        const saved = localStorage.getItem('favorites')
        return saved ? JSON.parse(saved) : []
    })

    // toda vez que favorites mudar, salva no localStorage
    useEffect(() => {
        localStorage.setItem('favorites', JSON.stringify(favorites))
    }, [favorites])

    function addFavorite(movie){
        setFavorites(prev => [...prev, movie])
        // prev é o valor anterior do estado
        //spread copia o array e adiciona o novo filme
    }

    function removeFavorite(id){
        setFavorites(prev => prev.filter(movie => movie.id !== id))
    }

    function isFavorite(id){
        return favorites.some(movie => movie.id === id)
    }

    return (
        <FavoritesContext.Provider value={{ favorites, addFavorite, removeFavorite, isFavorite }}>
            { children}
        </FavoritesContext.Provider>
    )
}

// custom hook para consumir o contexto — esconde o useContext dos componentes
// em vez de importar FavoritesContext em todo lugar, importam só esse hook
export function useFavorites(){
    return useContext(FavoritesContext)
}


