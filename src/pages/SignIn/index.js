import * as React from 'react'
import { Link } from 'react-router-dom';
import './style.css';
import logo from '../../assets/logo256x256.png'


import { useForm } from 'react-hook-form';
import { useContext } from 'react';
import { AuthContext } from '../../context/auth';

function SignIn() {
    const { register, handleSubmit, formState: { errors } } = useForm({ mode: "onBlur" });
    const onFormSubmit = data => {
        signIn(data);

    };
    const onErrors = (errors) => { };
    const registrerOptions = {
        email: {
            required: "Email é necessario", pattern: {
                value: /\S+@\S+\.\S+/,
                message: "Inserir email válido"
            }
        },
        senha: {
            required: "Senha é necessario",
            minLength: {
                value: 8,
                message: " Senha deve ter pelo menos 8 caracteres"
            }
        }
    }
    const { signIn, loadingAuth } = useContext(AuthContext);

    return (

        <div className="container-sign">

            <div className="logo-sign">
                <img src={logo} alt="logomarca" />
                {/* <span className='box'></span> */}
            </div>
            <div className='formulario-sign'>

                <form onSubmit={handleSubmit(onFormSubmit, onErrors)}>
                    <span>Autenticar</span><br></br>
                    <input type="email" placeholder="e-mail" email="email" {...register('email', registrerOptions.email)} /><br></br>
                    <small className='text-danger'>{errors?.email && errors.email.message}</small>
                    <input type="password" placeholder="senha" senha="senha" {...register('senha', registrerOptions.senha)} /><br></br>
                    <small className='text-danger'>{errors?.senha && errors.senha.message}</small>
                    <button type="submit">{loadingAuth ? 'Carregando...' : 'Acessar'}</button><br></br>
                    <Link to='cadastrar'>Não possui conta? Cadastre-se.</Link>
                </form>

            </div>

        </div>



    )
}
export default SignIn;