import './style.css'
import { FiX } from 'react-icons/fi'
import { useForm } from 'react-hook-form';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux'
import { getClientes } from '../../controller/ClientesController';

export default function Modal({ conteudo, close }) {
    const { register, handleSubmit, formState: { errors } } = useForm({ mode: "onBlur" });
    const onFormSubmit = data => {
        console.log(data)

    };
    const onErrors = (errors) => { };
    const registrerOptions = {
        cliente: { required: "Cliente é necessario" },
        tipo: { required: "Tipo é necessario" },
        radio: { required: "Escolha status atendimento" },
        descricao: ''
    }
    //  const [clientes, setClientes] = useState([]);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getClientes());
    }, [])
    const cliente = useSelector(state => state.clientes);
    console.log(cliente)
    const { entities, loading } = cliente;
    console.log({ entities, loading })

    return (
        <div className='modal'>
            <div className="close">
                <button onClick={close} >
                    <FiX size={25} />
                </button>
            </div>
            <h2>Nova task</h2>
            <div className='row'>
                <form onSubmit={handleSubmit(onFormSubmit, onErrors)}>
                    <label>Cliente</label>
                    <select {...register('cliente', registrerOptions.cliente)}>
                        <option value="">
                            Selecione um cliente
                        </option>
                        {loading ? 'Carregando' : entities?.map(cliente => (
                            <>
                                <option key={cliente?.id}>{cliente?.nomeFantasia}</option>
                            </>
                        ))}


                    </select>
                    <small>{errors?.cliente && errors.cliente.message}</small>
                    <label>Tipo</label>
                    <select {...register('tipo', registrerOptions.tipo)}>
                        <option value="">Selecione tipo da tarefa</option>
                        <option value="Tester">Suporte</option>
                        <option value="Desenvolvimmento">Desenvolvimmento</option>
                        <option value="Requisito">Requisito</option>
                    </select>
                    <small>{errors?.tipo && errors.tipo.message}</small>
                    <label> Status</label>
                    <div className='status'>
                        <input type="radio" name="aberto-progresso-atendido" value="aberto" {...register('radio', registrerOptions.radio)} checked={true} />
                        <span>Em aberto</span>
                        <input type="radio" name="aberto-progresso-atendido" value="progresso" {...register('radio', registrerOptions.radio)} />
                        <span>Progresso</span>
                        <input type="radio" name="aberto-progresso-atendido" value="atendido" {...register('radio', registrerOptions.radio)} />
                        <span>Atendido</span>
                    </div>
                    <small>{errors?.radio && errors.radio.message}</small>
                    <label>Descrição</label>
                    <textarea type="text" placeholder="Descrição do atendimento" {...register('descricao', registrerOptions.descricao)} >

                    </textarea>
                    <button type="submit" className="btn">Salvar</button>
                </form>
            </div >
        </div >


    )
}