import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import './style.css'
import { toast } from 'react-toastify'

export default function Favoritos() {

    const [filmeFavorito, setFilmeFavorito] = useState([]);

    useEffect(() => {

        const meusFavoritos = localStorage.getItem("zenFilmes")
        if (meusFavoritos > 0 || meusFavoritos !== '') {
            setFilmeFavorito(JSON.parse(meusFavoritos));
        }

    }, [])


    function excluir(id) {
        let filtro = filmeFavorito.filter((item) => {
            return (item.id !== id)
        })
        setFilmeFavorito(filtro)
        localStorage.setItem("zenFilmes", JSON.stringify(filtro))
        toast.success("Filme removido do favorito")

    }

    return (
        <div className='meus-filmes'>
            <h1>Meus Filmes Favoritos {filmeFavorito !== null}</h1>
            {filmeFavorito === null ? <span className='mensagem'>Nenhum filme adicionado </span>
                :
                <ul>
                    {filmeFavorito.map((item) => {
                        return (
                            <li key={item.id}>
                                <img src={`https://image.tmdb.org/t/p/original/${item.poster_path}`} alt={item.title} />
                                <h4>{item.title} </h4>

                                <div>
                                    <Link to={`/filme/${item.id}`} >Detalhes</Link>
                                    <button onClick={() => excluir(item.id)}>Excluir</button>
                                </div>

                            </li>
                        )
                    })}
                </ul>}

        </div >
    )
}