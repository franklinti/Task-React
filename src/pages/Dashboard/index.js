import Header from "../../Components/Header";
import Title from "../../Components/Title";
import { FiClipboard, FiPlus, FiSearch, FiEdit3 } from 'react-icons/fi'
import { Link } from "react-router-dom";
import './style.css'
import { useEffect, useState } from 'react';
import Modal from "../../Components/Modal";
import { db } from '../../services/firebase';
import { collection, onSnapshot, query, orderBy, limit } from 'firebase/firestore';

import { format } from 'date-fns'

function Dashboard() {
    const dbInstance = query(collection(db, 'task'), orderBy('created', 'asc'), limit(10));

    const [taskOpen, setTaskOpen] = useState([])
    const [taskFazendo, setTaskFazendo] = useState([])
    const [taskFeito, setTaskFeito] = useState([])
    const [loadTask, setLoadTask] = useState([])
    const [showModal, setShowModal] = useState(false)
    const [editTask, setEditTask] = useState({})
    function togglePostModal(id) {
        setEditTask(id);
        setShowModal(!showModal);
    }
    useEffect(() => {
        setLoadTask(true)
        onSnapshot(dbInstance, (doc) => {
            const data = doc.docs.map((doc) => doc);
            let dados = [];
            data.forEach((cliente) => {
                dados.push({
                    id: cliente.id,
                    cliente: cliente.data().cliente,
                    assunto: cliente.data().assunto,
                    descricao: cliente.data().descricao,
                    status: cliente.data().status,
                    created: cliente.data().created,
                    data: format(cliente.data().created.toDate(), 'dd/MM/yyyy'),
                })
            })
            if (dados.length > 0) {
                setTaskOpen(isAberto(dados));
                setTaskFazendo(isFazendo(dados));
                setTaskFeito(isFeito(dados));
                setLoadTask(false);
                return;
            }
            setLoadTask(false)
        });
    }, [])

    function isAberto(data) {

        return data.filter((data) => data.status === 'afazer');
    }
    function isFazendo(data) {

        return data.filter((data) => data.status === 'fazendo');
    }
    function isFeito(data) {

        return data.filter((data) => data.status === 'feito');
    }
    return (
        <div>
            <Header />
            <div className="content">
                <Title name="Tasks" >
                    <FiClipboard size={25} />
                    <button className="action" onClick={togglePostModal}><FiEdit3 size={25} /></button>
                </Title>
                <div className="griddashboard">
                    <div className="fazer" >
                        <label>A fazer</label>
                        {taskOpen?.map((tasks, index) => {
                            return (
                                <div className="card" key={index}>
                                    <div className="cardtitle">
                                        <FiClipboard size={25} />
                                        <label>Task</label>
                                        <span className="badge" style={{ backgroundColor: tasks.status === 'afazer' ? '#47f180' : '#999' }}>{tasks.status}</span>
                                    </div>

                                    <div className="containercard">
                                        <h4>Cliente:{tasks.cliente}</h4>
                                        <h6>Assunto:{tasks.assunto}</h6>
                                        <h6>Descrição:{tasks.descricao}</h6>
                                        <h6>Data:{tasks.data}</h6>
                                        <h6>Id:{tasks.id}</h6>
                                        <div className="linha"></div>
                                        <div className="btncard">
                                            {/*  <button className="action"><FiSearch size={25} /></button> */}
                                            <button className="action" onClick={() => togglePostModal(tasks.id)}><FiEdit3 size={25} /></button>
                                        </div>
                                    </div>
                                </div>
                            )
                        })}

                    </div>
                    <div className="fazer">
                        <label>Fazendo</label>
                        {taskFazendo?.map((tasks, index) => {
                            return (
                                <div className="card" key={index}>
                                    <div className="cardtitle">
                                        <FiClipboard size={25} />
                                        <label>Task</label>
                                        <span className="badge" style={{ backgroundColor: tasks.status === 'afazer' ? '#47f180' : '#999' }}>{tasks.status}</span>
                                    </div>

                                    <div className="containercard">
                                        <h4>Cliente:{tasks.cliente}</h4>
                                        <h6>Assunto:{tasks.assunto}</h6>
                                        <h6>Descrição:{tasks.descricao}</h6>
                                        <h6>Data:{tasks.data}</h6>
                                        <h6>Id:{tasks.id}</h6>
                                        <div className="linha"></div>
                                        <div className="btncard">
                                            {/*  <button className="action"><FiSearch size={25} /></button> */}
                                            <button className="action" onClick={togglePostModal}><FiEdit3 size={25} /></button>
                                        </div>
                                    </div>
                                </div>
                            )
                        })}
                    </div>
                    <div className="fazer">
                        <label>Feito</label>
                        {taskFeito?.map((tasks, index) => {
                            return (
                                <div className="card" key={index}>
                                    <div className="cardtitle">
                                        <FiClipboard size={25} />
                                        <label>Task</label>
                                        <span className="badge" style={{ backgroundColor: tasks.status === 'feito' ? '#ae0d0db4' : '#999' }}>{tasks.status}</span>
                                    </div>

                                    <div className="containercard">
                                        <h4>Cliente:{tasks.cliente}</h4>
                                        <h6>Assunto:{tasks.assunto}</h6>
                                        <h6>Descrição:{tasks.descricao}</h6>
                                        <h6>Data:{tasks.data}</h6>
                                        <h6>Id:{tasks.id}</h6>
                                        <div className="linha"></div>
                                        <div className="btncard">
                                            {/* <button className="action"><FiSearch size={25} /></button> */}
                                            <button className="action" onClick={togglePostModal}><FiEdit3 size={25} /></button>
                                        </div>
                                    </div>
                                </div>
                            )
                        })}
                    </div>
                </div>

                {/* loadTask ?
                <div className="dashboard">
                     <span>Carregando tasks...</span>
                </div>task.length === 0 ? (
                    <div className="dashboard">
                        <span>Nenhum chamado registrado</span>
                        <Link to="/new" className="new">
                            <FiPlus size={25} />
                            New Task
                        </Link>
                    </div>

                )  : (
                    <div>
                        <table>
                            <thead>
                                <tr>
                                    <th scope="col">Id</th>
                                    <th scope="col">Cliente</th>
                                    <th scope="col">Assunto</th>
                                    <th scope="col">Status</th>
                                    <th scope="col">Data</th>
                                    <th scope="col">#</th>
                                </tr>
                            </thead>
                            <tbody>
                                {task?.map((tasks, index) => {
                                    return (
                                        <tr key={index}>
                                            <td data-label="id">{tasks.id.slice(0, 7)}</td>
                                            <td data-label="cliente">{tasks.cliente}</td>
                                            <td data-label="assunto">{tasks.assunto}</td>
                                            <td data-label="status">
                                                <span className="badge" style={{ backgroundColor: tasks.status === 'aberto' ? '#47f180' : '#999' }}>{tasks.status}</span>
                                            </td>
                                            <td data-label="data">{tasks.data}</td>
                                            <td data-label="#">
                                                <button className="action"><FiSearch size={25} /></button>
                                                <button className="action" onClick={togglePostModal}><FiEdit3 size={25} /></button>
                                            </td>
                                        </tr>
                                    )


                                })}

                            </tbody>
                        </table>
                    </div>
                            )*/}

            </div>
            {
                showModal && (
                    <Modal
                        idTask={editTask}
                        close={togglePostModal} />
                )
            }
        </div >
    )
}
export default Dashboard;