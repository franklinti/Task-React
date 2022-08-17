
import { useContext } from 'react'
import { AuthContext } from '../../context/auth'
import avatar from '../../assets/avatar.png'
import { Link } from 'react-router-dom'
import { FiHome, FiUser, FiSettings, FiLogOut } from 'react-icons/fi'

export default function Header() {
    const { user, signOut } = useContext(AuthContext);

    return (
        <div className='sidebar'>
            <div>
                <img src={user.avatarUrl === null ? avatar : user.avatarUrl} alt="fotoPerfilUser" />
            </div>
            <Link to="/dashboard">
                Tasks
                <FiHome size={24} />
            </Link>
            <Link to="/clientes">
                Clientes
                <FiUser size={24} />

            </Link>
            <Link to="/profile">
                Configuracoes
                <FiSettings size={24} />
            </Link>
            <button onClick={signOut}>
                Sair<FiLogOut size={22} />
            </button>


        </div>

    )
}