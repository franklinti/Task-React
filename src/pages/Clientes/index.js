
import Header from "../../Components/Header";
import Title from "../../Components/Title"
import { FiUser, FiUpload } from 'react-icons/fi';
import { useContext, useEffect, useState } from 'react';
/* import { AuthContext } from '../../context/auth'; */

import { useForm } from 'react-hook-form';
/* import avatar from '../../assets/avatar.png' */

export default function Clientes() {
    const { register, handleSubmit, formState: { errors } } = useForm({ mode: "onBlur" });
    /*  const [avatarUrl, setAvatarUrl] = useState(user && user.avatarUrl) */

    const onFormSubmit = data => {
        console.log(data)
        //isCheckForm(data);
    };
    const onErrors = (errors) => { console.log(errors) };
    const registrerOptions = {
        /*  avatarUrl: '', */
        nomeFantasia: {
            minLength: {
                value: 5,
                message: " Nome deve ter pelo menos 5 caracteres"
            },
            maxLength: {
                value: 8,
                message: "Nome deve ter no máximo 8 caracteres"
            }
        },
        cnpj: {
            minLength: {
                value: 14,
                message: " CNPJ deve ter pelo menos 14 caracteres"
            },
            maxLength: {
                value: 14,
                message: "CNPJ deve ter no máximo 14 caracteres"
            }
        },
        endereco: '',
         email: {
             required: "Email é necessario", pattern: {
                 value: /\S+@\S+\.\S+/,
                 message: "Entered value does not match email format"
             }
         },
    }


    /*  async function isCheckForm(data) {
         //  console.log(data.avatarUrl.length)
         if (data.avatarUrl.length > 0) {
             if (data.avatarUrl[0].type === 'image/jpeg' || data.avatarUrl[0].type === 'image/png') {
                 setAvatarUrl(URL.createObjectURL(data.avatarUrl[0]))
                 editFotoAvatar(data.avatarUrl[0]);
             }
         }
         if (data.nome !== "") {
             editNome(data);
         }
         if (data.avatarUrl.length === 0 && data.nome === "") {
             return;
         }
     } */


    return (

        <div>
            <Header />
            <div className='content'>
                <Title name="Novo Cliente">
                    <FiUser size={25} />
                </Title>
                <div className='container-profile'>
                    <form className='form-profile' onSubmit={handleSubmit(onFormSubmit, onErrors)} >
                        {/*  <label className='label-avatar'>
                            <span>
                                <FiUpload color='#FFF' size={25} />
                            </span>
                            <input type="file" accept='image/*' image="avatarUrl" {...register('avatarUrl', registrerOptions.avatarUrl)} />
                            {avatarUrl === null ? <img src={avatar} alt="fotoPerfilUser" /> : <img src={avatarUrl} alt="fotoPerfilUser" />}
                            <small className='text-danger'>{errors?.avatarUrl && errors.avatarUrl.message}</small>
                        </label> */}
                        <input type="text" placeholder="Nome Fantasia" nome="nomeFantasia" {...register('nomeFantasia', registrerOptions.nomeFantasia)} />
                        <small className='text-danger'>{errors?.nome && errors.nome.message}</small>
                        <input type="text" placeholder="CNPJ" nome="cnpj" {...register('cnpj', registrerOptions.cnpj)} />
                        <small className='text-danger'>{errors?.cnpj && errors.cnpj.message}</small>
                        <input type="text" placeholder="Endereço" nome="endereco" {...register('endereco', registrerOptions.endereco)} />
                        <small className='text-danger'>{errors?.endereco && errors.endereco.message}</small>
                        <input type="text" placeholder="E-mail" nome="email" {...register('email', registrerOptions.email)} />
                        <small className='text-danger'>{errors?.email && errors.email.message}</small>


                        <button type="submit" className="btn">Cadastrar</button>
                    </form>
                </div>
            </div>
        </div >



    )
}