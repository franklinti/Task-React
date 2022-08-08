import { Link } from 'react-router-dom'
import './style.css'
import t from '../../assets/tela.png'
import t1 from '../../assets/tela1.png'
import t2 from '../../assets/tela2.png'
export default function Footer() {
    return (

        <div>
            <div className='container'>
                <div className='container'>
                    <img src={t} alt="tela" />
                    <span>Smart TVs</span>
                    <h5>Samsung</h5>
                </div>

                <div className='container'>
                    <img src={t1} alt="tela" />
                    <span>Computador</span>
                    <h5>Chrome OS</h5>
                </div>
                <div className='container'>
                    <img src={t2} alt="tela" />
                    <span>Smartphonnes/Tablets</span>
                    <h5>Android & Tablet</h5>
                </div>
            </div>
            <div className='footer'>
                <Link to="/">Agora na Ful&t</Link>
                <Link to="/">Em breve</Link>
                <Link to="/">Destaque</Link>
                <Link to="/">Séries</Link>
                <Link to="/sobre">Sobre</Link>
            </div>
            <div>
                <i class="fab fa-copy fa-xs fa-fw"><span>Ful&t {new Date().getFullYear()}</span></i>
            </div>


        </div>




    )
}