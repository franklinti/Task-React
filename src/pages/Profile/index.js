

import './style.css'
import Header from "../../Components/Header";
import Title from "../../Components/Title"
import { FiSettings, FiUpload } from 'react-icons/fi';
import { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../../context/auth';

import { useForm } from 'react-hook-form';
import avatar from '../../assets/avatar.png'

export default function Profile() {
    const { user, editFotoAvatar, editNome } = useContext(AuthContext);
    const { register, handleSubmit, formState: { errors } } = useForm({ mode: "onBlur" });
    const [avatarUrl, setAvatarUrl] = useState(user && user.avatarUrl)
    // const [imgAvatar, setImgAvatar] = useState(null);

    const onFormSubmit = data => {
        isCheckForm(data);
    };
    const onErrors = (errors) => { console.log(errors) };
    const registrerOptions = {
        avatarUrl: '',
        nome: {
            minLength: {
                value: 5,
                message: " Nome deve ter pelo menos 5 caracteres"
            },
            maxLength: {
                value: 8,
                message: "Nome deve ter no máximo 8 caracteres"
            }
        },
        /*  email: {
             required: "Email é necessario", pattern: {
                 value: /\S+@\S+\.\S+/,
                 message: "Entered value does not match email format"
             }
         }, */
    }


    async function isCheckForm(data) {
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
    }


    return (

        <div>
            <Header />
            <div className='content'>
                <Title name="Meu perfil">
                    <FiSettings size={25} />
                </Title>
                <div className='container-profile'>
                    <form className='form-profile' onChange={handleSubmit(onFormSubmit, onErrors)} >
                        <label className='label-avatar'>
                            <span>
                                <FiUpload color='#FFF' size={25} />
                            </span>
                            <input type="file" accept='image/*' image="avatarUrl" {...register('avatarUrl', registrerOptions.avatarUrl)} />
                            {avatarUrl === null ? <img src={avatar} alt="fotoPerfilUser" /> : <img src={avatarUrl} alt="fotoPerfilUser" />}
                            <small className='text-danger'>{errors?.avatarUrl && errors.avatarUrl.message}</small>
                        </label>
                        <input type="text" placeholder={user?.nome} nome="nome" {...register('nome', registrerOptions.nome)} />
                        <small className='text-danger'>{errors?.nome && errors.nome.message}</small>

                        <input type="email" value={user?.email} disabled={true} />
                        <input type="text" value={user?.uid.slice(0, 19) + "..."} disabled={true} />

                        {/* <button type="submit">Salvar</button> */}
                    </form>
                </div>
            </div>
        </div >



    )
}