//Firebase Connectionn
import { db } from '../../services/firebase';
import { collection, addDoc, updateDoc, doc, } from 'firebase/firestore';



export async function writerTaskFirestore(task) {

    const dbInstance = collection(db, 'task');
    //const docRef = doc(dbInstance, user.uid) para utilizar o setDoc
    let taskCreate = await addDoc(dbInstance, {
        created: new Date(),
        cliente: task.cliente,
        // clienteId: task.id,
        assunto: task.assunto,
        status: task.status,
        descricao: task.descricao,
        solicitante: task.nome
    });
    return taskCreate;
}
export async function updateTaskFirestore(task) {

    const dbInstance = collection(db, 'task');
    const docRef = doc(dbInstance, task.id)
    let taskCreate = await updateDoc(docRef, {
        cliente: task.cliente,
        assunto: task.assunto,
        status: task.status,
        descricao: task.descricao,
        created: new Date(),
       
    });
    return taskCreate;
}