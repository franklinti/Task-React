import './style.css'
import { FiX } from 'react-icons/fi'
import { useForm } from 'react-hook-form';
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
    return (
        <div className='modal'>
            <div className='containermodal'>
                <button className='close' onClick={close}>
                    <FiX size={25} />
                    Fechar
                </button>
                <div>
                    <h2>Preencher dados</h2>
                    <div className='row'>
                        <form onSubmit={handleSubmit(onFormSubmit, onErrors)}>
                            <label>Cliente</label>
                            <select {...register('cliente', registrerOptions.cliente)}>
                                <option value="">
                                    Selecione um cliente
                                </option>
                                <option>
                                    Teste
                                </option>
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
                                <input type="radio" name="aberto-progresso-atendido" value="aberto" {...register('radio', registrerOptions.radio)} checked="true"/>
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



                            <button type="submit" className="btn-right">Salvar</button>
                        </form>
                    </div>
                </div>
            </div>
        </div >
    )
}