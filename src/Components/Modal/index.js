import './style.css'
import { FiX } from 'react-icons/fi'
import { useForm } from 'react-hook-form';
import { useEffect, useState } from 'react';
//Firebase Connectionn
import { db } from '../../services/firebase';
import { collection, onSnapshot, } from 'firebase/firestore';
import { writerTaskFirestore, updateTaskFirestore } from '../../controller/taskController'
import { Data } from '../../utils/DateUtils';

import { useContext } from 'react'
import { AuthContext } from '../../context/auth'
import { toast } from "react-toastify";
export default function Modal({ close, task, name }) {
    const { register, handleSubmit, reset, formState: { errors } } = useForm({ mode: "onBlur" });
    const { user } = useContext(AuthContext);
    const onFormSubmit = data => {

        if (data.id !== undefined) {
            updateTaskFirestore(data).then((result) => {
                console.log(result)

                toast.success('Task editada');
            }).catch((err) => {
                toast.success('Task não editada')
            });
        } else {
            const a = Object.assign(user, data)
            writerTaskFirestore(a).then((result) => {
                console.log(result.id)
                reset();
                toast.success('Task cadastrada')
            }).catch((err) => {
                toast.success('Task não cadastrada')
            });
        }

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
    const [checkedItem, setCheckedItem] = useState({
        afazer: '',
        fazendo: '',
        feito: '',
    });
    const [textAreaItem, setTextAreaItem] = useState(true);
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
        hiddenAssunto();
    }, [])
    useEffect(() => {
        checkedStatus();
    }, [])



    function hiddenAssunto() {
        if (task.assunto === 'requisito') {
            setHiddenItem({ requisito: true })
            return;
        }
        if (task.assunto === 'tester') {
            setHiddenItem({ tester: true })
            return;
        }
        if (task.assunto === 'desenvolvimento') {
            setHiddenItem({ desenvolvimento: true })
            return;
        }
        if (task.assunto === 'deploy') {
            setHiddenItem({ deploy: true })
            return;
        }
        return;
    }
    function checkedStatus() {

        if (task.status === 'afazer') {
            setCheckedItem({ afazer: true, fazendo: false, feito: false, })
            return;
        }
        if (task.status === 'fazendo') {
            setCheckedItem({ fazendo: true, afazer: false, feito: false, })
            return;
        }
        if (task.status === "feito") {
            setCheckedItem({ feito: true, fazendo: false, afazer: false, })
            return;
        }
        return;

    }
    function setV(e) {
        setTextAreaItem(e.target.value)
    }
    //  console.log(task.status)
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
        console.log(close)
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
                            <option value="Requisito" hidden={hiddenItem.requisito} >Requisito</option>
                            <option value="Desenvolvimento" hidden={hiddenItem.desenvolvimento}>Desenvolvimento</option>
                            <option value="Tester" hidden={hiddenItem.tester}>Tester</option>
                            <option value="Deploy" hidden={hiddenItem.deploy}>Deploy</option>
                        </select>
                        <small>{errors?.assunto && errors.assunto.message}</small>
                        <label> Status</label>
                        <div className='status'>
                            <input type="radio" name="aberto-fazendo-atendido" checked={checkedItem.afazer} value="afazer" {...register('status', registrerOptions.status)} onChange={() => setCheckedItem({ afazer: true, fazendo: false, feito: false })} />
                            <span>A fazer</span>
                            <input type="radio" name="aberto-fazendo-atendido" checked={checkedItem.fazendo} value="fazendo" {...register('status', registrerOptions.status)} onChange={() => setCheckedItem({ fazendo: true, afazer: false, feito: false })} />
                            <span>Fazendo</span>
                            <input type="radio" name="aberto-fazendo-atendido" checked={checkedItem.feito} value="feito" {...register('status', registrerOptions.status)} onChange={() => setCheckedItem({ feito: true, afazer: false, fazendo: false })} />
                            <span>Feito</span>
                        </div>
                        <small>{errors?.radio && errors.radio.message}</small>
                        <label>Descrição</label>
                        <textarea type="text" name="descricao" placeholder={task.descricao} onChange={(e) => setV(e)} {...register('descricao', registrerOptions.descricao)}>

                        </textarea>
                        <input type="text" name="id" value={task?.id} {...register('id', registrerOptions.id)} />
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