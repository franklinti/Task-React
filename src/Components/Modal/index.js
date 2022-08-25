import './style.css'
import { FiX } from 'react-icons/fi'
import { useForm } from 'react-hook-form';
import { useEffect, useState } from 'react';
//Firebase Connectionn
import { db } from '../../services/firebase';
import { collection, onSnapshot, } from 'firebase/firestore';
import { writerTaskFirestore } from '../../controller/taskController'
import { Data } from '../../utils/DateUtils';

import { useContext } from 'react'
import { AuthContext } from '../../context/auth'
import { toast } from "react-toastify";
export default function Modal({ close, task, name }) {
    console.log(name)
    const { register, handleSubmit, reset, formState: { errors } } = useForm({ mode: "onBlur" });
    const { user } = useContext(AuthContext);
    const onFormSubmit = data => {
        const a = Object.assign(user, data)
        //  console.log(a)
        writerTaskFirestore(a).then((result) => {
            console.log(result.id)
            reset();
            toast.success('Task cadastrada')
        }).catch((err) => {
            toast.success('Task não cadastrada')
        });

    };
    const onErrors = (errors) => { };
    const registrerOptions = {
        cliente: { required: "Cliente é necessario" },
        assunto: { required: "Tipo é necessario" },
        status: { required: "Escolha status atendimento" },
        descricao: '',
        id: '',
    }
    const [allClientes, setAllClientes] = useState([]);
    const [load, setLoad] = useState(false);
    const [dateAtual, setDate] = useState(false);
    const [hiddenItem, setHiddenItem] = useState({
        requisito: false,
        tester: false,
        desenvolvimento: false,
        deploy: false,
    });
    const dbInstance = collection(db, 'clientes');

    useEffect(() => {
        setLoad(true)
        onSnapshot(dbInstance, (doc) => {
            const data = doc.docs.map((doc) => doc);
            let dados = [];
            data.forEach((cliente) => {
                dados.push({
                    id: cliente.id,
                    nomeFantasia: cliente.data().nomeFantasia
                })
            })
            if (dados.length > 0) {
                setAllClientes(dados)
                setDate(Data())
                setLoad(false);
                return;
            }
            setLoad(false)
        });
    }, [])
    useEffect(() => {
        hiddenAssunto()

    }, [task])
    function hiddenAssunto() {
        if (task.assunto === 'requisito') {
            setHiddenItem({ requisito: true, tester: false })
        }
        if (task.assunto === 'tester') {
            setHiddenItem({ tester: true })
        }
        if (task.assunto === 'desenvolvimento') {
            setHiddenItem({ desenvolvimento: true })
        }
        if (task.assunto === 'deploy') {
            setHiddenItem({ deploy: true })
        }
    }
    function newTask() {
        return (
            <div className='modal'>
                <div className="close">
                    <button onClick={close} >
                        <FiX size={25} />
                    </button>
                </div>
                <h2>{name}</h2>
                <div className='row'>
                    <form onSubmit={handleSubmit(onFormSubmit, onErrors)}>
                        <label>Cliente</label>
                        <select {...register('cliente', registrerOptions.cliente)} >
                            <option value="">Selecione um cliente</option>
                            {load ? <option>Carregando...</option> : allClientes?.map((cliente) =>
                                <option key={cliente.id} name="cliente" value={cliente.nomeFantasia} >{cliente.nomeFantasia}</option>
                            )}
                        </select>
                        <small>{errors?.cliente && errors.cliente.message}</small>
                        <label>Assunto</label>
                        <select {...register('assunto', registrerOptions.assunto)}>
                            <option value="">Selecione tipo da tarefa</option>
                            <option value="requisito">Requisito</option>
                            <option value="desenvolvimento">Desenvolvimento</option>
                            <option value="tester">Tester</option>
                            <option value="deploy">Deploy</option>
                        </select>
                        <small>{errors?.assunto && errors.assunto.message}</small>
                        <label> Status</label>
                        <div className='status'>
                            <input type="radio" name="aberto-fazendo-atendido" value="afazer" {...register('status', registrerOptions.status)} checked={true} />
                            <span>A fazer</span>
                            <input type="radio" name="aberto-fazendo-atendido" value="fazendo" {...register('status', registrerOptions.status)} />
                            <span>Fazendo</span>
                            <input type="radio" name="aberto-fazendo-atendido" value="feito" {...register('status', registrerOptions.status)} />
                            <span>Feito</span>
                        </div>
                        <small>{errors?.radio && errors.radio.message}</small>
                        <label>Descrição</label>
                        <textarea type="text" placeholder="Descrição do atendimento" name="descricao" {...register('descricao', registrerOptions.descricao)} >

                        </textarea>
                        <label>Data abertura task: {dateAtual}</label>

                        <button type="submit" className="btn">Salvar</button>
                    </form>
                </div >
            </div >
        )
    }
    function updateTask() {
        console.log(task.assunto)
        console.log(hiddenItem.requisito)
        return (
            <div className='modal'>
                <div className="close">
                    <button onClick={close} >
                        <FiX size={25} />
                    </button>
                </div>
                <h2>{name}</h2>
                <div className='row'>
                    <form onSubmit={handleSubmit(onFormSubmit, onErrors)}>
                        <label>Cliente</label>
                        <select {...register('cliente', registrerOptions.cliente)} >
                            <option key={task.id} name="cliente" value={task.cliente} >{task.cliente}</option>
                        </select>
                        <small>{errors?.cliente && errors.cliente.message}</small>
                        <label>Assunto</label>
                        <select {...register('assunto', registrerOptions.assunto)}>
                            <option value={task.assunto}>{task.assunto}</option>
                            <option value="requisito" hidden={hiddenItem.requisito} >Requisito</option>
                            <option value="desenvolvimento" hidden={hiddenItem.desenvolvimento}>Desenvolvimento</option>
                            <option value="tester" hidden={hiddenItem.tester}>Tester</option>
                            <option value="deploy" hidden={hiddenItem.deploy}>Deploy</option>
                        </select>
                        <small>{errors?.assunto && errors.assunto.message}</small>
                        <label> Status</label>
                        <div className='status'>
                            <input type="radio" name="aberto-fazendo-atendido" value={task.status} {...register('status', registrerOptions.status)} checked={task.status === 'afazer'} />
                            <span>A fazer</span>
                            <input type="radio" name="aberto-fazendo-atendido" value={task.status}  {...register('status', registrerOptions.status)} checked={task.status === 'fazendo'} />
                            <span>Fazendo</span>
                            <input type="radio" name="aberto-fazendo-atendido" value={task.status}  {...register('status', registrerOptions.status)} checked={task.status === 'feito'} />
                            <span>Feito</span>
                        </div>
                        <small>{errors?.radio && errors.radio.message}</small>
                        <label>Descrição</label>
                        <textarea type="text" placeholder="Descrição do atendimento" name="descricao" value={task.descricao}  {...register('descricao', registrerOptions.descricao)} >

                        </textarea>
                        <label>Data abertura task: {dateAtual}</label>

                        <button type="submit" className="btn">Salvar</button>
                    </form>
                </div >
            </div >
        )
    }
    return (
        <>
            {task.id !== undefined ? <>{updateTask()}</> : <> {newTask()}</>}

        </>
    )
}