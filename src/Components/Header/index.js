import { Link } from 'react-router-dom'
import './style.css'

export default function Header() {
    return (
        <header>
            <Link to="/"><h2 className='logo'>Ful&t filmes</h2></Link>
           
            <div>
                <Link to="/favoritos">Meus filmes</Link>
            </div>
        </header>
    )
}