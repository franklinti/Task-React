
import Header from "../../Components/Header";
import Title from "../../Components/Title"
import { FiUser, FiUpload } from 'react-icons/fi';
import { writerClientesFirestore } from "../../controller/ClientesController";
import { useContext, useEffect, useState } from 'react';
import './style.css'
import { toast } from "react-toastify";
import { useForm } from 'react-hook-form';
/* import avatar from '../../assets/avatar.png' */
/* import { AuthContext } from '../../context/auth'; */

export default function Clientes() {
    const { register, handleSubmit, reset, formState: { isSubmitSuccessful, errors } } = useForm({ mode: "onBlur" });
    /*  const [avatarUrl, setAvatarUrl] = useState(user && user.avatarUrl) */

    const onFormSubmit = async data => {
        writerClientesFirestore(data).then((result) => {
            console.log(result.id)
            reset();
            toast.success('Cliente cadastrado')
        }).catch((err) => {
            toast.success('Cliente não cadastrado')
        });;

    };
    const onErrors = (errors) => { console.log(errors) };
    const registrerOptions = {
        /*  avatarUrl: '', */
        nomeFantasia: {
            required: "Nome da empresa necessário",
            minLength: {
                value: 5,
                message: " Nome deve ter pelo menos 5 caracteres"
            },
        },
        cnpj: {
            required: "CNPJ necessário",
            minLength: {
                value: 14,
                message: " CNPJ deve ter pelo menos 14 caracteres"
            },
        },
        endereco: { required: "Endereço necessário" },
        email: {
            required: "Email é necessario", pattern: {
                value: /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
                message: "Insira email válido"
            }
        },
    }

    return (

        <div>
            <Header />
            <div className='content'>
                <Title name="Novo Cliente">
                    <FiUser size={25} />
                </Title>
                <div className='container-client'>
                    <form className='form-client' onSubmit={handleSubmit(onFormSubmit, isSubmitSuccessful, onErrors)} >
                        {/*  <label className='label-avatar'>
                            <span>
                                <FiUpload color='#FFF' size={25} />
                            </span>
                            <input type="file" accept='image/*' image="avatarUrl" {...register('avatarUrl', registrerOptions.avatarUrl)} />
                            {avatarUrl === null ? <img src={avatar} alt="fotoPerfilUser" /> : <img src={avatarUrl} alt="fotoPerfilUser" />}
                            <small className='text-danger'>{errors?.avatarUrl && errors.avatarUrl.message}</small>
                        </label> */}
                        <input type="text" placeholder="Nome Fantasia" nome="nomeFantasia" {...register('nomeFantasia', registrerOptions.nomeFantasia)} maxLength={8} />
                        <small className='text-danger'>{errors?.nomeFantasia && errors.nomeFantasia.message}</small>
                        <input type="text" placeholder="CNPJ" nome="cnpj" {...register('cnpj', registrerOptions.cnpj)} maxLength={14} />
                        <small className='text-danger'>{errors?.cnpj && errors.cnpj.message}</small>
                        <input type="text" placeholder="Endereço" nome="endereco" {...register('endereco', registrerOptions.endereco)} />
                        <small className='text-danger'>{errors?.endereco && errors.endereco.message}</small>
                        <input type="text" placeholder="E-mail" nome="email" {...register('email', registrerOptions.email)} />
                        <small className='text-danger'>{errors?.email && errors.email.message}</small>


                        <button type="submit" className="btn">Salvar</button>
                    </form>
                </div>
            </div>
        </div >



    )
}