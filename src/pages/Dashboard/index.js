import Header from "../../Components/Header";
import Title from "../../Components/Title";
import { FiClipboard, FiPlus, FiSearch, FiEdit3 } from 'react-icons/fi'
import { Link } from "react-router-dom";
import './style.css'
import { useState } from "react";
import Modal from "../../Components/Modal";
function Dashboard() {

    const [task, setTask] = useState([1])
    const [showModal, setShowModal] = useState(false)
    const [editTask, setEditTask] = useState({})
    function togglePostModal() {
        setShowModal(!showModal)
    }
    return (
        <div>
            <Header />
            <div className="content">
                <Title name="Tasks">
                    <FiClipboard size={25} />
                </Title>
                {task.length === 0 ? (
                    <div className="dashboard">
                        <span>Nenhum chamado registrado</span>
                        <Link to="/new" className="new">
                            <FiPlus size={25} />
                            New Task
                        </Link>
                    </div>

                ) : (
                    <div>
                        <table>
                            <thead>
                                <tr>
                                    <th scope="col">Item</th>
                                    <th scope="col">Cliente</th>
                                    <th scope="col">Assunto</th>
                                    <th scope="col">Status</th>
                                    <th scope="col">Data</th>
                                    <th scope="col">#</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td data-label="Cliente">id</td>
                                    <td data-label="Assunto">Cliente</td>
                                    <td data-label="Status">aaaa</td>
                                    <td data-label="Cadastrado">
                                        <span className="badge">aaaa
                                        </span>
                                    </td>
                                    <td data-label="Cadastrado">aaaa</td>
                                    <td data-label="#">
                                        <button className="action"><FiSearch size={25} /></button>
                                        <button className="action" onClick={togglePostModal}><FiEdit3 size={25} /></button>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                )}

            </div>
            {showModal && (
                <Modal
                    data={editTask}
                    close={togglePostModal} />
            )}
        </div>
    )
}
export default Dashboard;