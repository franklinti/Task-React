import { Link } from 'react-router-dom';
import logo from '../../assets/logo256x256.png'

import { useForm } from 'react-hook-form';

// Import context  auth User
import { useContext } from 'react';
import { AuthContext } from '../../context/auth'

function SignUp() {
    const { register, handleSubmit, formState: { errors } } = useForm({ mode: "onBlur" });
    const onFormSubmit = data => {
        createNewAccount(data);

    };
    const onErrors = (errors) => { };
    const registrerOptions = {
        nome: { required: "Nome é necessario" },
        email: { required: "Email é necessario" },
        senha: {
            required: "Senha é necessario",
            minLength: {
                value: 8,
                message: " Senha deve ter pelo menos 8 caracteres"
            }
        }
    }
    const { createNewAccount, loadingAuth } = useContext(AuthContext)

    return (

        <div className="container">
            <div>
                <img src={logo} alt="logomarca" />
            </div>
            <div className='formulario'>
                <form onSubmit={handleSubmit(onFormSubmit, onErrors)}>
                    <span>Cadastro</span>
                    <input type="text" placeholder="nome" email="nome" {...register('nome', registrerOptions.nome)} />
                    <small className='text-danger'>{errors?.nome && errors.nome.message}</small>
                    <input type="email" placeholder="e-mail" email="email" {...register('email', registrerOptions.email)} />
                    <small className='text-danger'>{errors?.email && errors.email.message}</small>
                    <input type="password" placeholder="senha" senha="senha" {...register('senha', registrerOptions.senha)} />
                    <small className='text-danger'>{errors?.senha && errors.senha.message}</small>
                    <button type="submit" className="btn-right">{loadingAuth ? 'Cadastrando...':'Cadastrar'}</button>
                    <Link to="/">Já possui conta? Conecte-se.</Link>
                </form>

            </div>
        </div>

    )
}
export default SignUp;