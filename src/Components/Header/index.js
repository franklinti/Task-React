
import { useContext } from 'react'
import { AuthContext } from '../../context/auth'
import avatar from '../../assets/avatar.png'
import '../Header/style.css'
import { Link } from 'react-router-dom'
import { FiHome, FiUser, FiSettings, FiLogOut } from 'react-icons/fi'

export default function Header() {
    const { user, signOut } = useContext(AuthContext);
    return (
        <div className='sidebar'>
            <div>
                <img src={user.avatarUrl === null ? avatar : user.avatarUrl} alt="fotoAvatar" />
            </div>
            <Link to="/dashboard">
                Tasks
                <FiHome color="#FFF" size={24} />

            </Link>
            <Link to="/dashboard">
                Clientes
                <FiUser color="#FFF" size={24} />

            </Link>
            <Link to="/profile">
                Configuracoes
                <FiSettings color="#FFF" size={24} />
            </Link>

            <button onClick={signOut}>
                <FiLogOut color="black" size={22} />
            </button>


        </div>

    )
}