/* import { useState, createContext, useEffect } from "react";

import { getStorageValue, setStorageValue } from '../storage/storage' */
//Firebase Connectionn
import { auth, db } from '../../services/firebase';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth';
import { collection, getDocs, updateDoc, doc, setDoc, addDoc, } from 'firebase/firestore';

/* import { storageFirebase } from "../Services/firebase";
import { uploadBytes, ref, getDownloadURL } from "firebase/storage"; */

/* async function createNewAccount(data) {
    console.log(auth)
    console.log(data)
    createUserWithEmailAndPassword(auth, data.nomeFantasia, data.cnpj, data.endereco, data.email).then((responseAuth) => {
        let user = {
            uid: responseAuth.user.uid,
            nomeFantasia: data.nomeFantasia,
            email: responseAuth.user.email,
            isAtive: true,
            avatarUrl: null
        }
        //writerUserFirestore(user);
    }).catch((error) => {
        if (error.code === 'auth/weak-password') {
            toast.warning('Senha fraca')
        } else if (error.code === 'auth/email-already-in-use') {
            toast.warning('email ja existe')
        }
    })
} */

export async function writerUserFirestore(user) {
    const dbInstance = collection(db, 'clientes');
    //const docRef = doc(dbInstance, user.uid) para utilizar o setDoc
    let a = await addDoc(dbInstance, user);
    return a;
}

/*    async function signOut() {
       auth.signOut();
       localStorage.clear('taskUser');
       setUser(null);
       setLoadingAuth(false);
       toast.success('Obrigado por usar nosso sistema! : )')
   }
   async function signIn(user) {
       setLoadingAuth(true)
       signInWithEmailAndPassword(auth, user.email, user.senha).then(async (responseLogin) => {
           const uid = responseLogin.user.uid;
           getUserFirestore(uid);
       }).catch((error) => {
           if (error.code === 'auth/user-not-found') {
               setLoadingAuth(false)
               toast.warning('Não encontrado conta cadastrada')
 
           } else if (error.code === 'auth/wrong-password') {
               setLoadingAuth(false)
               toast.warning('Verifique e-mail ou senha')
 
           }
           setLoadingAuth(false)
       })
   }
 
   async function getUserFirestore(uid) {
       const dbInstance = collection(db, 'users');
       const a = await getDocs(dbInstance, uid);
       const userFirestore = a.docs.map(doc => doc.data())
 
       let userObject = userFirestore.find(userFirestore => userFirestore.uid === uid)
       setUser(userObject)
       setStorageValue('taskUser', JSON.stringify(userObject))
       // setLoadingAuth(false)
       toast.success('Acesso ao  sistema realizado com sucesso!')
   }
 
   async function editFotoAvatar(data) {
 
       const storageRef = ref(storageFirebase, `perfilImage/${user.uid}/${data.name}`);
 
       uploadBytes(storageRef, data).then(async (snapshot) => {
           getDownloadURL(storageRef).then(async (urlFoto) => {
               console.log(urlFoto)
               const dbInstance = collection(db, 'users');
               const dados = doc(dbInstance, user.uid);
               //update firestore
               updateDoc(dados, { avatarUrl: urlFoto }).then(() => {
                   console.log(urlFoto)
                   let dados = {
                       ...user, avatarUrl: urlFoto
                   }
                   setUser(dados);
                   setStorageValue('taskUser', JSON.stringify(dados))
                   toast.success('Foto perfil atualizado!')
               }).catch(error => console.log(error));
           }).catch(error => {
               console.log(error)
               toast.error('Foto perfil não atualizada!')
           })
       }).catch(error => console.log(error))
   }
   async function editNome(data) {
 
       const dbInstance = collection(db, 'users');
       const dadosFirestore = doc(dbInstance, user.uid);
       updateDoc(dadosFirestore, { nome: data.nome }).then(() => {
           let dados = {
               ...user, nome: data.nome
           }
           setUser(dados);
           setStorageValue('taskUser', JSON.stringify(dados))
           setloadingNomePerfil(false)
 
 
       }).catch(error => {
           console.log(error)
           toast.error('Nome não atualizado!');
       });
   } */
