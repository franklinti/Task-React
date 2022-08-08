import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

import './style.css';

import api from '../../services/api'
export default function Home() {
    const [filmes, setFilmes] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {

        loadFilmes();

    }, [])

    async function loadFilmes() {
        const res = await api.get("movie/now_playing", {
            params: {
                api_key: "28fc232cc001c31e8a031f419d0a14ca",
                language: "pt-BR",
                page: 1,
            }
        })
        setFilmes(res.data.results.slice(0, 8))
        //  console.log(res.data.results.slice(0,10))
    }
    if (loading) {
        return (
            <div className="loading">
                <h2>Carregando filmes ...</h2>
            </div>
        )
    }
    return (
        <div className='lista-filmes'>
            {filmes.map((filme) => {
                return (
                    <article key={filme.id}>
                        <strong>{filme.title}</strong>
                        <img src={`https://image.tmdb.org/t/p/original/${filme.poster_path}`} alt={filme.title} />
                        <Link to={`/filme/${filme.id}`} >Acessar</Link>
                    </article>
                )
            })}
        </div>
    )
}