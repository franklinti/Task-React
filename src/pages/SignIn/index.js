import { useState } from 'react';
import './style.css';
import logo from '../../assets/logo256x256.png'
function SignIn() {
    const [email, setEmail] = useState('');
    const [senha, setSenha] = useState('');

    async function signIn(e) {
        e.preventDefault();
        // const res = await api.get('/usuario');
        // console.log(res.data);
    }
    return (

        <div className="container-center">
            <div className="logo">
                <img src={logo} alt="logomarca" />
            </div>
            <div className='formulario'>
                <form onSubmit={signIn}>
                    <span>Autenticar</span><br></br>
                     <input type="text" placeholder="e-mail" value={email} onChange={(e) => setEmail(e.target.value)} /><br></br>
                <input type="password" placeholder="senha" value={senha} onChange={(e) => setSenha(e.target.value)} /><br></br>

                <button type="submit">Entrar</button>
                </form>
            </div>



            {/* <Link to="/cadastrar">Nao possui conta? Cadastre-se.</Link> */}

        </div>

    )
}
export default SignIn;