

import './style.css'
import Header from "../../Components/Header";
import Title from "../../Components/Title"
import { FiSettings, FiUpload } from 'react-icons/fi';
import { useContext } from 'react';
import { AuthContext } from '../../context/auth';

import { useForm } from 'react-hook-form';
import avatar from '../../assets/avatar.png'

export default function Profile() {
    const { user, editProfile } = useContext(AuthContext);
   console.log(user)
    const { register, handleSubmit, formState: { errors } } = useForm({ mode: "onBlur", nome: user.nome });
    const onFormSubmit = data => {
        if (data.avatarUrl.length === 0 && data.nome === "") {
            data.nome = "f3";
        }
        editProfile(data,user.id);
    };
    const onErrors = (errors) => { console.log(errors) };
    const registrerOptions = {
        avatarUrl: '',
        nome: '',
        email: {
            required: "Email é necessario", pattern: {
                value: /\S+@\S+\.\S+/,
                message: "Entered value does not match email format"
            }
        },
    }
    return (

        <div>
            <Header />
            <div className='content'>
                <Title name="Meu perfil">
                    <FiSettings size={25} />
                </Title>
                <div className='container-profile'>
                    <form className='form-profile' onSubmit={handleSubmit(onFormSubmit, onErrors)}>
                        <label className='label-avatar'>
                            <span>
                                <FiUpload color='#FFF' size={25} />
                            </span>
                            <input type="file" accept='image/*' image="avatarUrl" {...register('avatarUrl', registrerOptions.avatarUrl)} />
                            {user.avatarUrl === null ? <img src={avatar} alt="fotoPerfilUser" /> : <img src={user.avatarUrl} alt="fotoPerfilUser" />}
                            <small className='text-danger'>{errors?.avatarUrl && errors.avatarUrl.message}</small>
                        </label><br></br>
                        <input type="text" placeholder={user.nome} nome="nome" {...register('nome', registrerOptions.nome,)} /><br></br>
                        <small className='text-danger'>{errors?.nome && errors.nome.message}</small>

                        <input type="email" value={user.email} disabled={true} /><br></br>
                        <input type="text" value={user.uid} disabled={true} /><br></br>

                        <button type="submit">Salvar</button><br></br>
                    </form>
                </div>
            </div>
        </div>



    )
}