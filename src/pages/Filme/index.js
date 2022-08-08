import { Link, useParams, useNavigate } from 'react-router-dom'
import { useEffect, useState } from 'react'
import api from '../../services/api'
import './style.css'

import { toast } from 'react-toastify'

export default function Filme() {
    const { id } = useParams();
    const navigate = useNavigate();

    const [detailFilme, setDetailFilme] = useState({})
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        async function filmeDetail() {
            await api.get(`/movie/${id}`, {
                params: {
                    api_key: "28fc232cc001c31e8a031f419d0a14ca",
                    language: "pt-BR",
                    page: 1,
                }
            })
                .then((res) => {
                    setDetailFilme(res.data)
                    setLoading(false)
                })
                .catch(() => {
                    console.log("NOT")
                    navigate("/", { replace: true })
                    return;
                })
        }
        filmeDetail();
        return () => {
            console.log("compo... desmontado")
        }
    }, [navigate, id])


    function salvarFilme() {
        const minhaLista = localStorage.getItem("zenFilmes")
        let filmeSalvos = JSON.parse(minhaLista) || [];

        const hasFilme = filmeSalvos.some((filmeSalvo) => filmeSalvo.id === detailFilme.id);
        if (hasFilme) {
            toast.warn("Filme ja adicionado no favorito")
            return;
        }
        filmeSalvos.push(detailFilme);
        localStorage.setItem("zenFilmes", JSON.stringify(filmeSalvos));
        toast.success("Filme adicionado no favorito")

    }



    return (
        <div className='filme-detail'>
            {loading ? <span className='filme-detail'>Carregando detalhes ...</span>
                :
                <div>
                    <h1>{detailFilme.title}</h1>
                    <img src={`https://image.tmdb.org/t/p/original/${detailFilme.backdrop_path}`} alt={detailFilme.title} />
                    <h3>Sinopse</h3>
                    <span>{detailFilme.overview}</span>
                    <strong>Avaliacao:{detailFilme.vote_average}</strong>

                    <div className='area-buttons'>
                        <button onClick={salvarFilme}>Salvar</button>
                        <button className='area-buttons'>
                            <a target="blank" rel="external" href={`https://youtube.com/results?search_query=${detailFilme.title} trailer`}>
                                Trailer
                            </a>
                        </button>
                    </div>
                </div>
            }
        </div>


    )
}